const { Router } = require("express");
const { getCustomer, createCustomer } = require("./customer");
const router = Router();

router.get("/", getCustomer);
router.post("/create", createCustomer);
// router.get("/", getCustomer);

module.exports = router;
