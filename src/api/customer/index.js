const { Router } = require("express");
const {
  getCustomer,
  createCustomer,
  authenticateCustomer,
} = require("./customer");
const router = Router();

router.get("/detail", getCustomer);
router.post("/", createCustomer);
router.post("/auth", authenticateCustomer);

module.exports = router;
