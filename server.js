const dotenv = require('dotenv').config()
const express = require('express'), app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const mongodb = require('mongodb');
const port = 5500

const uri = process.env.DB_NAME + ':' + process.env.DB_PASSWORD + '@' + process.env.DB_LINK + '/test?retryWrites=true';

mongoose.connect(uri, {
    useNewUrlParser: true})
    .then(() => console.log(`Connected succesfully`))
    .catch(err => console.error('Connection failed: ', err))

app
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({
        extended: false
    }))
    .use(express.static('public'))
    .use(require('./controllers/router'))
    .set('view engine', 'pug')

;

app.listen(port, () => console.log(`Server listening on port: ${port}`))
