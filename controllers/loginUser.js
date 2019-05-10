const User = require('../database/models/User');
const bycrypt = require('bcryptjs');

module.exports = (req, res) => {
  const { email, password } = req.body;

  // find the user in database
  User.findOne({ email }, (error, user) => {

    
    if(user) {
      // check user password
      bycrypt.compare(password, user.password, (error, same) => {
        
        if(same) {
          req.session.userId = user._id;
          // login user if password is correct
          res.redirect('/');
        } else {
          // if error, redirect to login
          res.redirect('/auth/login');
        }

      })
    } else {
      return res.redirect('/auth/login');
    }
  })
}