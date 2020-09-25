const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/pms", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
var conn = mongoose.Collection;
var productSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  product_name: {
    type: String,
    required: true,
  },
  product_quantity: { type: String, required: true },
  product_price: { type: String, required: true },
  image: { type: String, required: true },
  date: {
    type: Date,
    default: Date.now,
  },
});

var productModel = mongoose.model("product_uploads", productSchema);
module.exports = productModel;
