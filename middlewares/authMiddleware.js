const jwt = require("jsonwebtoken");
const isAuthenticated = (req, res, next) => {
    try {
        const bearerHeader = req.headers['authorization']

        if (typeof bearerHeader === "undefined") {
            return res.status(401).json({message: 'Unauthorized'})
        }

        const bearer = bearerHeader.split(" ")

        jwt.verify(bearer[1], 'my_token', (message, user) => {
            if (message) {
                return res.status(401).json({message: 'Unauthorized'})
            }

            req.token = bearer[1]
            req.user = user.user
            next()
        });
    } catch (err) {
        next(err)
    }
}
module.exports = {isAuthenticated}
