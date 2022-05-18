const { User } = require('../models')
const { Op } = require("sequelize")

async function checkDisplayName(displayName) {
    const { count, rows } = await User.findAndCountAll({
        where: {
            displayName: {
                [Op.startsWith]: displayName.split(" ").join("")
            }
        },
        order: [
            ['createdAt', 'DESC'],
        ]
    });

    if(count === 0) return displayName.split(" ").join("")
    function getNewName(name, counter) {

        const filtered = rows.filter(row => row.dataValues.displayName === (name + counter))
        if(filtered.length === 0) return (name + counter)

        return getNewName(name, counter + 1)
    }

    return getNewName(displayName.split(" ").join(""), count)
}

async function isEmailUnique(email) {
    const { count } = await User.findAndCountAll({
        where: {
            email: email
        },
    });

    return count === 0
}

module.exports = {
    checkDisplayName,
    isEmailUnique
}
