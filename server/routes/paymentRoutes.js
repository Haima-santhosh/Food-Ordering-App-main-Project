const express = require("express");
const router = express.Router();
const { createCheckoutSession, verifyCheckoutSession } = require("../controllers/paymentController");
const authUser = require("../middlewares/authUser"); 

router.post("/create-checkout-session", authUser, createCheckoutSession);
router.post("/verify-checkout-session", verifyCheckoutSession);


module.exports = router;
