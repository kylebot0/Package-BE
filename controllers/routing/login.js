const login = require('../login.js')
const LocalStrategy = require('passport-local').Strategy
const passport = require('passport')

function loggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    } else {
        res.redirect("/login")
    }
}

function authenticate(req, res, next) {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: 'Invalid username or password.'
    })(req, res, next);
}

function loggedOut(req, res, next) {
    if (req.session) {
        console.log('Is in session')
        req.session.destroy(err => {
            if (err) {
                return next(err);
            }
            return res.redirect("/");
        });
    }
}

module.exports = {loggedIn, authenticate, loggedOut};