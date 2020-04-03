var mongoose = require("./connection")

var usersSchema = mongoose.Schema({
    username: String,
    email: String,
    sexe: String,
    password: Number,
    
});

var userModel = mongoose.model('users', usersSchema);

module.exports = userModel;