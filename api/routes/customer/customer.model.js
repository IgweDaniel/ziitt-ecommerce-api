const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bycrypt = require("bcryptjs");

const CustomerSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: true,
  },
});

CustomerSchema.methods.checkPassword = function (password) {
  return bycrypt.compare(password, this.password);
};
module.exports = mongoose.model("Customers", CustomerSchema);
