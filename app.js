const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const routes = require("./routes"); // 引用路由器
const app = express();
const PORT = process.env.PORT || 3000;
// const PORT = process.env.PORT || 3000;
require("./config/mongoose");
app.use(
  session({
    secret: " ThisIsMySecret",
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
//app.use(routes); 取代上面app.get("/", (req, res)
app.use(routes); //將 request 導入路由器
//新增資料的頁面搬移至routes.module.todo.js

//監聽localhost:3000
app.listen(PORT, () => {
  console.log(`this is listening on localhost:${PORT}`);
});
