const Stripe = require("stripe");
const Order = require("../models/orderModel");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create checkout session
const createCheckoutSession = async (req, res) => {
  try {
    const { cart, address, coupon, total, restId } = req.body;
    const userId = req.user?.id;

    if (!cart || cart.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }
    if (!address?.trim()) {
      return res.status(400).json({ message: "Delivery address is required" });
    }
    if (!restId) {
      return res.status(400).json({ message: "Restaurant ID missing" });
    }
    if (!total || total <= 0) {
      return res.status(400).json({ message: "Invalid total amount" });
    }
    if (!userId) {
      return res.status(401).json({ message: "User not logged in" });
    }

    // Render server cannot use Vite variables
    const clientURL = process.env.CLIENT_URL;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
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
        userId,
        restId,
        address,
        total: String(total),
        couponName: coupon ? coupon.code : "",
        // Avoid metadata overflow
        cartItems: JSON.stringify(cart.map(item => ({
          id: item.itemId,
          qty: item.quantity
        })))
      },
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    res.status(500).json({ message: "Stripe checkout failed" });
  }
};

// Verify session & create order
const verifyCheckoutSession = async (req, res) => {
  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({ message: "Missing session ID" });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session || session.payment_status !== "paid") {
      return res.status(400).json({ message: "Payment not completed" });
    }

    const {
      userId,
      restId,
      address,
      total,
      couponName,
      cartItems
    } = session.metadata;

    const parsedCart = JSON.parse(cartItems);

    // Save order
    const order = await Order.create({
      userId,
      restId,
      items: parsedCart,
      address,
      totalAmount: total,
      couponName: couponName || null,
      paymentId: session.id,
      paymentStatus: "Paid",
    });

    res.json({ message: "Order placed", order });
  } catch (err) {
    console.error("Payment verify error:", err);
    res.status(500).json({ message: "Payment verification failed" });
  }
};

module.exports = {
  createCheckoutSession,
  verifyCheckoutSession,
};
