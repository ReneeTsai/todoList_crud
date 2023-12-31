//使用者認證 (user authentication)」有關的 middleware
//isAuthenticated() 是Passport.js 提供的函式
module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("warning_msg", "請先登入才能使用。");
    res.redirect("/users/login");
  },
};
