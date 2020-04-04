var express = require('express');
var router = express.Router();
var request = require('sync-request');
var mongoose = require('mongoose');


// importer le fichier bdd qui permet la connexion avec mongoose (checker dans le terminal "null" = Ok)
var cityModel = require('../models/cities')
var userModel = require("../models/users")

/* GET home page. */

var cityList = [
  // {name:"Paris", img:"/images/picto-1.png", desc:"Nuage", tempMin:0, tempMax:1},
  // {name:"Marseille", img:"/images/picto-1.png", desc:"Soleil", tempMin:1, tempMax:2},
  // {name:"Bordeaux", img:"/images/picto-1.png", desc:"Pluie", tempMin:2, tempMax:3},
];

var dateUTC= new Date();
var day = dateUTC.getDate();
var month = dateUTC.getMonth()+1;
var dateD = day+"/"+month;



router.get('/', function(req, res, next) {
  
 
  
  res.render('login');
});


router.get('/weather', async function(req, res, next) {
  
  // console.log('dateD*************************** :', dateD);
  

  var cityList = await cityModel.find();
  console.log('cityList :', cityList);

  res.render('weather', { cityList: cityList, dateD: dateD });
});


router.post('/add-city', async function(req, res, next) {

  var result = request("GET", `https://api.openweathermap.org/data/2.5/weather?q=${req.body.city}&lang=fr&units=metric&appid=3b5f9288fe346cb7c91124e5d79fbfcd`);
  
  var resultJSON = JSON.parse(result.body);

  // console.log('resultJSON :', resultJSON);
  var stringWithoutFirstLetter = req.body.city.slice(1,30);
  var firstLetterToUpperCase = req.body.city.slice(0,1).toUpperCase();
  // console.log('stringWithoutFirstLetter :', stringWithoutFirstLetter);
  // console.log('firstLetterToUpperCase :', firstLetterToUpperCase);

// var cityList = await cityModel.find()

var alreadyExist = await cityModel.findOne({
  name: firstLetterToUpperCase+stringWithoutFirstLetter,
});

// for (i=0 ; i<cityList.length; i++){
//   if(req.body.city.toLowerCase() == cityList[i].name.toLowerCase()) {
//     alreadyExist = true;
//   }
// }

if(alreadyExist == null && resultJSON.name){
console.log('resultJSON.weather[0].icon :', resultJSON.weather[0].icon);

  // cityList.push({
  //   name:firstLetterToUpperCase+stringWithoutFirstLetter, 
  //   img:"http://openweathermap.org/img/wn/"+resultJSON.weather[0].icon+".png", 
  //   desc:resultJSON.weather[0].description, 
  //   tempMin:resultJSON.main.temp_min, 
  //   tempMax:resultJSON.main.temp_max,
  // })

  var newCity = new cityModel ({
    name:firstLetterToUpperCase+stringWithoutFirstLetter, 
    image:"http://openweathermap.org/img/wn/"+resultJSON.weather[0].icon+".png", 
    desc:resultJSON.weather[0].description, 
    tempMin:resultJSON.main.temp_min, 
    tempMax:resultJSON.main.temp_max, 
   });

   
await newCity.save();

}

cityList = await cityModel.find()
  
// console.log('req.body :', req.body);
// console.log('req.body.city :', req.body.city);
  
  res.render('weather', { cityList,dateD: dateD });
});

router.get('/delete-city', async function(req, res, next) {

  // console.log('deleteclickOK :');

  console.log('req.query.id :', req.query.id);

  await cityModel.deleteOne({
    _id : req.query.id
  })

 var cityList = await cityModel.find()
  
  res.render('weather', { cityList, dateD, newUser});
});



router.get('/update-city', function(req, res, next) {
  
  // console.log('citySchema :', citySchema);
  
  res.render('weather', { cityList, dateD});
});



router.post('/sign-up', async function(req, res, next) {

  console.log('req.body********** :', req.body);
  console.log('req.body.username :', req.body.username);

  var newUser = new userModel({
    username: req.body.username,
    email: req.body.email,
    sexe: req.body.sexe,
    password: req.body.password,
  });

  await newUser.save()

  // var monImage = "";

  // if(req.body.sexe == "femme"){
  //   monImage = src="./images/avatar-2.jpg"
  //   console.log('monImage :', monImage);
  // } else {
  //   monImage = src="./images/avatar-1.jpg"
  //   console.log('monImage :', monImage);
  // };


  res.render('weather', { cityList, dateD, newUser});
});

module.exports = router;
