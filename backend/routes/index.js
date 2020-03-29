var express = require('express');
var router = express.Router();
var request = require('sync-request');

/* GET home page. */

var cityList = [
  // {name:"Paris", img:"/images/picto-1.png", desc:"Nuage", tempMin:0, tempMax:1},
  // {name:"Marseille", img:"/images/picto-1.png", desc:"Soleil", tempMin:1, tempMax:2},
  // {name:"Bordeaux", img:"/images/picto-1.png", desc:"Pluie", tempMin:2, tempMax:3},
];


router.get('/', function(req, res, next) {
  
  
  res.render('index', { cityList });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.get('/weather', function(req, res, next) {
  

  // console.log('cityList :', cityList);

  res.render('weather', { cityList: cityList });
});

router.post('/add-city', function(req, res, next) {

  var result = request("GET", `https://api.openweathermap.org/data/2.5/weather?q=${req.body.city}&lang=fr&units=metric&appid=3b5f9288fe346cb7c91124e5d79fbfcd`);
  
  var resultJSON = JSON.parse(result.body);

  console.log('resultJSON :', resultJSON);

var alreadyExist = false

var stringWithoutFirstLetter = req.body.city.slice(1,30);
var firstLetterToUpperCase = req.body.city.slice(0,1).toUpperCase();
console.log('stringWithoutFirstLetter :', stringWithoutFirstLetter);
console.log('firstLetterToUpperCase :', firstLetterToUpperCase);

for (i=0 ; i<cityList.length; i++){
  if(req.body.city.toLowerCase() == cityList[i].name.toLowerCase()) {
    alreadyExist = true;
  }
}

if(alreadyExist == false && resultJSON.name){
console.log('resultJSON.weather[0].icon :', resultJSON.weather[0].icon);

  cityList.push({
    name:firstLetterToUpperCase+stringWithoutFirstLetter, 
    img:"http://openweathermap.org/img/wn/"+resultJSON.weather[0].icon+".png", 
    desc:resultJSON.weather[0].description, 
    tempMin:resultJSON.main.temp_min, 
    tempMax:resultJSON.main.temp_max,
  })
}
  
console.log('req.body :', req.body);
console.log('req.body.city :', req.body.city);
  
  res.render('weather', { cityList });
});

router.get('/delete-city', function(req, res, next) {

  console.log('deleteclickOK :');

  cityList.splice(req.query.position, 1)
  
  res.render('weather', { cityList });
});

module.exports = router;
