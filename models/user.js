const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Hash_Salt = 10;
var userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        lowercase: true,
        required: true,
        index: true,
        required: true
    },
    lastName: {
        type: String,
        lowercase: true,
        required: true,
        index: true,
        required: true
    },
});

//Bit of help from stackoverflow https://stackoverflow.com/questions/14588032/mongoose-password-hashing
userSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, Hash_Salt, function (err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    })
});
var user = mongoose.model('user', userSchema);
module.exports = user;