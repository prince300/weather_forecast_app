const request = require('request')

const forcast=(latitude,longitude,callback)=>{
    const url= 'http://api.weatherstack.com/current?access_key=c40b4ad11abe8f37a8f4361ed44c4c85&query='+latitude+','+longitude+'&units=m'
    request({url ,json:true},( error, {body})=> {
        if(error)
    {
        callback('Unable to connect to weather servers!',undefined)
    }
    else if(body.error){
        callback('Unble to fetch location!',undefined)
    }
    else{
      //  if(!error&&response.statusCode==200)
         callback(undefined,{
             about: body.current.weather_descriptions[0] ,
             temperature: body.current.temperature ,
             feelslike : body.current.feelslike ,
             windspeed: body.current.wind_speed ,
            humidity: body.current.humidity,
            time: body.location.localtime,
            uvindex: body.current.uv_index,
            visibility: body.current.visibility,
        }  )
               // 'The weather of your region is ' + body.current.weather_descriptions[0] +'. Temperature is ' +
                // body.current.temperature + ' degrees and it feels like ' +
                // body.current.feelslike + 'degrees.'
        
            
    }
    })
    

}
module.exports=forcast
