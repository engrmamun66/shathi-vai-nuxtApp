const express = require('express');
const sequelize = require('./config/database');
const app = express();
const HandleAllRequests = require('./RequestHandler/request-handler');

const port =  process.env.PORT || 3006;
const server = require('http').createServer(app);
app.use(express.json());


( async function() {
    try {
        await sequelize.authenticate() // connectDB
        console.log('Connection has been established successfully.');
        server.listen(port, () => console.log(`Server is listening port ${port}...`));
    } catch (error) {
        console.log(error);
    }
})()

HandleAllRequests(app)