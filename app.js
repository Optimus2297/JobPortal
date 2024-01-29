const express = require('express');
const app = express();

const dotenv = require('dotenv');

// Setting up config.env file 
dotenv.config({path: __dirname + '/config.env'});

// Importing routes.
const jobs = require('./routes/jobs')



app.use('/api/v1',jobs)

let port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server started at port ${port}`)
})