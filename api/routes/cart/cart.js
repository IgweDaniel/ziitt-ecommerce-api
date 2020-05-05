const addToCart = async ({ body, cart }, res) => {
  const data = body;
  cart.addItem(data);
  await cart.save();
  return res.status(200).json({ data: "success" });
};

const reduceItem = async ({ body, cart }, res) => {
  const data = body;
  cart.reduce(data);
  await cart.save();
  return res.status(200).json({ data: { msg: "success" } });
};

const removeItem = async ({ body, cart }, res) => {
  const data = body;
  cart.deleteItem(data);
  await cart.save();
  return res.status(200).json({ data: { msg: "success" } });
};
const getCart = async ({ cart }, res) => {
  return res.status(200).json({ data: { cart } });
};
module.exports = {
  addToCart,
  reduceItem,
  getCart,
  removeItem,
};
