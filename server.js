const dotenv = require('dotenv').config()
const express = require('express')
const app = express()
const port = 5500

const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGODB_URI
const client = new MongoClient(uri, {
    useNewUrlParser: true
});
client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    console.log('connected');

    client.close();
});

app.set('view engine', 'pug')
app.use(express.static('public'))
app.use(require('./controllers'))


app.listen(port, () => console.log(`Server listening on port: ${port}`))
