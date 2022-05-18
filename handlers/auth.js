const { User } = require('../models')
const bcrypt = require('bcrypt')
const Joi = require('joi');
const jwt = require("jsonwebtoken");

const register = async (req, res) => {

    const loginSchema = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(3).max(15).required(),
    })

    try {
        const validatedData = await loginSchema.validateAsync(req.body).catch(message => {
            return res.status(403).json({message})
        });

        const password = await bcrypt.hash(validatedData.password, 10)

        const data = {
            ...validatedData,
            password,
        }
         const user = await User.create(data)

        return res.json({user})
    } catch (message) {
        return res.status(403).json({message})
    }
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({where: {email: email}})

        if(!user?.dataValues) {
            return res.status(403).json({message: 'Incorrect email or password'})
        }

        if(await bcrypt.compare(password, user.dataValues.password)) {
            const token = jwt.sign({user}, "my_token", {expiresIn: '1d'})
            return res.json({data: user, token})
        }

        return res.status(403).json({message: 'Incorrect email or password'})
    } catch (message) {
        return res.json({message})
    }
}

module.exports = {
    register,
    login
}
