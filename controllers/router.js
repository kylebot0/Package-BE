const express = require('express')
const session = require('express-session')
const router = express.Router()
const userSchema = require('../models/user')
const passport = require('passport')
const login = require('../controllers/login')
const LocalStrategy = require('passport-local').Strategy
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const multer = require("multer")
const path = require('path')
const urlencodedParser = bodyParser.urlencoded({
    extended: false
})



// CHecks if user is logged in
function loggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    } else {
        res.redirect("/login")
    }
}
//File storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/img/avatars'))
    },
    filename: function (req, file, cb) {
        cb(null, Math.floor(Date.now() / 10000)+'.png')
    }
})

const upload = multer({
    storage: storage,
    onFileUploadStart: function (file) {
        console.log(file.originalname + ' is starting ...')
    },
});

//All routes
router.get('/', loggedIn, function (req, res) {
    const user_id = req.session.passport.user
    userSchema.findOne({
        _id: user_id
    }, (err, user) => {
        res.render('index', {
            title: 'Winked',
            username: user.email
        })
    })
})
// -----------PROFIEL-----------------------------------------------------
router.get('/profiel', loggedIn, function (req, res) {
    const user_id = req.session.passport.user
    let user = userSchema.findOne({
        _id: user_id
    }, (err, user) => {
        res.render('profiel', {
            title: 'Profiel',
            email: user.email,
            naam: user.firstName + ' ' + user.lastName,
            hobby: user.hobby,
            gender: user.gender,
            imgUrl: `img/avatars/${user.image}`
        })
        console.log(user.image)
        
    })
})
router.post('/profiel/hobby', loggedIn, async (req, res) => {
    const user_id = {_id: req.session.passport.user};
    let update = {hobby: req.body.hobby};
    let user = await userSchema.findOneAndUpdate(user_id, update, {
        new: true,
        upsert: true
    })
    return res.redirect('/profiel');
})

router.post('/profiel/delete', loggedIn, async (req, res) => {
    const user_id = {
        _id: req.session.passport.user
    };
    
    let user = await userSchema.findByIdAndRemove(user_id, (error, data) => {
        if (error) {
            console.log("error deleting");
            throw error;
        } else {
            console.log("deleted user");
            res.status(204);
        }
    });
    return res.redirect('/register');
})

router.post('/profiel/gender', loggedIn, async (req, res) => {
    const user_id = {
        _id: req.session.passport.user
    };
    let update = {
        gender: req.body.gender
    };
    let user = await userSchema.findOneAndUpdate(user_id, update, {
        new: true,
        upsert: true
    })
    return res.redirect('/profiel');
})

router.post('/profiel/image', loggedIn, upload.single('image'), async (req, res) => {
    const user_id = {
        _id: req.session.passport.user
    };
    let update = {
        image: Math.floor(Date.now() / 10000) + '.png'
    };
    let user = await userSchema.findOneAndUpdate(user_id, update, {
        new: true,
        upsert: true
    })
    return res.redirect('/profiel');
})

//----------LOGIN / REGISTER ----------------------------------------------------
// Met een beetje hulp van https://medium.com/createdd-notes/starting-with-authentication-a-tutorial-with-node-js-and-mongodb-25d524ca0359
// Ook met behulp van de docs van Passport
router.post('/logout', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: res.send('Failed'),
        failureFlash: 'Failed to logout'
    })(req, res, next);
})

router.get('/login', function (req, res) {
    res.render('login', {})
})

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: 'Invalid username or password.'
    })(req, res, next);
})

router.get('/register', function (req, res) {
    res.render('register', {})
})

router.post('/register', urlencodedParser, async (req, res, err) => {
    try {
        let user = await userSchema.findOne({
            email: req.body.email
        })
        if (user) {
            let err = res.status(400)
            return err.send('Gebruiker bestaat al')
        } else {
            if (req.body.password === req.body.confPassword) {
                user = new userSchema({
                    email: req.body.email,
                    password: req.body.password,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName
                });

                await user.save();
                return res.redirect('/login');
            } else {
                return res.send('Wachtwoorden komen niet overeen')
            }
        }
    } catch (err) {
        console.log(err)
        throw next(err)
    }
})

router.use(function (req, res) {
    res.status(404).render('404.pug', {
        title: 'Sorry, page not found',
        message: 'Page not found'
    });
});

module.exports = router