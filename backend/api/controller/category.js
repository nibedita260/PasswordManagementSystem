var password_categoryModel = require("../../modules/password_category");
// var getPasswordCategoryName = password_categoryModel.find(
//   {},
//   { passord_category: 1, _id: 1 }
// );
const mongoose = require("mongoose");

exports.getCategory = function (req, res, next) {
  var id = req.params.userid;
  var getPasswordCategoryName = password_categoryModel.find(
    { user_id: id },
    { passord_category: 1, _id: 1 }
  );
  getPasswordCategoryName
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
};

exports.addCategory = function (req, res, next) {
  var passwordCategory = req.body.passwordCategory;
  var user_id = req.body.user_id;
  var passCatDetails = new password_categoryModel({
    passord_category: passwordCategory,
    user_id: user_id,
  });

  passCatDetails
    .save()
    .then((doc) => {
      res.status(201).json({
        message: "success",
        results: doc,
      });
    })
    .catch((err) => {
      res.json(err);
    });
};
exports.addUpdateCategory = function (req, res, next) {
  var id = req.params.id;
  var passwordCategory = req.body.passwordCategory;
  password_categoryModel.findById(id, function (err, data) {
    data.passord_category = passwordCategory
      ? passwordCategory
      : data.passord_category;
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
};
exports.updateCategory = function (req, res, next) {
  var id = req.body._id;
  var passwordCategory = req.body.passwordCategory;
  password_categoryModel.findById(id, function (err, data) {
    data.passord_category = passwordCategory
      ? passwordCategory
      : data.passord_category;
    data.save(function (err) {
      if (err) throw err;
      res.json(data.passord_category);
    });
  });
};
exports.deleteCategory = function (req, res, next) {
  var cat_id = req.body.cat_id;
  password_categoryModel
    .findByIdAndRemove(cat_id)
    .then((doc) => {
      res.status(201).json({
        message: "successfully deleted",
        results: doc,
      });
    })
    .catch((err) => {
      res.json(err);
    });
};
