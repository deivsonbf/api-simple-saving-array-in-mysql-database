require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', require('./routes/users-routes'));

app.get('/default', (req, res) => {

    let configs = {
        enviroment: process.env.NODE_ENV,
    }

    res.send(configs)

})

module.exports = app;
