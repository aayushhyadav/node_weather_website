const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//define paths for express
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//to setup static directory
app.use(express.static(publicDirectoryPath)) 

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title : 'Weather',
        name : 'Aayush Yadav'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title : 'About me',
        name : 'Aayush Yadav'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title : 'Help',
        message : 'Need help, feel free to ask any queries',
        name : 'Aayush Yadav'
    })
})

//first arg is route, second is callback function
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error : 'Please provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({
                error
            })
        }
    
        forecast(latitude, longitude, (error, description, curTemp, feelTemp, humidity) => {
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                location,
                description,
                curTemp,
                feelTemp, 
                humidity
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error : 'Please provide a search query'
        })
    }

    console.log(req.query)
    res.send({
        product : []
    })
})

app.get('/help/*', (req, res) => {
   res.render('404', {
       message : 'Help article not found',
       name : 'Aayush Yadav',
       title : '404'
   })
})

app.get('*', (req, res) => {
   res.render('404', {
       message : 'Page not found',
       name : 'Aayush Yadav',
       title : '404'
   })
})

app.listen(port, () => {
    console.log('Server up at port ' + port);
}) //starts the server, takes port number as the arg
