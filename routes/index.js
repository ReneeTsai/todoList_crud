const express = require("express");
const router = express.Router();
const home = require("./module/home");
const todos = require("./module/todos");
const users = require("./module/users");

router.use("/", home);
router.use("/todos", todos);
router.use("/users", users);
module.exports = router;
