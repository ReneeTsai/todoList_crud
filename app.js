const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
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
//handlebars set view engine
app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");
//--server------------------------------------
app.get("/", (req, res) => {
  res.render("index");
});
app.listen("3000", () => {
  console.log("this is listening on localhost:3000");
});