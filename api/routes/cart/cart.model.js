const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  customer: {
    type: Schema.ObjectId,
    ref: "Customers",
  },
  items: [
    {
      productId: String,
      name: String,
      qty: {
        type: Number,
        default: 1,
      },
      price: Number,
    },
  ],
  size: {
    type: Number,
    default: 0,
  },
  subTotal: {
    type: Number,
    default: 0,
  },
});

CartSchema.pre("save", async function () {});

CartSchema.methods.addItem = function (newItem) {
  const index = this.items.findIndex(
    (item) => item.productId == newItem.productId
  );
  if (index != -1) this.items[index].qty += newItem.qty;
  else this.items.push(newItem);

  this.subTotal += newItem.price * newItem.qty;
  this.size += newItem.qty;
};
CartSchema.methods.reduce = function (product) {
  const index = this.items.findIndex(
    (item) => item.productId == product.productId
  );

  if (index != -1) this.items[index].qty -= product.qty;
  this.subTotal -= product.price * product.qty;
  this.size -= product.qty;
};
CartSchema.methods.deleteItem = function (product) {
  const index = this.items.findIndex(
    (item) => item.productId == product.productId
  );
  const item = this.items.splice(index, 1)[0];

  this.subTotal -= item.price * item.qty;
  this.size -= item.qty;
};
// CartSchema.methods.remove = function (newItem) {};
module.exports = mongoose.model("Cart", CartSchema);
