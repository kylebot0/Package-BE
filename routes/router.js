const express = require('express')
const session = require('express-session')
const router = express.Router()

const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const multer = require("multer")
const path = require('path')
const urlencodedParser = bodyParser.urlencoded({
    extended: false
})
const {
    register,
    registerPost
} = require('../controllers/routing/register')

const {
    loggedIn,
    loggedOut,
    authenticate
} = require('../controllers/routing/login')

const {
    findUserHome,
    profile,
    profileHobbyPost,
    profileDeletePost,
    profilePicturePost
} = require('../controllers/routing/user')

// CHecks if user is logged in

//File storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/img/avatars'))
    },
    filename: function (req, file, cb) {
        cb(null, Math.floor(Date.now() / 10000) + '.png')
    }
})

const upload = multer({
    storage: storage,
    onFileUploadStart: function (file) {
        console.log(file.originalname + ' is starting ...')
    },
});

router
    .get('/', loggedIn, findUserHome)
    .get('/profiel', loggedIn, profile)
    
    .get('/login', function (req, res) {
        res.render('login', {})
    })
    .get('/register', register)

    //Post requests
    .post('/profiel/hobby', loggedIn, profileHobbyPost)
    .post('/profiel/delete', loggedIn, profileDeletePost)
    .post('/profiel/image', loggedIn, upload.single('image'), profilePicturePost)
    .post('/register', urlencodedParser, registerPost)
    .post('/login', authenticate)
    .post('/logout', loggedOut)
;

router.use(function (req, res) {
    res.status(404).render('404.pug', {
        title: 'Sorry, page not found',
        message: 'Page not found'
    });
});

module.exports = router