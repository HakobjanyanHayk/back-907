const db = require("../models");

const initializeServices = async (startApp) => {
    await db.sequelize.sync()
    startApp()
}

module.exports = initializeServices
