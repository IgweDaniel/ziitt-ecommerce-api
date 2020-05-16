const request = require("supertest");
const { app } = require("../../index");
const db = require("../../config/db");
const Cart = require("./cart.model");
const { test_db_uri } = require("../../config/config");
const products = [
  {
    productId: "111111",
    name: "can-berry juice",
    price: 120,
    qty: 4,
    size: "XS",
    img: "img-1",
  },
  {
    productId: "22222",
    name: "fowls egg",
    price: 10,
    qty: 2,
    size: "L",
    img: "img-2",
  },
  {
    productId: "111111",
    name: "can-berry juice",
    price: 120,
    qty: 4,
    size: "M",
    img: "img-1",
  },
];

let auth_token = null;

describe("Cart Endpoints (Authenticated Customer)", () => {
  beforeAll(async () => {
    db.open(test_db_uri);
    const res = await request(app).post("/api/customers").send({
      name: "JohnDoe",
      email: "johnDoe2@gmail.com",
      password: "testyAbtest12",
    });

    auth_token = res.body.data.token;
  });

  it("should  add items to cart for authenticated customer", async () => {
    let cartId = null;
    for (let i in products) {
      const res = await request(app)
        .post("/api/cart")
        .set("x-auth-token", auth_token)
        .send(products[i]);
      cartId = res.header["x-cart-id"];
      expect(res.statusCode).toEqual(200);
      expect(res.body.data.cartMap).toContain(products[i].productId);
    }

    const cart = await Cart.findOne({ _id: cartId });
    const total = products.reduce((acc, product) => {
      return acc + product.qty * product.price;
    }, 0);

    expect(cart.subTotal).toEqual(total);
  });

  it("should  get cart items for authenticated customer", async () => {
    const res = await request(app)
      .get("/api/cart")
      .set("x-auth-token", auth_token);

    const cartId = res.header["x-cart-id"];
    const cart = await Cart.findOne({ _id: cartId });
    expect(res.statusCode).toEqual(200);
    expect(res.body.data.cart.subTotal).toEqual(cart.subTotal);
    expect(res.body.data.cart.size).toEqual(cart.size);
  });
  it("should  update(increment by a value) an item in cart for authenticated customer", async () => {
    const product = { ...products[0], qty: 5 };
    const {
      header,
      body: {
        data: { cart: currentCart },
      },
    } = await request(app).get("/api/cart").set("x-auth-token", auth_token);
    const cartId = header["x-cart-id"];
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
  });

  it("should  update(decrement by a value) an item in cart for authenticated customer", async () => {
    const product = { ...products[1], qty: 2 };
    const {
      header,
      body: {
        data: { cart: currentCart },
      },
    } = await request(app).get("/api/cart").set("x-auth-token", auth_token);
    const cartId = header["x-cart-id"];

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
  });

  it("should  delete an item from cart for authenticated customer", async () => {
    const product = {
      productId: products[0].productId,
      size: products[0].size,
    };
    const {
      header,
      body: {
        data: { cart: currentCart },
      },
    } = await request(app).get("/api/cart").set("x-auth-token", auth_token);

    const cartId = header["x-cart-id"];
    const cartItem = currentCart.items.find(
      (item) => item.productId == product.productId && item.size == product.size
    );

    const res = await request(app)
      .delete("/api/cart")
      .set("x-auth-token", auth_token)
      .send(product);
    const updatedCart = await Cart.findOne({ _id: cartId });
    const index = updatedCart.items.findIndex(
      (item) => item.productId == product.productId && item.size == product.size
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("data");
    expect(index).toEqual(-1);
    expect(updatedCart.subTotal).toEqual(
      currentCart.subTotal - cartItem.qty * cartItem.price
    );
    expect(updatedCart.size).toEqual(currentCart.size - cartItem.qty);
  });

  afterAll(async () => {
    await db.reset("Customers");
    await db.reset("Cart");
    return db.close();
  });
});

describe("Cart Endpoints (Anonymous Customer)", () => {
  let cartId = null;
  beforeAll(async () => {
    return db.open(test_db_uri);
  });

  it("should  add items to cart  for anonymous customer", async () => {
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
      expect(res.statusCode).toEqual(200);
      cartId = res.header["x-cart-id"];
    }
    const cart = await Cart.findOne({ _id: cartId });
    const total = products.reduce((acc, product) => {
      return acc + product.qty * product.price;
    }, 0);

    expect(cart.subTotal).toEqual(total);
  });
  it("should  update(increment by a value) an item in cart for anonymous customer", async () => {
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
  });
  it("should  get cart items  for anonymous customer", async () => {
    const res = await request(app).get("/api/cart").set("x-cart-id", cartId);
    const cart = await Cart.findOne({ _id: cartId });
    expect(res.statusCode).toEqual(200);
    expect(res.body.data.cart.subTotal).toEqual(cart.subTotal);
    expect(res.body.data.cart.size).toEqual(cart.size);
  });
  it("should  update(decrement by a value) an item in cart for anonymous customer", async () => {
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
  });
  it("should  delete an item from cart for anonymous customer", async () => {
    const product = {
      productId: products[0].productId,
      size: products[0].size,
    };
    const {
      body: {
        data: { cart: currentCart },
      },
    } = await request(app).get("/api/cart").set("x-cart-id", cartId);
    const cartItem = currentCart.items.find(
      (item) => item.productId == product.productId && item.size == product.size
    );
    const res = await request(app)
      .delete("/api/cart")
      .set("x-cart-id", cartId)
      .send(product);
    const updatedCart = await Cart.findOne({ _id: cartId });
    const index = updatedCart.items.findIndex(
      (item) => item.productId == product.productId && item.size == product.size
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("data");
    expect(index).toEqual(-1);
    expect(updatedCart.subTotal).toEqual(
      currentCart.subTotal - cartItem.qty * cartItem.price
    );
    expect(updatedCart.size).toEqual(currentCart.size - cartItem.qty);
  });
  afterAll(async () => {
    await db.reset("Customers");
    await db.reset("Cart");
    return db.close();
  });
});
