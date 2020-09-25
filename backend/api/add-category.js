var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
var password_categoryModel = require("../modules/password_category");
var add_passwordModel = require("../modules/add_password");
var checkAuth = require("./middleware/auth");
var getPasswordCategoryName = password_categoryModel.find(
  {},
  { passord_category: 1, _id: 1 }
);
var getAllPass = add_passwordModel.find({});
var categoryController = require("./controller/category");

router.get("/", function (req, res, next) {
  res.send("hello friend");
});

router.get("/getCategory/:userid", categoryController.getCategory);
// function (req, res, next) {
//   // getPasswordCategoryName.exec(function (err, data) {
//   //   if (err) throw err;
//   //   //res.send("node js get tutorial\n" + data);
//   //   res.status(200).json({
//   //     message: "success",
//   //     results: data,
//   //   });
//   // });
//   getPasswordCategoryName
//     .exec()
//     .then((data) => {
//       res.status(200).json({
//         message: "success",
//         results: data,
//       });
//     })
//     .catch((err) => {
//       res.json(err);
//     });
// });

router.post("/add-category", categoryController.addCategory);

router.put("/add-update-category/:id", categoryController.addUpdateCategory);

//patch
router.patch("/update-category/", categoryController.updateCategory);
//delete
router.delete("/delete-category/", categoryController.deleteCategory);

//get all pass details
router.get("/getAllPasswords", function (req, res, next) {
  getAllPass
    .exec()
    .then((data) => {
      res.status(200).json({
        message: "success",
        results: data,
      });
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/add-new-pass", function (req, res, next) {
  var pass_cat = req.body.pass_cat;
  var project_name = req.body.project_name;
  var pass_details = req.body.pass_details;
  var password_details = new add_passwordModel({
    password_category: pass_cat,
    project_name: project_name,
    password_detail: pass_details,
  });
  password_details
    .save()
    .then((doc) => {
      res.status(201).json({
        message: "Inserted successfully",
        results: doc,
      });
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put("/add-update-newpassword/:id", function (req, res, next) {
  var id = req.params.id;
  var passcat = req.body.pass_cat;
  var project_name = req.body.project_name;
  var pass_details = req.body.pass_details;

  add_passwordModel.findById(id, function (err, data) {
    data.password_category = passcat ? passcat : data.password_category;
    data.project_name = project_name ? project_name : data.project_name;
    data.password_detail = pass_details ? pass_details : data.password_detail;
    data
      .save()
      .then((doc) => {
        res.status(201).json({
          message: "category updated successfully",
          results: data,
        });
      })
      .catch((err) => {
        res.json(err);
      });
  });
});

//delete
router.delete("/delete-newpassword/:id", function (req, res, next) {
  var newpass_id = req.params.id;

  add_passwordModel
    .findByIdAndRemove(newpass_id)
    .then((doc) => {
      res.status(201).json({
        message: "successfully deleted",
        results: doc,
      });
    })
    .catch((err) => {
      res.json(err);
    });
});

//populate
router.get("/getPasswords", function (req, res, next) {
  add_passwordModel
    .find()
    .select("password_category project_name password_detail")
    .populate("password_category", "passord_category")
    .exec()
    .then((data) => {
      res.status(200).json({
        message: "success",
        results: data,
      });
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/add-new-password", function (req, res, next) {
  var pass_cat = req.body.pass_cat;
  var project_name = req.body.project_name;
  var pass_details = req.body.pass_details;
  var password_details = new add_passwordModel({
    _id: mongoose.Types.ObjectId(),
    password_category: pass_cat,
    project_name: project_name,
    password_detail: pass_details,
  });
  password_details
    .save()
    .then((doc) => {
      res.status(201).json({
        message: "Inserted successfully",
        results: doc,
      });
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/getPasswordsById/:id", function (req, res, next) {
  var id = req.params.id;
  add_passwordModel
    .findById(id)
    .select("password_category project_name password_detail")
    .populate("password_category", "passord_category")
    .exec()
    .then((data) => {
      res.status(200).json({
        message: "success",
        results: data,
      });
    })
    .catch((err) => {
      res.json(err);
    });
});
module.exports = router;
