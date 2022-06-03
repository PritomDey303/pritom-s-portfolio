const express = require("express");
const app = express();
const dotenv = require("dotenv");
const personalInfoRouter = require("./router/personalInfoRouter");
const experienceRouter = require("./router/experienceRouter");
const projectRouter = require("./router/projectRouter");
const skillRouter = require("./router/skillRouter");
const educationRouter = require("./router/educationRouter");
const profilePictureRouter = require("./router/profilePictureRouter");
const mongoose = require("mongoose");
const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/common/errorHandler");
const cookieParser = require("cookie-parser");
const authRouter = require("./router/authRouter");

//dotenv file config
dotenv.config();
const port = process.env.PORT;
//database connection
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING)
  .then(() => console.log("database connection successful"))
  .catch((err) => console.log(err.message + "a"));

// request parsers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//using cookie parser
app.use(cookieParser(process.env.COOKIE_SECRET));

// //api calling

app.use("/authentication", authRouter);
app.use("/personalinfo", personalInfoRouter);
app.use("/experience", experienceRouter);
app.use("/project", projectRouter);
app.use("/skill", skillRouter);
app.use("/education", educationRouter);
app.use("/profilepicture", profilePictureRouter);
// 404 not found handler
app.use(notFoundHandler);

// common error handler
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
