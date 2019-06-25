const login = require('../login.js')
const LocalStrategy = require('passport-local').Strategy
const userSchema = require('../../models/user')


function register(req, res) {
    res.render('register', {
        title: 'register'
    })
}

async function registerPost(req, res, err) {
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
                    lastName: req.body.lastName,
                    gender: req.body.gender,
                    age: req.body.age,
                    pref: req.body.pref,
                    image: Math.floor(Date.now() / 10000) + '.png',
                    food: req.body.food,
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
}

module.exports = {register, registerPost}