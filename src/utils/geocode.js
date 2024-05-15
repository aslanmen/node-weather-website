const request = require('request')

const geocode=(adress,callback)=>{
    const url = 'https://geocode.search.hereapi.com/v1/geocode?q='+encodeURIComponent(adress)+'&limit=1&apiKey=T_S2cj_YS6T-ocj1Wr3LS3hUvVvngzuSpFAL48AVMaI'
    request({url, json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to location service',undefined)
        }
        else if(body.items.length===0){
            callback('Unable to find location. Try another searche',undefined)
        }
        else{
          callback(undefined,
           {
               latitude: body.items[0].position.lat,
               longitude: body.items[0].position.lng,
               location: body.items[0].address.label
            
           }
           )
        
        }
    })
   }

   module.exports=geocode;
// the below code fragment can be found in: