//使用mongoose的Schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Schema建構子：自定義每筆資料有哪些欄位和欄位的屬性
const expenseSchema = new Schema({
  name: {
    type: String, // 資料型別是字串
    required: true, // 這是個必填欄位
  },
  date: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    index: true,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    index: true,
    required: true,
  },
});

module.exports = mongoose.model("expense", expenseSchema);
