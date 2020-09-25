var productModel = require("../../modules/product");
const mongoose = require("mongoose");
exports.getAllProducts = (req, res, next) => {
  productModel
    .find()
    .select("product_name product_quantity product_price image")
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
