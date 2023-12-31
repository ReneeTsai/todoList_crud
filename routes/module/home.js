const express = require("express");
const router = express.Router();
const Todo = require("../../models/todo");

router.get("/", (req, res) => {
  //連動登入者的id
  const userId = req.user._id;
  // 取出 Todo model 裡的所有資料
  Todo.find({ userId })
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .sort({ _id: "asc" }) //asc代表升冪ascending排序，desc代表降冪descending排序
    .then((todos) => res.render("index", { todos: todos })) // 將資料傳給 index 樣板
    .catch((e) => console.log(e));
});

module.exports = router;
