const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { notFoundHandler } = require("./middlewares/common/errorHandler");

const app = express();
dotenv.config();

//database connection
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING)
  .then(() => console.log("database connection successful"))
  .catch((err) => console.log(err.message));

//request parser
app.use(express.json);
app.use(express.urlencoded({ extended: true }));

//parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));
//not found handler
app.use(notFoundHandler);
//error handling

app.listen(process.env.PORT, () => {
  console.log(`app listening to port ${process.env.PORT}`);
});
