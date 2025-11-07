const orderData = {
  orderId: "ORD123456",
  date: "2025-11-06",
  customerName: "Alice Christy",
  deliveryAddress: {
    street: "12, Rose Garden Road",
    city: "Chennai",
    pincode: "600001",
  },
  paymentMethod: "UPI",
  items: [
    { name: "Masala Dosa", quantity: 1, price: 899 },
    { name: "Paneer Tikka Masala", quantity: 2, price: 499 },
  ],
  totalAmount: 1897,
  status: "Confirmed",
};

export default orderData;
