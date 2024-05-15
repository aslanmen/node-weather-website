const path=require('path')
const express = require("express");
const hbs=require("hbs")
const geocode=require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express();
//Define paths for express
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

//Setup handlers engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve 
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
   res.render('index',{
      title:'Weather',
      name:'Ahmet Aslan'

   })
})
app.get('/about',(req,res)=>{
  res.render('about',{
     title:'About Me',
     name:'Ahmet Aslan'

  })
})

app.get('/help',(req,res)=>{
  res.render('help',{
     helpText:'This is some helpful text',
     title:'Help',
     name:'Ahmet Aslan'
  })
})


app.get("/weather", (req, res) => {
  if(!req.query.adress){
    return res.send({
      error:'You must provide a adress'
    })
  }
  else{
    geocode(req.query.adress, (error, {latitude,longitude,location}={}) => {
      if (error) {
        return res.send({error});
      }
      
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({error});
        }
        res.send({
          location,
          forecast:forecastData,
          
        })
        
        
      });
      
    });
  }
});
app.get("/help/*", (req, res)=>{
  res.render('404',{
     title:'404',
     name:'Ahmet Aslan',
     errorMessage:'Help article not found'
  })
})

app.get("/products", (req, res)=>{
  if(!req.query.search){
    return res.send({
      error:'You must provide a search term'
    })
  }
  console.log(req.query.search)
  res.send({
    products:[]
  });
})

app.get("*", (req, res)=>{
  res.render('404',{
     title:'404',
     name:'Ahmet Aslan',
     errorMessage:'Page not found'
  })
})

app.listen(3000, () => {
  console.log("server is up on port 3000");
});
