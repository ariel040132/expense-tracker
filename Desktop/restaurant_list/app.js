// require packages used in the project
const express = require("express");
const app = express();
const port = 3000;
const exphbs = require("express-handlebars");
const restaurantList = require("./restaurant.json");

//載入之後，要告訴 Express：麻煩幫我把樣板引擎交給 express-handlebars：
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//產生靜態檔案
app.use(express.static("public"));

// routes setting
app.get("/", (req, res) => {
  res.render("index", { restaurants: restaurantList.results });
});

//show 頁面
app.get("/restaurants/:restaurant_id", (req, res) => {
  const restaurants = restaurantList.results.find(
    (restaurant) => restaurant.id.toString() === req.params.restaurant_id
  );
  res.render("show", { restaurants: restaurants });
});

//search function
app.get("/search", (req, res) => {
  const keyword = req.query.keyword;
  const restaurants = restaurantList.results.filter((restaurant) => {
    return (
      restaurant.name.toLowerCase().includes(keyword.toLowerCase()) ||
      restaurant.category.toLowerCase().includes(keyword.toLowerCase())
    );
  });
  res.render("index", { restaurants: restaurants, keyword: keyword });
});

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`);
});
