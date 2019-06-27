const login = require('../login.js')
const LocalStrategy = require('passport-local').Strategy
const userSchema = require('../../models/user')
const {
    check,
    validationResult
} = require('express-validator')
const express = require("express")
const app = express()


function register(req, res) {
    res.render('register', {
        title: 'register'
    })
}


async function registerPost(req, res, err) {
    // const error = validationResult(req)
    try {
        // validationResult(req).throw();

        let user = await userSchema.findOne({
            email: req.body.email
        })
        if (user) {
            return res.status(400).send('Gebruiker bestaat al')
        } else {
            if (req.body.password === req.body.confPassword) {
                try {
                    user = new userSchema({
                        email: req.body.email,
                        password: req.body.password,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        gender: req.body.gender,
                        age: req.body.age,
                        pref: req.body.pref,
                        image: Math.floor(Date.now() / 1000000) + '.png',
                        food: req.body.food,
                    })
                    await user.save();
                    return res.redirect('/login');
                } catch (err) {
                    console.log(err)
                    return res.status(422).render('register', {
                        errors: 'All fields are required'
                    });
                }
            } else {
                return res.render('register', {
                        errors: "Passwords don't match"
                })
            }
        }
    } catch (err) {
        console.log(err)
        return res.status(422)({
            errors: 'All fields are required'
        });
    }
}

module.exports = {
    register,
    registerPost,
}