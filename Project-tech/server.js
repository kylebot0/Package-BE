const express = require('express')
const app = express()
const port = 5500

app.set('view engine', 'pug')
app.get('/', function (req, res) {
    res.render('index', {
        title: 'Dating site',
        message: ''
    })
})

app.use(express.static('public'), function (req, res) {
    res.status(404).render('404.pug', {
        title: '404',
        message: 'Page not found'
    });
})

app.listen(port, () => console.log(`Server listening on port: ${port}`))
