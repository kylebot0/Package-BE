const userSchema = require('../../models/user')
const passport = require('passport')

function search(req, res) {
    const user_id = req.session.passport.user
    userSchema.findOne({
        _id: user_id
    }, (err, user) => {
        let user_pref = user.pref
        let user_food = user.food
        userSchema.find({
            gender: user_pref,
            food: user_food
        }, (err, matches) => {
            if (err) {
                console.log(err);
                return
            }

            if (matches.length == 0) {
                res.render('search', {
                    matches: matches.length,
                    matchId: '',
                    message: 'Try again later,'
                })
            }

            if (matches.length > 0) {
                let matchAmount = matches.length
                let matchArray = {
                    matchesId: []
                };
                for (let i = 0; i < matchAmount; i++) {
                    let matchId = matches[i]._id
                    matchArray.matchesId.push(matchId)
                }
                console.log(matchAmount)
                console.log(matchArray)
                userSchema.findOneAndUpdate(user_id, matchArray, {
                    new: true,
                    upsert: true
                }, (err) => {
                    if (err) {
                        console.log(err)
                        return
                    }
                })
                res.render('search', {
                    matches: matchAmount,
                })
            }
        })
    })
}

async function matches(req, res) {
    const user_id = req.session.passport.user
    console.log(user_id)
    let user = userSchema.findOne({
        _id: user_id
    }, (err, user) => {
        console.log(user.matchId)
        // if (user.matchId == undefined) {
        //     res.render('matches', {
        //         title: 'Matches | ' + user.firstName + ' ' + user.lastName,
        //         message: 'Nog geen matches, probeer eerst te zoeken'
        //     })
        // } else {
        let matchArray = []
        let matchesId = user.matchesId
        for (let i = 0; i < matchesId.length; i++) {
            userSchema.findOne({
                _id: matchesId[i]
            }, (err, res) => {
                let obj = {
                    matchId: res._id,
                    naam: res.firstName + ' ' + res.lastName,
                    imgUrl: `img/avatars/${res.image}`,
                }
                matchArray.push(obj)
            })
        }
        setTimeout(() =>{
            console.log(matchArray)
            res.render('matches', {
                title: 'Matches | ' + user.firstName + ' ' + user.lastName,
                matchArray: matchArray
            })
        },1000)
    // }
    })

}

module.exports = {
    search,
    matches,
}