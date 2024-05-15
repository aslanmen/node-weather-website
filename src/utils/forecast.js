const request=require('request')


const forecast=(latitude,longitude,callback)=>{
  const url='https://api.weatherapi.com/v1/current.json?key=d564c7e532704ccaa23131957240405&q='+latitude+','+longitude+'&aqi=no&lang=tr'
  request({url,json:true},(error,{body})=>{
    if(error){
        callback("Unable to connect to weather service",undefined)
    }
    else if(body.error){
        callback("Unable to find location",undefined)
    }
    else{
        callback(undefined,body.current.condition.text+". Dışarısı: "+body.current.temp_c+" derece. Hissedilen: "+body.current.feelslike_c+" derece")
    }
  })
}
module.exports=forecast;
