var mongoose = require('mongoose');


var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
   
        useUnifiedTopology : true
   }
   mongoose.connect('mongodb+srv://Admin:azerty@cluster0-w0dmi.mongodb.net/weatherApp?retryWrites=true&w=majority',
    options,    
    function(err) {
     console.log(err);
    }
   );


var citySchema = mongoose.Schema({
    name: String,
    img: String,
    desc: String,
    tempMin: Number,
    tempMax: Number,
});

var cityModel = mongoose.model('cities', citySchema);

module.exports = cityModel;