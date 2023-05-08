const db = require("../../config/mongoose");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const Expense = require("../expense");
const expenseJson = require("./expense.json");

// const SEED_USER = []
db.once("open", () => {
  Expense.create(expenseJson)
    .then(() => {
      console.log("ExpenseSeeder done!");
      db.close();
    })
    .catch((error) => console.log(error));
});
