const { Router } = require("express");
const { addToCart, reduceItem, getCart, removeItem } = require("./cart");
const router = Router();
router.use(require("../../middleware/getCart"));
router.post("/", addToCart);
router.get("/", getCart);
router.put("/", reduceItem);
router.delete("/", removeItem);

module.exports = router;
