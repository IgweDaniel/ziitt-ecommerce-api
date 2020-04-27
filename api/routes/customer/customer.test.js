const request = require("supertest");
const { app } = require("../../index");
const db = require("../../config/db");
const Customer = require("./customer.model");
const { test_db_uri } = require("../../config/config");
console.log(test_db_uri);

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
    console.log(customers);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("data");

    done();
  });
});

afterAll(async (done) => {
 await db.close()
 done()
});
