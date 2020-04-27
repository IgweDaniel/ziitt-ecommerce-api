const { stripe_secret } = require("./config");

module.exports = require("stripe")(stripe_secret);
