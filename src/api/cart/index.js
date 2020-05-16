const { Router } = require("express");
const Cart = require("./cart.model");
const { addToCart, reduceItem, getCart, removeItem } = require("./cart");
const router = Router();
const { isValidObjectId } = require("mongoose");

router.use(async function (req, res, next) {
  const id = req.headers["x-cart-id"];
  const customer = req.customer;
  let current_cart = null;

  if (customer) {
    current_cart = await Cart.findOne({ customer: customer._id });
    if (!current_cart) current_cart = new Cart({ customer: customer._id });
  } else if (!isValidObjectId(id)) {
    current_cart = new Cart({});
  } else {
    current_cart = await Cart.findOne({ _id: id });
    if (!current_cart) current_cart = new Cart({});
  }
  req.cart = current_cart;
  res.set("x-cart-id", current_cart._id);

  return next();
});
router.post("/", addToCart);
router.get("/", getCart);
router.put("/", reduceItem);
router.delete("/", removeItem);

module.exports = router;
