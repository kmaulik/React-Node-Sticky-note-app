//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    image_name: String,
    notes:Array
});

// Compile model from schema
var User = mongoose.model('users', userSchema);

module.exports = User;
