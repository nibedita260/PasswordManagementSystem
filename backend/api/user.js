var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
var multer = require("multer");
var userModel = require("../modules/user");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var checkAuth = require("./middleware/auth");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});
// image path
// limit: 5mb
// filter : png, jpeg,jpg

router.post("/login", function (req, res, next) {
  var username = req.body.username;
  userModel
    .find({ username: username })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        res.status(404).json({
          message: "Auth Failed",
        });
      } else {
        bcrypt.compare(req.body.password, user[0].password, function (
          err,
          result
        ) {
          if (err) {
            res.json({
              message: "Auth Failed",
            });
          }
          if (result) {
            var token = jwt.sign(
              {
                username: user[0].username,
                userid: user[0]._id,
              },
              "secret",
              {
                expiresIn: "1h",
              }
            );
            res.status(200).json({
              message: "User Found",
              token: token,
            });
          } else {
            res.json({
              message: "Auth Failed",
            });
          }
        });
      }
    })
    .catch((err) => {
      res.json({
        error: err,
      });
    });
});

router.post("/signup", function (req, res, next) {
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  var confirmPassword = req.body.confirmpassword;

  if (password !== confirmPassword) {
    res.json({
      message: "Password Not Matched!",
    });
  } else {
    bcrypt.hash(password, 10, function (err, hash) {
      if (err) {
        return res.json({
          message: "Something Wrong, Try Later!",
          error: err,
        });
      } else {
        // console.log(hash);
        var userDetails = new userModel({
          _id: mongoose.Types.ObjectId(),
          username: username,
          email: email,
          password: hash,
        });

        userDetails
          .save()
          .then((doc) => {
            res.status(201).json({
              message: "User Registered Successfully",
              results: doc,
            });
          })
          .catch((err) => {
            res.json(err);
          });
      }
    });
  }
});

router.get("/getUserDetails/:userid", function (req, res, next) {
  var id = req.params.userid;
  var getUserDetails = userModel.find(
    { _id: id },
    { email: 1, profileImage: 1 }
  );
  getUserDetails
    .exec()
    .then((data) => {
      res.status(200).json({
        message: "OK",
        results: data,
      });
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/updateProfile/", upload.single("profileImage"), function (
  req,
  res,
  next
) {
  var id = req.body.user_id;
  var profilePic = req.file.path;
  userModel.findById(id, function (err, data) {
    data.profileImage = profilePic ? profilePic : profileImage;
    data
      .save()
      .then((doc) => {
        res.status(201).json({
          results: doc,
          message: "Profile image uploaded successfully",
        });
      })
      .catch((err) => {
        res.json(err);
      });
  });
});

router.get("/sendmail", function (req, res, next) {
  "use strict";
  const nodemailer = require("nodemailer");

  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "test.nibscode@gmail.com", // generated ethereal user
        pass: "Nibscode@123", // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Nibs Programming 👻" <test.nibscode@gmail.com>', // sender address
      to: "deepi.nibedita260@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      html: "<b>Hello world?</b>", // html body
    });
    if (info.messageId) {
      res.send("email sent");
    } else {
      res.send("email  not sent");
    }
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }

  main().catch(console.error);
});

module.exports = router;
