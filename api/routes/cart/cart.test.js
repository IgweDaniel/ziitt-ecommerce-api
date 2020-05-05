const request = require("supertest");
const { app } = require("../../index");
const db = require("../../config/db");
const Cart = require("./cart.model");
const { test_db_uri } = require("../../config/config");

let auth_token = null;
let products = [
  {
    productId: "111111",
    name: "can-berry juice",
    price: 120,
    qty: 4,
  },
  {
    productId: "22222",
    name: "fowls egg",
    price: 10,
    qty: 2,
  },
];

beforeAll(async (done) => {
  db.open(test_db_uri);
  const res = await request(app).post("/api/customers").send({
    name: "John Doe",
    email: "johnDoe@test.com",
    password: "testytest",
  });
  auth_token = res.body.token;

  done();
});

describe("Cart Endpoints (Authenticated Customer)", () => {
  let cartId = null;
  it("should  add items to cart for authenticated customer", async (done) => {
    for (let i in products) {
      let res;
      if (cartId) {
        res = await request(app)
          .post("/api/cart")
          .set("x-auth-token", auth_token)
          .send(products[i]);
      } else {
        res = await request(app)
          .post("/api/cart")
          .set("x-auth-token", auth_token)
          .send(products[i]);
        cartId = res.header["x-cart-id"];
      }
      expect(res.statusCode).toEqual(200);
    }

    const cart = await Cart.find({});
    const total = products.reduce((acc, product) => {
      return acc + product.qty * product.price;
    }, 0);
    expect(cart[0].subTotal).toEqual(total);
    done();
  });

  it("should  get cart items for authenticated customer", async (done) => {
    const res = await request(app)
      .get("/api/cart")
      .set("x-auth-token", auth_token);
    const cartId = res.header["x-cart-id"];
    const cart = await Cart.findOne({ _id: cartId });
    expect(res.statusCode).toEqual(200);
    expect(res.body.data.cart.subTotal).toEqual(cart.subTotal);
    expect(res.body.data.cart.size).toEqual(cart.size);
    done();
  });
  it("should  update(increment by a value) an item in cart for authenticated customer", async (done) => {
    const product = { ...products[0], qty: 5 };
    const {
      body: {
        data: { cart: currentCart },
      },
    } = await request(app).get("/api/cart").set("x-auth-token", auth_token);

    const res = await request(app)
      .post("/api/cart")
      .set("x-auth-token", auth_token)
      .send(product);
    const updatedCart = await Cart.findOne({ _id: cartId });

    const index = updatedCart.items.findIndex(
      (item) => item.productId == product.productId
    );

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("data");

    expect(updatedCart.items[index].qty).toEqual(
      currentCart.items[index].qty + product.qty
    );
    expect(updatedCart.subTotal).toEqual(
      currentCart.subTotal + product.qty * product.price
    );
    expect(updatedCart.size).toEqual(currentCart.size + product.qty);
    done();
  });

  it("should  update(decrement by a value) an item in cart for authenticated customer", async (done) => {
    const product = { ...products[1], qty: 2 };
    const {
      body: {
        data: { cart: currentCart },
      },
    } = await request(app).get("/api/cart").set("x-auth-token", auth_token);

    const res = await request(app)
      .put("/api/cart")
      .set("x-auth-token", auth_token)
      .send(product);
    const updatedCart = await Cart.findOne({ _id: cartId });
    const index = updatedCart.items.findIndex(
      (item) => item.productId == product.productId
    );

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("data");
    expect(updatedCart.items[index].qty).toEqual(
      currentCart.items[index].qty - product.qty
    );
    expect(updatedCart.subTotal).toEqual(
      currentCart.subTotal - product.qty * product.price
    );
    expect(updatedCart.size).toEqual(currentCart.size - product.qty);
    done();
  });

  it("should  delete an item from cart for authenticated customer", async (done) => {
    const product = { productId: products[0].productId };

    const {
      body: {
        data: { cart: currentCart },
      },
    } = await request(app).get("/api/cart").set("x-auth-token", auth_token);
    const cartItem = currentCart.items.find(
      (item) => item.productId == product.productId
    );

    const res = await request(app)
      .delete("/api/cart")
      .set("x-auth-token", auth_token)
      .send(product);
    const updatedCart = await Cart.findOne({ _id: cartId });
    const index = updatedCart.items.findIndex(
      (item) => item.productId == product.productId
    );

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("data");
    expect(index).toEqual(-1);
    expect(updatedCart.subTotal).toEqual(
      currentCart.subTotal - cartItem.qty * cartItem.price
    );
    expect(updatedCart.size).toEqual(currentCart.size - cartItem.qty);
    done();
  });
});

describe("Cart Endpoints (Anonymous Customer)", () => {
  let cartId = null;
  it("should  add items to cart  for anonymous customer", async (done) => {
    for (let i in products) {
      let res = null;
      if (cartId) {
        res = await request(app)
          .post("/api/cart")
          .set("x-cart-id", cartId)
          .send(products[i]);
      } else {
        res = await request(app).post("/api/cart").send(products[i]);
      }
      cartId = res.header["x-cart-id"];
      expect(res.statusCode).toEqual(200);
    }
    const cart = await Cart.findOne({ _id: cartId });
    const total = products.reduce((acc, product) => {
      return acc + product.qty * product.price;
    }, 0);
    expect(cart.subTotal).toEqual(total);
    done();
  });

  it("should  update(increment by a value) an item in cart for anonymous customer", async (done) => {
    const {
      body: {
        data: { cart: currentCart },
      },
    } = await request(app).get("/api/cart").set("x-cart-id", cartId);
    const product = { ...products[1], qty: 5 };
    const res = await request(app)
      .post("/api/cart")
      .set("x-cart-id", cartId)
      .send(product);
    const updatedCart = await Cart.findOne({ _id: cartId });

    const index = updatedCart.items.findIndex(
      (item) => item.productId == product.productId
    );

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("data");

    expect(updatedCart.items[index].qty).toEqual(
      currentCart.items[index].qty + product.qty
    );
    expect(updatedCart.subTotal).toEqual(
      currentCart.subTotal + product.qty * product.price
    );
    expect(updatedCart.size).toEqual(currentCart.size + product.qty);
    done();
  });

  it("should  get cart items  for anonymous customer", async (done) => {
    const res = await request(app).get("/api/cart").set("x-cart-id", cartId);
    const cart = await Cart.findOne({ _id: cartId });
    expect(res.statusCode).toEqual(200);
    expect(res.body.data.cart.subTotal).toEqual(cart.subTotal);
    expect(res.body.data.cart.size).toEqual(cart.size);
    done();
  });

  it("should  update(decrement by a value) an item in cart for anonymous customer", async (done) => {
    const product = { ...products[0], qty: 2 };
    const {
      body: {
        data: { cart: currentCart },
      },
    } = await request(app).get("/api/cart").set("x-cart-id", cartId);

    const res = await request(app)
      .put("/api/cart")
      .set("x-cart-id", cartId)
      .send(product);
    const updatedCart = await Cart.findOne({ _id: cartId });
    const index = updatedCart.items.findIndex(
      (item) => item.productId == product.productId
    );

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("data");
    expect(updatedCart.items[index].qty).toEqual(
      currentCart.items[index].qty - product.qty
    );
    expect(updatedCart.subTotal).toEqual(
      currentCart.subTotal - product.qty * product.price
    );
    expect(updatedCart.size).toEqual(currentCart.size - product.qty);
    done();
  });

  it("should  delete an item from cart for anonymous customer", async (done) => {
    const product = { productId: products[0].productId };

    const {
      body: {
        data: { cart: currentCart },
      },
    } = await request(app).get("/api/cart").set("x-cart-id", cartId);
    const cartItem = currentCart.items.find(
      (item) => item.productId == product.productId
    );

    const res = await request(app)
      .delete("/api/cart")
      .set("x-cart-id", cartId)
      .send(product);
    const updatedCart = await Cart.findOne({ _id: cartId });
    const index = updatedCart.items.findIndex(
      (item) => item.productId == product.productId
    );

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("data");
    expect(index).toEqual(-1);
    expect(updatedCart.subTotal).toEqual(
      currentCart.subTotal - cartItem.qty * cartItem.price
    );
    expect(updatedCart.size).toEqual(currentCart.size - cartItem.qty);
    done();
  });
});

afterAll(async (done) => {
  await db.reset("Customers");
  await db.reset("Cart");
  await db.close();
  done();
});
