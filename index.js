require("dotenv").config();

const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http').Server(app);

const paymentRoute = require('./routes/paymentRoute');

app.use(cors()); // Enable CORS for all routes

app.use('/', paymentRoute);

http.listen(5000, function(){
    console.log('Server is running');
});
