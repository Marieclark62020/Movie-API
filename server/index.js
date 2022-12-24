const express = require('express');
const request = require('request');
const app= express();
//allows access to .env file


require('dotenv').config()

let {TMDB_API_KEY}= process.env


app.use(express.static('public'))




//https://api.themoviedb.org/3/movie/now_playing?api_key=ad2f90d124ffdf1ae454e464f45f7169





app.get('/', (req, res) => {
    res.redirect('/home')
});
app.get('/home', (req,res)=>{
    res.render('home.ejs'); 
});


const baseUrl="https://api.themoviedb.org/3"



app.get("/getMovies", (req, res,) => {
    let route = "movie/now_playing";
    let query = `api_key=${TMDB_API_KEY}`;
    let endpoint = `${baseUrl}/${route}?${query}`;
  
    // NOTE: 4 things ALL HTTP requests do/need!!
    // 1) utilize endpoint (and method)
    // 2) if ok - parse our response
        // throw error
    // 3) do something with data
    // 4) handle errors
    request(endpoint, (error, response, body) => {
      if(!error && response.statusCode === 200){
        let data = JSON.parse(body)
        res.render("results.ejs", {doggy: data.results})
      } else {
        console.log(error)
        res.render('error.ejs')
      }
    });
  });


app.get('/showDetails/:id', (req, res)=>{
    console.log(req.params.id)
    let endpoint = `https://api.themoviedb.org/3/movie/${req.params.id}/reviews?api_key=${TMDB_API_KEY}`
    console.log(endpoint)
    request(endpoint, (error, response, body)=>{
      if(!error && response.statusCode === 200){
        let data = JSON.parse(body)
        // res.send(data.results)
        res.render("reviews.ejs", {reviews: data.results})
      } else {
        console.log(error)
        res.render('error.ejs')
      }
    })
  })

const port = process.env.PORT || 3000
app.listen(port, ()=> console.log(`movie thing listening on port ${port}`))


//make sure to install dotenv OR ELSE IT WONT WORK!!!!!!!