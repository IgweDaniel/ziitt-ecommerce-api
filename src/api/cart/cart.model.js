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
      size: String,
      img: String,
    },
  ],
  map: [String],
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

CartSchema.methods.addItem = function (product) {
  const index = this.items.findIndex(
    (item) => item.productId == product.productId && item.size == product.size
  );
  if (index != -1) this.items[index].qty += product.qty;
  else {
    this.items.push(product);
    this.map.push(product.productId);
  }

  this.subTotal += product.price * product.qty;
  this.size += product.qty;
};
CartSchema.methods.reduce = function (product) {
  //Handle case where item is less tan zero
  const index = this.items.findIndex(
    (item) => item.productId == product.productId
  );
  if (index != -1) {
    if (this.items[index].qty > 1) {
      this.items[index].qty -= product.qty;
      this.subTotal -= product.price * product.qty;
      this.size -= product.qty;
    } else {
      const item = this.items.splice(index, 1)[0];
      (this.subTotal -= item.price * 1), (this.size -= 1);
      this.map = this.map.filter((id) => id != item.productId);
    }
  }
};
CartSchema.methods.deleteItem = function (product) {
  const index = this.items.findIndex(
    (item) => item.productId == product.productId && item.size == product.size
  );
  if (index != -1) {
    const item = this.items.splice(index, 1)[0];

    this.subTotal -= item.price * item.qty;
    this.size -= item.qty;
    this.map = this.map.filter((id) => id != item.productId);
  }
};

module.exports = mongoose.model("Cart", CartSchema);
