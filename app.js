const express = require('express');
const cors = require('cors')
const port = process.env.PORT || 8080;
const app = express()
const api = require('./routes')
const initializeServices = require("./services/initialize");

const startApp = () => {
    app.use(cors())

    app.use(express.json());

    app.use('/api', api);

    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    })
}


initializeServices(startApp);
