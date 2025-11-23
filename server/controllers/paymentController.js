const Stripe = require("stripe");
const Order = require("../models/orderModel");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create Stripe checkout session
const createCheckoutSession = async (req, res) => {
  try {
    const { cart, address, coupon, total, restId } = req.body;

    if (!cart || cart.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    if (!address || !address.trim()) {
      return res.status(400).json({ message: "Delivery address is required" });
    }

    if (!restId) {
      return res.status(400).json({ message: "Restaurant ID missing" });
    }

    if (!total || total <= 0) {
      return res.status(400).json({ message: "Invalid total amount" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: { name: "Order Total" },
            unit_amount: Math.round(total * 100),
          },
          quantity: 1,
        },
      ],

      success_url:
        "http://localhost:5173/payment-success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:5173/cart",

      metadata: {
        address,
        restId,
        cart: JSON.stringify(cart),
        couponId: coupon ? coupon._id : "none",
        couponName: coupon ? coupon.code : "none",
      },
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error.message);
    return res.status(500).json({ message: "Stripe checkout failed" });
  }
};

// Verify payment and Save order
const verifyCheckoutSession = async (req, res) => {
  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({ message: "Session ID missing" });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return res.json({ message: "Payment not completed" });
    }

    //  Check if already saved
    const alreadySaved = await Order.findOne({ stripeSessionId: sessionId });
    if (alreadySaved) {
      return res.json({
        message: "Payment successful",
        order: {
          orderId: alreadySaved._id,
          totalAmount: alreadySaved.amount,
          paymentStatus: alreadySaved.paymentStatus,  
          couponName: alreadySaved.couponName,         
          address: alreadySaved.deliveryAddress,
        },
      });
    }

    const cartItems = JSON.parse(session.metadata.cart || "[]");

    //  Create new order
    const newOrder = new Order({
      userId: req.user.id,
      restId: session.metadata.restId,

      items: cartItems.map((it) => ({
        itemId: it.itemId,
        quantity: it.quantity,
        price: it.price,
      })),

      couponId:
        session.metadata.couponId === "none" ? null : session.metadata.couponId,

      couponName:
        session.metadata.couponName === "none"
          ? null
          : session.metadata.couponName,

      amount: session.amount_total / 100,
      deliveryAddress: session.metadata.address,
      paymentStatus: "Completed", 
      paymentMethod: "card",
      stripeSessionId: sessionId,

      // Order status should stay pending
      status: "pending",
    });

    await newOrder.save();

    return res.json({
      message: "Payment successful",
      order: {
        orderId: newOrder._id,
        totalAmount: newOrder.amount,
        paymentStatus: newOrder.paymentStatus, 
        couponName: newOrder.couponName,      
        address: newOrder.deliveryAddress,
      },
    });
  } catch (err) {
    console.log("verify error:", err.message);
    res.status(500).json({ message: "Failed to verify payment" });
  }
};

module.exports = { createCheckoutSession, verifyCheckoutSession };
