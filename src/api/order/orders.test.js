const request = require("supertest");
const { app } = require("../../index");
const db = require("../../config/db");
const Orders = require("./orders.model");
const { test_db_uri } = require("../../config/config");

let auth_token = null;
describe("Orders Endpoints", () => {
  beforeAll(async () => {
    db.open(test_db_uri);
    const res = await request(app).post("/api/customers").send({
      name: "John Doe",
      email: "johnDoe@test.com",
      password: "testytest",
    });

    auth_token = res.body.token;
  });

  it("should  create order for a customer", async () => {
    return;
  });

  afterAll(async () => {
    await db.reset("Customers");
    await db.reset("Cart");
    return db.close();
  });
});
