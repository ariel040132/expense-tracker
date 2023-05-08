const express = require("express");
const router = express.Router();
const Expense = require("../../models/expense");

//! 新增功能
router.get("/new", (req, res) => {
  res.render("new");
});

router.post("/new", (req, res) => {
  //const userId = req.user._id; 等等create加入userId

  return Expense.create({ ...req.body })
    .then(() => res.redirect("/"))
    .catch(() => console.log(error));
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
  //const userId = req.user._id;
  const reqUpdateObj = { ...req.body };
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
