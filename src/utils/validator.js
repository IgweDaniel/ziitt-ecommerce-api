const Joi = require("@hapi/joi");

const product_schema = Joi.object({
  productId: Joi.string().required(),
  name: Joi.string(),
  qty: Joi.number(),
  price: Joi.number(),
  size: Joi.string().required(),
  img: Joi.string(),
});

const customer_schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
});
module.exports = {
  product_schema,
  customer_schema,
};
