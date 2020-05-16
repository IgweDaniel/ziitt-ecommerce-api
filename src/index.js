const express = require("express");
const cors = require("cors");
const port = 4000;
const app = express();
const jwt = require("jsonwebtoken");
const { privateKey, mongo_offline_uri, mongo_uri } = require("./config/config");
const Customer = require("./api/customer/customer.model");
const db = require("./config/db");

const corsOptions = {
  exposedHeaders: [
    "Content-Type",
    "Authorization",
    "x-cart-id",
    "x-auth-token",
  ],
  preflightContinue: true,
};
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(getCustomer);

app.use("/api/customers", require("./api/customer"));
app.use("/api/cart", require("./api/cart"));

async function getCustomer(req, res, next) {
  const token = req.headers["x-auth-token"];
  let customer = null;
  try {
    const decoded = await jwt.verify(token, privateKey);
    if (decoded) customer = await Customer.findOne({ _id: decoded.id });
  } catch (error) {}

  if (customer) req.customer = customer;
  return next();
}

module.exports = {
  app,
  init: async () => {
    db.open(mongo_offline_uri);
    app.listen(port, () =>
      console.log(`Server App listening at http://localhost:${port}`)
    );
  },
};
