const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const Todo = require("./models/todo");
const bodyParser = require("body-parser");
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
  // 取出 Todo model 裡的所有資料
  Todo.find()
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then((todos) => res.render("index", { todos: todos })) // 將資料傳給 index 樣板
    .catch((e) => console.log(e));
});
//新增資料的頁面
app.get("/todos/new", (req, res) => {
  return res.render("new");
});
//post取得/todos/new新增的資料，透過bodyParse解資資料後存取至name
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/todos", (req, res) => {
  const name = req.body.name; // 從 req.body 拿出表單裡的 name 資料
  return Todo.create({ name }) //存入資料庫
    .then(() => res.redirect("/")) // 新增完成後導回首頁
    .catch((e) => console.log(e));
});
//get detail 頁面
app.get("/todos/:id", (req, res) => {
  const id = req.params.id;
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render("detail", { todo }))
    .catch((e) => console.log(e));
});
//get edit 頁面
app.get("/todos/:id/edit", (req, res) => {
  const id = req.params.id;
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render("edit", { todo }))
    .catch((e) => console.log(e));
});
//post edit更改功能
app.post("/todos/:id/edit", (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  return Todo.findById(id)
    .then((todo) => {
      todo.name = name;
      return todo.save();
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch((e) => console.log(e));
});

//監聽localhost:3000
app.listen("3000", () => {
  console.log("this is listening on localhost:3000");
});
