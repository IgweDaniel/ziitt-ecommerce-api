const jwt = require("jsonwebtoken");
const { privateKey } = require("../config/config");
const Customer = require("../routes/customer/customer.model");
module.exports = async (req, res, next) => {
  const token = req.headers["x-auth-token"];
  let customer = null;
  try {
    const decoded = await jwt.verify(token, privateKey);
    if (decoded) customer = await Customer.findOne({ _id: decoded.id });
  } catch (error) {}

  if (customer) req.customer = customer;
  return next();
};
