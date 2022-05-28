const bcrypt = require("bcrypt");
const Authentication = require("../models/authentication");
const jwt = require("jsonwebtoken");
async function insertAuthInfo(req, res, next) {
  try {
    const data = await Authentication.find({
      email: req.body.email,
    }).exec();
    if (data.length === 0) {
      bcrypt.hash(req.body.password, 10, function (err, hash) {
        if (err) {
          res.json({
            status: 500,
            message: err.message,
          });
        } else {
          const auth = new Authentication({
            email: req.body.email,
            password: hash,
          });

          auth.save((err, doc) => {
            if (err) {
              res.json({
                status: 500,
                message: err.message,
              });
            } else {
              res.json({
                status: 200,
                message: "Data inserted successfully.",
              });
            }
          });
        }
      });
    } else {
      res.json({
        status: 500,
        message: "User already exists!",
      });
    }
  } catch (err) {
    res.json({
      status: 500,
      message: err.message,
    });
  }
}

//login function
async function login(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const data = await Authentication.find({
      email: email,
    }).exec();

    if (data.length !== 0) {
      const match = await bcrypt.compare(password, data[0].password);
      if (match) {
        const userObj = {
          _id: data[0]._id.valueOf(),
          email: email,
        };
        //generate token
        const token = jwt.sign(userObj, process.env.JWT_SECRET, {
          expiresIn: "24h",
        });

        //set cookie
        res.cookie(process.env.COOKIE_NAME, token, {
          maxAge: 24 * 60 * 60 * 1000,
          httpOnly: true,
          signed: true,
        });
        //
        res.status(200).json(userObj);
      } else {
        res.json({
          status: 500,
          message: "Invalid email or password!",
        });
      }
    } else {
      res.json({
        status: 500,
        message: "Invalid email or password!",
      });
    }
  } catch (err) {
    res.json({
      status: 500,
      message: err.message,
    });
  }
}

//check login

async function checkLogin(req, res, next) {
  let cookies =
    Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;
  if (cookies) {
    try {
      token = cookies[process.env.COOKIE_NAME];
      jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
        if (err) {
          res.json({ status: 500, message: "Invalid User!" });
        } else {
          req.user = data;
        }
      });

      next();
    } catch (err) {
      console.log(err.message);
      res.json({ status: 500, message: err.message });
    }
  } else {
    res.json({ status: 500, message: "Invalid User!" });
  }
}

//////////////////////////
///////////////////
//logout controller
function logout(req, res) {
  res.clearCookie(process.env.COOKIE_NAME);
  res.status(200).json({
    status: 200,
    message: "Logout successful!",
  });
}

module.exports = { insertAuthInfo, login, logout, checkLogin };
