var mongoose = require("./connection")

var userSchema = mongoose.Schema({
    username: String,
    email: String,
    sexe: String,
    password: String,
    
});

var userModel = mongoose.model('users', userSchema);

module.exports = userModel;