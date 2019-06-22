const userSchema = require('../../models/user')
const passport = require('passport')

function findUserHome(req, res) {
    const user_id = req.session.passport.user
    userSchema.findOne({
        _id: user_id
    }, (err, user) => {
        res.render('index', {
            title: 'Winked',
            username: user.email
        })
    })
}

function profile(req, res) {
    const user_id = req.session.passport.user
    let user = userSchema.findOne({
        _id: user_id
    }, (err, user) => {
        res.render('profiel', {
            title: 'Profiel',
            email: user.email,
            naam: user.firstName + ' ' + user.lastName,
            hobby: user.hobby,
            gender: user.gender,
            imgUrl: `img/avatars/${user.image}`
        })
        console.log(user.image)
    })
}

async function profileHobbyPost(req, res) {
    const user_id = {
        _id: req.session.passport.user
    };
    let update = {
        hobby: req.body.hobby
    };
    let user = await userSchema.findOneAndUpdate(user_id, update, {
        new: true,
        upsert: true
    })
    return res.redirect('/profiel');
}
async function profileDeletePost(req, res) {
    const user_id = {
        _id: req.session.passport.user
    };

    let user = await userSchema.findByIdAndRemove(user_id, (error, data) => {
        if (error) {
            console.log("error deleting");
            throw error;
        } else {
            console.log("deleted user");
            res.status(204);
        }
    });
    return res.redirect('/register');
}

async function profilePicturePost(req, res) {
    const user_id = {
        _id: req.session.passport.user
    };
    let update = {
        image: Math.floor(Date.now() / 10000) + '.png'
    };
    let user = await userSchema.findOneAndUpdate(user_id, update, {
        new: true,
        upsert: true
    })
    return res.redirect('/profiel');
}

module.exports = {
    findUserHome,
    profile,
    profileHobbyPost,
    profileDeletePost,
    profilePicturePost
}