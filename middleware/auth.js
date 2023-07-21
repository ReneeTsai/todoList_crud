//isAuthenticated() 是Passport.js 提供的函式
module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/users/login");
  },
};
