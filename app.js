const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const routes = require("./routes"); // 引用路由器
const flash = require("connect-flash"); // 引用套件
// config passport.js
const usePassport = require("./config/passport");
//不是在「正式上線模式 (production mode)」中執行
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const app = express();
const PORT = process.env.PORT;
// config mongoose.js
require("./config/mongoose");
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
//app.use
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
//handlebars set view engine
app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");
//--server------------------------------------
//
usePassport(app);
//提示成功、錯誤字元
app.use(flash());
//usePassport(app) 之後、app.use(routes) 之前，加入middleware：
app.use((req, res, next) => {
  // 你可以在這裡 console.log(req.user) 等資訊來觀察
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.user = req.user;
  res.locals.success_msg = req.flash("success_msg");
  res.locals.warning_msg = req.flash("warning_msg");
  next();
});
//app.use(routes); 取代上面app.get("/", (req, res)
app.use(routes); //將 request 導入路由器
//新增資料的頁面搬移至routes.module.todo.js

//監聽localhost:3000
app.listen(PORT, () => {
  console.log(`this is listening on localhost:${PORT}`);
});
