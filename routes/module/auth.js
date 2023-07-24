const express = require("express");
const router = express.Router();
const passport = require("passport");

//向Facebook發出請求，要求的資料scope: ['email', 'public_profile']
router.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["email", "public_profile"],
  })
);
//是 Facebook 把資料發回來的地方，和 POST /users/login 意思差不多
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/users/login",
  })
);

module.exports = router;
