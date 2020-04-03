var mongoose = require("./connection")

var citySchema = mongoose.Schema({
    name: String,
    img: String,
    desc: String,
    tempMin: Number,
    tempMax: Number,
});

var cityModel = mongoose.model('cities', citySchema);

module.exports = cityModel;