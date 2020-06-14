const request = require('request')

//Geocoding
//converting the city into the latitudes and longitudes

const geocode = (address, callback) => {
    //encodeURIComponent is safe to use on url because it converts the special symbols to their encoded form
    //and prevents it from crashing
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWF5dXNoMTIiLCJhIjoiY2thcWV4YTh5MDhncjJycWJvcDAxNXNrZyJ9.5bYePLz9GZz-o61b_Y9Uiw&limit=1'

    //request npm lib used for making https request
    request({url, json : true}, (error, {body} = {}) => {
        if(error){
            callback('Unable to connect to map service', undefined)
        }
        else if(!body.features[0]){
            callback('Unable to find the location', undefined)
        }
        else{
            callback(undefined, {
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
            })
        }
    })
}

module.exports = geocode