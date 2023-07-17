const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const Todo = require("./models/todo");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
// 引用路由器
const routes = require("./routes");

// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const app = express();
//設定連線到mongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
// 取得資料庫連線狀態
const db = mongoose.connection;
//連線異常
db.on("error", () => {
  console.log("mongodb error");
});
//連線成功
db.once("open", () => {
  console.log("mongodb connected!");
});
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
app.listen("3000", () => {
  console.log("this is listening on localhost:3000");
});
