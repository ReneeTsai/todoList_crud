const express = require("express");
const router = express.Router();
const Todo = require("../../models/todo");
//app --> router
router.get("/new", (req, res) => {
  return res.render("new");
});
//確認使用者「只會看到自己的 todo 資料」
router.get("/", (req, res) => {
  const userId = req.user._id; // 變數設定
  Todo.find({ userId }) // 加入查詢條件
    .lean()
    .sort({ _id: "asc" })
    .then((todos) => res.render("index", { todos }))
    .catch((error) => console.error(error));
});
//post取得/todos/new新增的資料，透過bodyParse解資資料後存取至name
router.post("/", (req, res) => {
  const name = req.body.name; // 從 req.body 拿出表單裡的 name 資料
  const userId = req.user._id;
  return Todo.create({ name, userId }) //存入資料庫
    .then(() => res.redirect("/")) // 新增完成後導回首頁
    .catch((e) => console.log(e));
});
//get detail 頁面
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const userId = req.user._id;
  return Todo.findOne({ id, userId })
    .lean()
    .then((todo) => res.render("detail", { todo }))
    .catch((e) => console.log(e));
});
//get edit 頁面
router.get("/:id/edit", (req, res) => {
  const _id = req.params.id;
  const userId = req.user._id;
  return Todo.findOne({ _id, userId })
    .lean()
    .then((todo) => res.render("edit", { todo }))
    .catch((e) => console.log(e));
});
//post edit更改功能
router.put("/:id", (req, res) => {
  const _id = req.params.id;
  const userId = req.user._id;
  const { name, isDone } = req.body;
  return Todo.findOne({ _id, userId })
    .then((todo) => {
      todo.name = name;
      todo.isDone = isDone === "on";
      return todo.save();
    })
    .then(() => res.redirect(`/todos/${_id}`))
    .catch((e) => console.log(e));
});
//post delete功能
router.delete("/:id", (req, res) => {
  const _id = req.params.id;
  const userId = req.user._id;
  return Todo.findOne({ _id, userId })
    .then((todo) => todo.remove())
    .then(() => res.redirect("/"))
    .catch((e) => console.log(e));
});

module.exports = router;
