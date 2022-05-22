const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const personalInfoRouter = require("./router/personalInfoRouter");
const mongoose = require("mongoose");
const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/common/errorHandler");
const cookieParser = require("cookie-parser");
const authRouter = require("./router/authRouter");
dotenv.config();
const port = 3000;
//database connection
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING)
  .then(() => console.log("database connection successful"))
  .catch((err) => console.log(err.message));
//parse json
app.use(bodyParser.json());
// request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//using cookie parser
app.use(cookieParser(process.env.COOKIE_SECRET));

// //api calling

app.use("/authentication", authRouter);
app.use("/personalinfo", personalInfoRouter);
// 404 not found handler
app.use(notFoundHandler);

// common error handler
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
