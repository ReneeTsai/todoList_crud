const express = require("express");
const router = express.Router();
const home = require("./module/home");
const todos = require("./module/todos");

router.use("/", home);
router.use("/todos", todos);
module.exports = router;
