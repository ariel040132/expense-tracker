return Expense.create({
  name,
  date,
  categoryId: categoryData._id,
  amount,
  userId,
})
  .then(() => res.redirect("/"))
  .catch((error) => console.log(error));
