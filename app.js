var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();
const cors = require("cors");
var indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const cityRouter = require("./routes/city");
const addresRouter = require("./routes/address");
const adminRouter = require("./routes/admin");
const workersRouter = require("./routes/workers");
const categoryRouter = require("./routes/category");
const orderRouter = require("./routes/order");
const aboutUsRouter = require("./routes/aboutUs");
const contactUsRouter = require("./routes/contactUs");
const headerInfoRouter = require("./routes/headerInfo");
const infoRouter = require("./routes/info");

var app = express();
app.use(cors());
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/city", cityRouter);
app.use("/api/v1/addres", addresRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/workers", workersRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/about", aboutUsRouter);
app.use("/api/v1/header", headerInfoRouter);
app.use("/api/v1/info", infoRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;