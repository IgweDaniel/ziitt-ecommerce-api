const { Router } = require("express");
const {
  getCustomer,
  createCustomer,
  authenticateCustomer,
} = require("./customer");
const router = Router();

router.get("/", getCustomer);
router.post("/", createCustomer);
router.post("/auth", authenticateCustomer);
// router.get("/", getCustomer);

module.exports = router;
