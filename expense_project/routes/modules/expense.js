const express = require("express");
const router = express.Router();
const Expense = require("../../models/expense");
const Category = require("../../models/category");
const category = require("../../models/category");

//! 新增功能
router.get("/new", (req, res) => {
  Category.find()
    .lean()
    .then((category) => res.render("new", { category }));
});

router.post("/new", (req, res) => {
  const userId = req.user._id;
  const record = req.body;
  const { categoryId } = req.body;

  Category.findOne({ _id: categoryId })
    .then((category) => {
      if (category) {
        record.categoryId = category._id; // 設置 record 的 categoryId
        record.userId = userId; // 設置 record 的 userId
        console.log("router post record is:", record);
        return Expense.create(record) // 直接使用 record 創建 Expense
          .then(() => res.redirect("/"))
          .catch((error) => console.log(error));
      }
    })
    .catch((err) => console.log(err));
});

//! 編輯功能
router.get("/:id/edit", (req, res) => {
  const _id = req.params.id;
  return Expense.findOne({ _id })
    .lean()
    .then((expenses) => res.render("edit", { expenses }));
});
router.put("/:id", (req, res) => {
  const _id = req.params.id;
  const userId = req.user._id;
  const reqUpdateObj = { userId, ...req.body };
  Expense.findByIdAndUpdate(_id, reqUpdateObj)
    .then((data) => {
      console.log("data is =", data);
      res.redirect("/"); //`/expense/${data._id}`
    })
    .catch((err) => console.log(err));
});
//! 刪除功能
router.delete("/:id", (req, res) => {
  const _id = req.params.id;
  return Expense.findOne({ _id })
    .then((expense) => {
      expense.remove();
    })
    .then(() => {
      res.redirect("/");
    })
    .catch((error) => console.log(error));
});

//*底部
module.exports = router;
