var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();
const cors = require("cors");
const TelegramApi = require("node-telegram-bot-api");
const botToken = "6076741057:AAErmnrOixs2-OS5Oiu-tEsv1-l_e1rjGmo";
var indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const cityRouter = require("./routes/city");
const addresRouter = require("./routes/address");
const adminRouter = require("./routes/admin");
const workersRouter = require("./routes/workers");
const categoryRouter = require("./routes/category");
const subCategoryRouter = require("./routes/subCategory");
const orderRouter = require("./routes/order");
const aboutUsRouter = require("./routes/aboutUs");
const contactUsRouter = require("./routes/contactUs");
const imagesRouter = require("./routes/images");
const headerInfoRouter = require("./routes/headerInfo");
const infoRouter = require("./routes/info");
const advantagesRouter = require("./routes/advantages");

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
app.use("/api/v1/subCategory", subCategoryRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/about", aboutUsRouter);
app.use("/api/v1/header", headerInfoRouter);
app.use("/api/v1/info", infoRouter);
app.use("/api/v1/contactUs", contactUsRouter);
app.use("/api/v1/images", imagesRouter);
app.use("/api/v1/advantages", advantagesRouter);

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

const bot = new TelegramApi(process.env.BOT_TOKEN, { polling: true });

bot.on("message", async (msg) => {
  bot.setMyCommands([
    { command: "/start", description: "Welcome" },
    { command: "/info", description: "Bot Info" },
    { command: "/game", description: "Play whit me" },
  ]);
  const text = msg.text;
  const chatId = msg.chat.id;
  console.log(chatId, "bnmk,kmjnhgb");
  if (text === "/start") {
    return bot.sendMessage(
      process.env.CHAT_ID,
      `Welcome ${msg.chat.first_name}`
    );
  }
});

const io = require("socket.io")(process.env.SOCKET_PORT, {
  cors: {
    origin: [
      process.env.FRONT_URL,
      process.env.FRONT_URL_FRONT,
      "http://localhost:3002",
      "http://localhost:3003",
      "http://localhost:3004",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  //connect
  console.log("user is conected!");

  //activity invite
  socket.on("sendActivityInvite", (data) => {
    io.emit("getActivityInvite", data);
    return bot.sendMessage(
      process.env.CHAT_ID,
      `Նոր Պատվեր ! ${data.date.slice(0, 10)}, ժամը ${data.date.slice(
        11,
        16
      )},  ${data.prePay ? "կանխիկ" : "առցանց"} վճարում`
    );
  });

  //disconnect
  socket.on("disconnect", () => {
    console.log("a user is disconnected!");
  });
});

module.exports = app;
