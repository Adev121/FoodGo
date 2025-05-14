import Razorpay from "razorpay";
import dotenv from "dotenv";
dotenv.config();

const RazorpayInstance = new Razorpay({
  key_id: process.env.RAZOR_KEY_ID,
  key_secret: process.env.RAZOR_SECRET,
});

export const createOrder = async (req, res) => {
  const { amount } = req.body;

  const options = {
    amount: amount * 100,
    currency: "INR",
    receipt: "order_rcptid_11",
  };

  try {
    const order = await RazorpayInstance.orders.create(options);
    res.status(200).json({ order });
    console.log(order)
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};
