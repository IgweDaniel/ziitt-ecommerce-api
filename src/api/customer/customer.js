const jwt = require("jsonwebtoken");
const Customer = require("./customer.model");
const { privateKey } = require("../../config/config");
const { customer_schema } = require("../../utils/validator");
const getCustomer = async ({ customer }, res) => {
  if (!customer) res.status(400).json({ error: "Auth Required", data: null });
  delete customer["password"];
  return res.status(200).json({ error: null, data: { customer } });
};

const createCustomer = async (req, res) => {
  const { value, error } = customer_schema.validate(req.body, null);
  if (error)
    return res.status(400).json({ error: "Credentials Required", data: null });

  const { email, password, name = value.email } = value;

  const existingcustomer = await Customer.findOne({ email });
  if (existingcustomer)
    return res
      .status(409)
      .json({ error: "Customer already Exists", data: null });

  const customer = new Customer({ name, email, password });

  await customer.save();
  const token = await jwt.sign({ id: customer.id }, privateKey);
  return res
    .status(200)
    .json({ error: null, data: { token, name: customer.name } });
};

const authenticateCustomer = async (req, res) => {
  const { value, error } = customer_schema.validate(req.body);
  if (error)
    return res.status(400).json({ error: "Credentials Required", data: null });
  const { email, password } = value;
  const customer = await Customer.findOne({ email });

  if (!customer)
    return res.status(400).json({ error: "Invalid Credentials", data: null });

  if (!(await customer.checkPassword(password)))
    return res.status(400).json({ error: "Invalid Credentials", data: null });

  const token = await jwt.sign({ id: customer.id }, privateKey);

  return res
    .status(200)
    .json({ error: null, data: { token, name: customer.name } });
};

module.exports = {
  getCustomer,
  createCustomer,
  authenticateCustomer,
};
