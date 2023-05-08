const express = require("express");
const router = express.Router();
const Expense = require("../../models/expense");
const Category = require("../../models/category");

router.get("/", (req, res) => {
  const userId = req.user._id;
  Expense.find({ userId })
    .lean()
    .then((expenses) => {
      res.render("index", { expenses, Category });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
