var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  userName : String,
  userPassword : String,
});

module.exports = mongoose.model('users', userSchema);
