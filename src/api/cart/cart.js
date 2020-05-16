const { product_schema } = require("../../utils/validator");

const addToCart = async ({ body, cart }, res) => {
  const { value, error } = product_schema.validate(body);
  if (error) return res.status(200).json({ error: error, data: null });

  cart.addItem(value);
  await cart.save();
  return res.status(200).json({ error: null, data: { cartMap: cart.map } });
};

const reduceItem = async ({ body, cart }, res) => {
  const { value, error } = product_schema.validate(body);
  if (error) return res.status(200).json({ error: error, data: null });
  cart.reduce(value);
  await cart.save();
  return res.status(200).json({ error: null, data: { cartMap: cart.map } });
};

const removeItem = async ({ body, cart }, res) => {
  const { value, error } = product_schema.validate(body);
  if (error) return res.status(200).json({ error: error, data: null });
  cart.deleteItem(value);
  const newCart = await cart.save();
  return res.status(200).json({ error: null, data: { cart: newCart } });
};

const getCart = async ({ cart }, res) => {
  return res.status(200).json({ error: null, data: { cart } });
};
module.exports = {
  addToCart,
  reduceItem,
  getCart,
  removeItem,
};
