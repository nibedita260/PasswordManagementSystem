const mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");
//var dbUrl = process.env.DB_MONGO_DB_URL;
// mongoose.connect(dbUrl, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
// });
var dbUrl = "mongodb://localhost:27017/pms";
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
var conn = mongoose.Collection;
var passSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  password_category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "password_categories",
    required: true,
  },
  project_name: { type: String, required: true },
  password_detail: { type: String, required: true },
  date: {
    type: Date,
    default: Date.now,
  },
});
passSchema.plugin(mongoosePaginate);
var passModel = mongoose.model("password_details", passSchema);
module.exports = passModel;
