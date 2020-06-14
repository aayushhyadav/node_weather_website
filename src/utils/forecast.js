const request = require('request')
const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=6c0b4e68e116713bd3c7605101e804df&query=' + latitude + ',' + longitude 
    request({url, json : true}, (error, {body} = {}) => {
        if(error){
            callback('Unable to connect to the weather service!', undefined)
        }
        else if(body.error){
            callback('Unable to find location', undefined)
        }
        else{
            console.log(latitude + ', ' + longitude)
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out.')
        }       
     
    })
}
module.exports = forecast