const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')
const messageFive = document.querySelector('#message-5')
const myForecast = document.querySelector('#myForecast')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ' '

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error 
            }
            else{
                messageOne.textContent = data.location
                messageTwo.textContent = data.description
                messageThree.textContent = data.curTemp
                messageFour.textContent = 'Feels like ' + data.feelTemp
                messageFive.textContent = 'Humidity is ' + data.humidity

                change(data.description)
            }
        })
    })  
})

myForecast.addEventListener('click', () => {
    if(!navigator.geolocation){
        return alert('Geolocation is not supported by your browser')
    }

    // disable the button
    myForecast.setAttribute('disabled', 'disabled')

    navigator.geolocation.getCurrentPosition((position) => {
        messageOne.textContent = 'Loading...'
        messageTwo.textContent = ' '

        fetch('/weather?address=' + position.coords.longitude + ',' + position.coords.latitude)
            .then((response) => {
                response.json().then((data) => {
                    if(data.error){
                        messageOne.textContent = data.error
                    }
                    else{
                        messageOne.textContent = data.location
                        messageTwo.textContent = data.description
                        messageThree.textContent = data.curTemp + ' Celsius'
                        messageFour.textContent = 'Feels like ' + data.feelTemp + ' Celsius'
                        messageFive.textContent = 'Humidity is ' + data.humidity + '%'        

                        change(data.description)
                    }
                })
            })
    })
})

const change = (description) => {
    if(description == 'Haze'){
        document.body.style.backgroundImage = "url('/images/Haze.jpg')"
    }

    else if(description == 'Sunny'){
        document.body.style.backgroundImage = "url('/images/Sunny.jpg')"
    }

    else if(description == 'Partly cloudy'){
        document.body.style.backgroundImage = "url('/images/PartlyCloudy.jpg')"
    }

    else if(description == 'Overcast'){
        document.body.style.backgroundImage = "url('/images/Overcast.jpg')"
    }

    else if(description.toLowerCase().includes('rain')){
        document.body.style.backgroundImage = "url('/images/Rain.png')"
    }

    else if(description.toLowerCase().includes('snow')){
        document.body.style.backgroundImage = "url('/images/snowfall.jpg')"
    }

    else{
        document.body.style.backgroundImage = "url('/images/Plain.jpg')"
    }
}