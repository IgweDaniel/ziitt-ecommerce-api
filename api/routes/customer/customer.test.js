const request = require("supertest");
const { app } = require("../../index");
const db = require("../../config/db");
const Customer = require("./customer.model");
const { test_db_uri } = require("../../config/config");

beforeAll(async (done) => {
  db.open(test_db_uri);
  const customer = new Customer({
    name: "testuser",
    email: "testuser@test.com",
    password: "testytest",
  });
  await customer.save();
  done();
});

describe("Customer Endpoints", () => {
  it("should return hello world", async (done) => {
    const res = await request(app).get("/api/customers");
    const customers = await Customer.find({});
    expect(customers.length).toEqual(1);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("data");
    done();
  });

  it("should  create a new customer", async (done) => {
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
    done();
  });

  it("should not create an existing customer", async (done) => {
    const res = await request(app).post("/api/customers").send({
      name: "johnDoe",
      email: "johnDoe@test.com",
      password: "testytest",
    });
    expect(res.statusCode).toEqual(409);
    expect(res.body).toHaveProperty("error");
    done();
  });

  it("should not create a new customer with invalid details", async (done) => {
    const res = await request(app).post("/api/customers").send({
      name: "johnDoe@test.com",
      email: "johnDoe@test.com",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error");
    done();
  });

  it("should  authenticate a customer", async (done) => {
    const name = "johnDoe";
    const res = await request(app).post("/api/customers/auth").send({
      email: "johnDoe@test.com",
      password: "testytest",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body.name).toEqual(name);
    done();
  });

  it("should  not authenticate a nonexistent customer", async (done) => {
    const res = await request(app).post("/api/customers/auth").send({
      email: "nonexistent",
      password: "testytest",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error");
    done();
  });

  it("should  not authenticate a  customer with invalid  password", async (done) => {
    const res = await request(app).post("/api/customers/auth").send({
      email: "johnDoe@test.com",
      password: "awrongpassword",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error");
    done();
  });
});

afterAll(async (done) => {
  await Customer.deleteMany({});
  await db.close();
  done();
});
