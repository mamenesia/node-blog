const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync("B4c0/\/", salt);


const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true,"Please input your username"],
    unique: true
  },
  email: {
    type: String,
    required: [true, "Please input your valid email address"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Please input your password"]
  }
});

UserSchema.pre('save', function(next){
  const user = this;

  bcrypt.hash(user.password, 10, function(error, encrypted){
    user.password = encrypted;

    next()
  })
});

module.exports = mongoose.model('User', UserSchema);