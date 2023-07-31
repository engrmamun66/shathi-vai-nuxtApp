const express = require('express');
const app = express();
const sequelize = require('./config/database');
const {
    login,
} = require('./controllers/app.js');

const port =  process.env.PORT || 3006;
const server = require('http').createServer(app);
app.use(express.json());

const start = async () => {
    try {
        // connectDB
        await sequelize.authenticate()
        console.log('Connection has been established successfully.');
        server.listen(port, () => console.log(`Server is listening port ${port}...`));
    } catch (error) {
        console.log(error);
    }
};

start();