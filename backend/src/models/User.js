const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: String,
  username: String,
  password: String,
  birthday: Date,
});

module.exports = mongoose.model('User', UserSchema);