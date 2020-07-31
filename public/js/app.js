const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
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
                messageTwo.textContent = data.forecast
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
                        messageTwo.textContent = data.forecast
                    }
                })
            })
    })
})