const path=require('path')
const express=require('express')
const hbs=require('hbs')
const request=require('request')
const geocode=require('./utils/geocode.js')
const forcast=require('./utils/forcast.js')

const app=express()
const port=process.env.PORT || 3000

//define paths for express config
const publicpath=path.join(__dirname, '../public')
const viewspath=path.join(__dirname, '../templates/views')
const partialspath=path.join(__dirname, '../templates/partials')

//setup hadlebars engine and views loction
app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialspath)

//setup static directory
app.use(express.static(publicpath))
app.get('',(req, res)=>{
    res.render('index', {
        title:'Weather',
        name: 'Khushi Sagraya',
        address: req.query.address
    })
})
app.get('/about',(req, res)=>{
    res.render('about', {
        title:'About',
        name: 'Khushi Sagraya'
    })
})
app.get('/help',(req, res)=>{
    res.render('help', {
        title:'Help',
        name: 'Khushi Sagraya',
        helptext:'You can get help here'
    })
})
app.get('/weather',(req, res)=>{

    if(!req.query.address) {
        return res.send({
            error :"Please Prodide an address"
        })

    }
    
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        // forcast(latitude, longitude, (error,forcastdata)=>{
        forcast(latitude, longitude, (error,{about,temperature,feelslike,windspeed,humidity,time ,uvindex ,visibility}={})=>{
            if(error){
                return res.send({error})
            }
            // res.send({
            //     forcast : forcastdata,
            //     location ,
            //     address : req.query.address
            // })
            res.send({
                about,
                temperature,
                feelslike,
                windspeed,
                humidity,
                location ,
                time,
                uvindex,
                visibility,
                address : req.query.address
            })

            
        })
    })
  
})

app.get('/products',(req,res)=>{

    if(!req.query.search){
        return res.send({
            error : " provide search term"
        })
    }
    console.log(req.query.search)
    res.send({
        products : []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title : '404 ',
        name: 'Khushi Sagraya',
        errorMessage :'Help article not found '
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title : 404,
        name: 'Khushi Sagraya',
        errorMessage :'Page not found '
    })
})


app.listen(port, ()=>{
    console.log('server is up on port '+ port)
})

