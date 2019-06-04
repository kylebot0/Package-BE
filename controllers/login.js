const express = require('express')
const router = express.Router()
const userSchema = require('../models/user')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const urlencodedParser = bodyParser.urlencoded({
    extended: false
});

module.exports = function(passport) {
    passport.use(new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            session: true
        },
        function (username, password, done) {
            console.log('function has been reached')

            let auth = {
                email: username
            };
            userSchema.findOne(auth, function (err, user) {
                if (err) throw err;
                if (!user) {
                    console.log('no user found')
                    return done(null, false, {
                        message: 'No user found'
                    });
                }
                bcrypt.compare(password, user.password, function (err, authSucces) {
                    if (err) throw err;
                    if (authSucces) {
                        console.log(`${user.firstName} is now logged in`);
                        var user_id = user.id
                        return done(null, user.id);
                    } else {
                        return done(null, false, {
                            message: 'Wrong password'
                        });
                    }
                });
            });
        }));
    passport.serializeUser(function (user_id, done) {
        done(null, user_id);
    });

    passport.deserializeUser(function (user_id, done) {
         User.findById(user_id.user, function (error, user) {
             if (error) {
                 done(error);
             } else {
                 done(null, user);
             }
         })
    });
}
