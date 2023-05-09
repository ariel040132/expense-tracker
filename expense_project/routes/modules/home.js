const express = require("express");
const router = express.Router();
const Expense = require("../../models/expense");
const Category = require("../../models/category");

router.get("/", (req, res) => {
  const userId = req.user._id;

  Expense.find({ userId })

    .lean()
    .sort({ _id: "asc" })
    .then((expenses) => {
      Category.find()
        .lean()
        .then((category) => {
          res.render("index", { expenses, category });
        });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
