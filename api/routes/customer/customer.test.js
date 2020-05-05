const request = require("supertest");
const { app } = require("../../index");
const db = require("../../config/db");
const Customer = require("./customer.model");
const { test_db_uri } = require("../../config/config");

describe("Customer Endpoints", () => {
  beforeAll(async () => {
    return db.open(test_db_uri);
  });

  beforeEach(async () => {
    const customer = new Customer({
      name: "testuser",
      email: "testuser@test.com",
      password: "testytest",
    });
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
    expect(res.body).toHaveProperty("token");
  });

  it("should not create an existing customer", async () => {
    const res = await request(app).post("/api/customers").send({
      name: "testuser",
      email: "testuser@test.com",
      password: "testytest",
    });
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

  it("should  authenticate a customer", async () => {
    const name = "testuser";
    const res = await request(app).post("/api/customers/auth").send({
      name,
      email: "testuser@test.com",
      password: "testytest",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body.name).toEqual(name);
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
      email: "johnDoe@test.com",
      password: "awrongpassword",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error");
  });

  afterEach(async () => {
    return db.reset("Customers");
  });
  afterAll(async () => {
    return db.close();
  });
});
