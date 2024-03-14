require('dotenv').config();
const express = require("express");
const cors = require("cors");
const path = require("path");
require("./dbConnection");
const guests = require("../src/routes/guests");

createServer = () => {
    const app = express();

    app.use(cors());
    app.use(express.json({limit: '50mb'}));

    // Routes
    app.use('/api/guests', guests);

    app.get('/', (req, res) => {
        res.status(200).sendFile(path.resolve('index.html'));
    });

    app.use((req, res, next) => {
        const error = new Error('Rota não encontrada!');
        error.status = 404;
        next(error);
    });

    app.use((error, req, res, next) => {
        logger.log(`error`, error);
        res.status(error.status || 500);
        return res.json({error: error.message});
    });

    return app;
}

module.exports = createServer();