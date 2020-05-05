const Cart = require("../routes/cart/cart.model");
module.exports = async (req, res, next) => {
  const id = req.headers["x-cart-id"];
  const customer = req.customer;

  let cart = null;
  if (customer) {
    cart = await Cart.findOne({ customer: customer._id });
    if (!cart) cart = new Cart({ customer: customer._id });
    req.cart = cart;
  } else {
    cart = await Cart.findOne({ _id: id });
    if (!cart) cart = new Cart({});
    req.cart = cart;
  }
  res.set("x-cart-id", cart._id);

  return next();
};
