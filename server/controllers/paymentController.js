const Stripe = require("stripe");
const Order = require("../models/orderModel");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create Stripe session
const createCheckoutSession = async (req, res) => {
  try {
    const { cart, address, coupon, total, restId } = req.body;
    const userId = req.user?.id;

    if (!cart || cart.length === 0)
      return res.status(400).json({ message: "Cart is empty" });

    if (!address)
      return res.status(400).json({ message: "Address required" });

    if (!userId)
      return res.status(401).json({ message: "User not logged in" });

    // STEP 1: Create pending order
    const order = await Order.create({
      userId,
      restId,
      items: cart.map((i) => ({
        id: i.itemId,
        qty: i.quantity
      })),
      address,
      totalAmount: total,
      couponName: coupon?.code || null,
      paymentStatus: "Pending"
    });

    const clientURL = process.env.CLIENT_URL;

    // STEP 2 — Create session with ONLY orderId
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],

      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: { name: "Order Payment" },
            unit_amount: Math.round(total * 100),
          },
          quantity: 1,
        },
      ],

      success_url: `${clientURL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${clientURL}/cart`,

      metadata: {
        orderId: String(order._id),
      },
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("Stripe session error:", err);
    res.status(500).json({ message: "Stripe checkout failed" });
  }
};


// Verify Payment
const verifyCheckoutSession = async (req, res) => {
  try {
    const { sessionId } = req.body;
    if (!sessionId) return res.status(400).json({ message: "Session ID missing" });

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session)
      return res.status(400).json({ message: "Session not found" });

    if (session.payment_status !== "paid")
      return res.status(400).json({ message: "Payment not completed" });

    const orderId = session.metadata.orderId;
    if (!orderId)
      return res.status(400).json({ message: "Order ID missing" });

    // Update order
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        paymentStatus: "Paid",
        paymentId: session.id,
      },
      { new: true }
    );

    return res.json({
      message: "Order placed successfully",
      order: updatedOrder,
    });

  } catch (err) {
    console.error("Payment verify error:", err);
    return res.status(500).json({ message: "Payment verification failed" });
  }
};


module.exports = {
  createCheckoutSession,
  verifyCheckoutSession,
};
