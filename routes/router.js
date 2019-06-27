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
    check,
    validationResult
} = require('express-validator')
const {
    search,
    matches,
    renderMatches
} = require('../controllers/routing/search')

const {
    register,
    registerPost,
} = require('../controllers/routing/register')

const {
    loggedIn,
    loginError,
    loggedOut,
    authenticate,
    splashpage
} = require('../controllers/routing/login')

const {
    findUserHome,
    profile,
    profileId,
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
    //Get routes
    .get('/', loggedIn, findUserHome)
    .get('/profiel', loggedIn, profile)
    .get('/profiel/:id', loggedIn, profileId)
    .get('/splashpage', splashpage)
    .get('/login', loginError)
    .get('/register', register)
    .get('/search', loggedIn, search)
    .get('/matches', loggedIn, matches)

    //Post requests
    .post('/profiel/hobby', loggedIn, profileHobbyPost)
    .post('/profiel/delete', loggedIn, profileDeletePost)
    .post('/profiel/image', loggedIn, upload.single('image'), profilePicturePost)
    .post('/register', upload.single('image'), urlencodedParser, registerPost)
    .post('/login', authenticate)
    .post('/logout', loggedOut)
;

router.use(function (req, res) {
    res.status(404).render('404.pug', {
        title: 'Sorry, page not found',
        message: 'Page not found'
    });
});

// [
//     check('firstName', 'First name is required').isLength({
//         min: 2
//     }),
//     check('lastName', 'Last name is required').isLength({
//         min: 2
//     }),
//     check('gender', 'Gender is required').exists(),
//     check('pref', 'Sexual preference is required').exists(),
//     check('food', 'Food preference is required').exists(),
//     check('email', 'Email does not appear to be valid').isEmail()
// ],

module.exports = router