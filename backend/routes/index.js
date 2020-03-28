var express = require('express');
var router = express.Router();

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

  cityList.push({
    name:req.body.city, img:"/images/picto-1.png", desc:"Nuage", tempMin:0, tempMax:1
  })

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
