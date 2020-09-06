// const weatherform=document.querySelector('form')
// const search=document.querySelector('input')
// const message1=document.querySelector('#message1')
// const message2=document.querySelector('#message2')
// message1.textContent='Loading...'
// message2.textContent=" "

// weatherform.addEventListener('submit', (e) => {
//     e.preventDefault()
//     const location = search.value
//     fetch('/weather?address='+location).then((response)=>{
//     response.json().then((data)=>{
//         if (data.error) {
//         }
//         else {
//             message1.textContent=data.location
//             message2.textContent=data.forcast
//             console.log(data.location)
//             console.log(data.forcast)
           
//         }
//     })
// })
// })
const weatherform=document.querySelector('form')
const search=document.querySelector('input')
const loc=document.querySelector('#location')
const about=document.querySelector('#about')
const temp=document.querySelector('#temp')
// const feelslike=document.querySelector('#feelslike')
const windspeed=document.querySelector('#windspeed')
const humidity=document.querySelector('#humidity')
const time=document.querySelector('#time')
const uvindex=document.querySelector('#uvindex')
const visibility=document.querySelector('#visibility')

loc.textContent="Enter your location and hit search to know the Weather!"
about.textContent=" "
// feelslike.textContent=" "
humidity.textContent="Humidity"
windspeed.textContent="Windspeed"
uvindex.textContent="UV Index"
visibility.textContent="Visibility"
temp.textContent=" "
time.textContent=" "

weatherform.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if (data.error) {
        }
        else {
            loc.textContent=data.location
            about.textContent=data.about
            humidity.textContent=data.humidity + " %"
            windspeed.textContent=data.windspeed + " km/hr"
            time.textContent=data.time
            uvindex.textContent=data.uvindex + " of 10"
            visibility.textContent=data.visibility+ " Meters"
            temp.textContent=data.temperature+"°"
            // feelslike.textContent=data.feelslike
            console.log(data.location)
            console.log(data.about)
           
        }
    })
})
})