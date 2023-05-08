const express = require("express");
const exphbs = require("express-handlebars");
const routes = require("./routes");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const session = require("express-session");
const port = process.env.PORT || 3000;
const usePassport = require("./config/passport");
const flash = require("connect-flash");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
require("./config/mongoose");

//====app.setting====
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
// 增加取得圖示的helper
app.engine(
  "handlebars",
  exphbs.engine({
    defaultLayout: "main",
    helpers: {
      getImage: function (category, category_image) {
        return category_image[category];
      },
    },
  })
);
app.set("view engine", "handlebars");
app.use(methodOverride("_method"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
usePassport(app);
app.use(flash());
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.user = req.user;
  res.locals.success_msg = req.flash("success_msg"); // 設定 success_msg 訊息
  res.locals.warning_msg = req.flash("warning_msg"); // 設定 warning_msg 訊息
  next();
});
//*app.setting底部
app.use(routes);

app.listen(port, () => {
  console.log(`Express app listening on port ${port}.`);
});
