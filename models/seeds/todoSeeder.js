const Todo = require("../todo");
const User = require("../user");
const db = require("../../config/mongoose");
const bcrypt = require("bcryptjs"); //user password必填
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const SEED_USER = {
  name: "root",
  email: "root@root.com",
  password: "12345678",
};
db.once("open", () => {
  bcrypt
    .genSalt(10)
    .then((salt) => bcrypt.hash(SEED_USER.password, salt))
    .then((hash) =>
      User.create({
        name: SEED_USER.name,
        email: SEED_USER.email,
        password: hash,
      })
        .then((user) => {
          const userId = user._id;
          return Promise.all(
            Array.from({ length: 10 }, (_, i) => Todo.create({ name: `name-${i}`, userId }))
          );
        })
        .then(() => {
          console.log("done");
          process.exit();
        })
    );
});
//process的功能，成功就離開
//由於 seeder 程式只有在第一次初始化時才會用到，不像專案主程式一旦開始就執行運作，
//所以在 seeder 做好以後要把這個臨時的 Node.js 執行環境「關機」的概念。
