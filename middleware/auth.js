const User = require('../database/models/User');

module.exports = (req, res, next) => {
  // fetch user data from database
  User.findById(req.session.userId, (error, user) => {
    if(error || !user){
      return res.redirect('/');
    }
    next();
  });
  // verify user

}