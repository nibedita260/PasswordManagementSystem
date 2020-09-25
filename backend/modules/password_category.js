const mongoose = require("mongoose");
var dotenv = require("dotenv");
mongoose.connect("mongodb://localhost:27017/pms", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
var conn = mongoose.Collection;
var passcatSchema = new mongoose.Schema({
  //_id: mongoose.Schema.Types.ObjectId,
  passord_category: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
  },
  user_id: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

var passCateModel = mongoose.model("password_categories", passcatSchema);
module.exports = passCateModel;
