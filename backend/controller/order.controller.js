import Orderdata from "../model/order.model.js";

export const getOrderData = async (req, res) => {
    const {userId,userName, Orders, amount, address ,paymentId} = req.body;
    try {
        const orderData = await Orderdata.create({
            userId: userId,
            userName: userName,
            Orders: Orders,
            amount: amount,
            address: address,
            paymentId: paymentId
        });
        await orderData.save();
        res.status(200).json({message: "Order created successfully", orderData});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const fetchOrderData = async (req, res) => {
    const { userId,email } = req.body;
    console.log(userId)
    try {
        const orderData = await Orderdata.find({
            userId : userId       
        });
        // res.status(200).json(orderData);
        res.send(orderData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getOrder = async (req, res) => {
    try {
        const orderData = await Orderdata.find();
        res.status(200).send(orderData);
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
