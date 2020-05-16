const request = require("supertest");
const { app } = require("../../index");
const db = require("../../config/db");
const Customer = require("./customer.model");
const { test_db_uri } = require("../../config/config");

const test_user = {
  name: "testuser",
  email: "testuser@gmail.com",
  password: "testyABest12",
};

describe("Customer Endpoints", () => {
  beforeAll(async () => {
    return db.open(test_db_uri);
  });

  beforeEach(async () => {
    const customer = new Customer(test_user);
    return customer.save();
  });

  it("should  create a new customer", async () => {
    const name = "johnDoe";
    const res = await request(app).post("/api/customers").send({
      name,
      email: "johnDoe@test.com",
      password: "testytest",
    });
    const customer = await Customer.findOne({ name });
    expect(customer.name).toEqual(name);
    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toHaveProperty("token");
  });

  it("should not create an existing customer", async () => {
    const res = await request(app).post("/api/customers").send(test_user);
    expect(res.statusCode).toEqual(409);
    expect(res.body).toHaveProperty("error");
  });

  it("should not create a new customer with invalid details", async () => {
    const res = await request(app).post("/api/customers").send({
      name: "johnDoe@test.com",
      email: "johnDoe@test.com",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error");
  });

  it("should  authenticate an existing customer", async () => {
    const res = await request(app).post("/api/customers/auth").send(test_user);
    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toHaveProperty("token");
    expect(res.body.data.name).toEqual(test_user.name);
  });

  it("should  not authenticate a nonexistent customer", async () => {
    const res = await request(app).post("/api/customers/auth").send({
      email: "nonexistent",
      password: "testytest",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error");
  });

  it("should  not authenticate a  customer with invalid  password", async () => {
    const res = await request(app).post("/api/customers/auth").send({
      email: test_user.email,
      password: "awrongpassword",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error");
  });

  it("should  return customer details", async () => {
    const { body } = await request(app)
      .post("/api/customers/auth")
      .send(test_user);
    const {
      data: { token },
    } = body;
    const res = await request(app)
      .get(`/api/customers/detail`)
      .set("x-auth-token", token);
    expect(res.statusCode).toEqual(200);

    expect(res.body.data).toHaveProperty("customer");
    expect(res.body.data).not.toBeNull();
    expect(res.body.data.customer.email).toEqual(test_user.email);
  });

  afterEach(async () => {
    return db.reset("Customers");
  });
  afterAll(async () => {
    return db.close();
  });
});
