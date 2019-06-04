const express = require('express')
const session = require('express-session');
const router = express.Router()
const userSchema = require('../models/user')
const passport = require('passport')
const login = require('../controllers/login');
const LocalStrategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt')
const urlencodedParser = bodyParser.urlencoded({
    extended: false
});

function loggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect('/');
    } else {
        res.redirect("/login");
    }
}

router.get('/', function (req, res) {
    const user_id = req.session.passport.user
    userSchema.findOne({_id: user_id}, (err, user) => {
        if (req.user) {
            res.render('index', {
                title: 'Winked',
                username: user.email
            })
        } else {
            res.render('index', {
                title: 'WinkedIn'
            });
        }

    })
});

// Met een beetje hulp van https://medium.com/createdd-notes/starting-with-authentication-a-tutorial-with-node-js-and-mongodb-25d524ca0359
router.post('/logout', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: res.send('Failed'),
        failureFlash: 'Invalid username or password.'
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