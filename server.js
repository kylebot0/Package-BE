const dotenv = require('dotenv').config()
const express = require('express'), app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const mongodb = require('mongodb')
const passport = require('passport')
const session = require('express-session')
const flash = require('connect-flash')
const path = require('path')
const login = require('./controllers/login')(passport);

const port = 5500

const uri = process.env.DB_NAME + ':' + process.env.DB_PASSWORD + '@' + process.env.DB_LINK + '/test?retryWrites=true';

mongoose.connect(uri, {
    useCreateIndex: true,
    useNewUrlParser: true})
    .then(() => console.log(`Connected succesfully`))
    .catch(err => console.error('Connection failed: ', err))


app
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({
        extended: false
    }))
    .use(session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: true,
    }))
    .use(passport.initialize())
    .use(passport.session())
    .use(flash())
    .use(express.static(path.join(__dirname, 'public')))
    .use(require('./controllers/router'))
    .set('view engine', 'pug')
    .listen(port, () => console.log(`Server listening on port: ${port}`))
;

