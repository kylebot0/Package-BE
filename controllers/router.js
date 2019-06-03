const express = require('express')
const router = express.Router()
const user = require('../models/user')

router.get('/', function (req, res) {
        res.render('index', {
        title: 'WinkedIn',
        message: '',
    })
})  

router.get('/login', function (req, res) {
    res.render('login', {
    })
})

// Met een beetje hulp van https://medium.com/createdd-notes/starting-with-authentication-a-tutorial-with-node-js-and-mongodb-25d524ca0359
router.post('/login', function (req, res) {
    if (req.body.email && req.body.password) {
        var userData = {
            email: req.body.email,
            password: req.body.password,
        }
        User.create(userData, function (err, user) {
            if (err) {
                return next(err);
            } else {
                req.session.userId = user._id;
                return res.redirect('/');
            }
        });
    } else {
        var err = new Error('Velden niet ingevuld')
        err.status = 400
        return next(err)
    }
})

router.get('/register', function (req, res) {
    res.render('register', {})
})

router.post('/register', function (req, res) {
    if (req.body.email && req.body.password && req.body.confPassword) {
        if (req.body.password && req.body.confPassword) {
            var userData = {
                email: req.body.email,
                password: req.body.password,
            }
            User.create(userData, function (err, user) {
                if (err) {
                    return next(err);
                } else {
                    req.session.userId = user._id;
                    return res.redirect('/login');
                }
        });
        } else {
            var err = new Error('Wachtwoorden komen niet overaan')
            err.status = 400
            return next(err)
        }
    } else {
        var err = new Error('Velden niet ingevuld')
        err.status = 400
        return next(err)
    }
})

router.use(function (req, res, next) {
    res.status(404).render('404.pug', {
        title: 'Sorry, page not found',
        message: 'Page not found'
    });
});

module.exports = router