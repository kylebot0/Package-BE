const fetch = require('node-fetch')
let weatherImg = '';
const weather = () => {
    fetch('https://aws.random.cat/meow')
        .then(res => res.json())
        .then(json => {
            weatherImg = json.file
        })
}
weather()