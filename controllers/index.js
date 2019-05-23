const express = require('express');
const route = express.Router()

route.get('/', function (req, res) {
        res.render('index', {
        title: 'Dating site',
        message: '',
    })
})  

route.use(function (req, res, next) {
    res.status(404).render('404.pug', {
        title: 'Sorry, page not found',
        message: 'Page not found'
    });
});

module.exports = route