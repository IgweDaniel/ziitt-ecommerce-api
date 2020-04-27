const jwt = require("jsonwebtoken");
const Customer = require("./customer.model");
const { privateKey } = require("../../config/config");

const getCustomer = async (req, res) => {
  return res.json({ data: "hello" });
};
const createCustomer = async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password || !name)
    return res.status(400).json({ error: "Credentials Required" });

  const existingcustomer = await Customer.findOne({ email });
  if (existingcustomer)
    return res.status(409).json({ error: "Customer already Exists" });

  const customer = new Customer({ name, email, password });

  await customer.save();

  const token = await jwt.sign({ id: customer.id }, privateKey);

  return res.json({ token, name: customer.name });
};

const authenticateCustomer = async (req, res) => {
  const { email, password } = req.body;

  const customer = await Customer.findOne({ email });

  if (!email || !password)
    res.status(400).json({ error: "Credentials Required" });

  if (!customer) return res.status(400).json({ error: "Invalid Credentials" });

  if (!(await customer.checkPassword(password)))
    return res.status(400).json({ error: "Invalid Credentials" });

  const token = await jwt.sign({ id: customer.id }, privateKey);

  return res.json({ token, name: customer.name });
};

module.exports = {
  getCustomer,
  createCustomer,
  authenticateCustomer,
};
