import { order as Order } from "../models/order.js";
import cart from "../models/cart.js";
import { GetUserIdFromToken } from "../Extention/GetUserIdFromToken.js";
import { User } from "../models/user.js"; 

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({UserId:GetUserIdFromToken(req)});
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const removeOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json({ message: "Order deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createOrder = async (req, res) => {
    try {
        const id = GetUserIdFromToken(req); 
        req.body.UserId = id;
        const cartitem = await cart.find({UserId:id});
        req.body.items = cartitem;
        req.body.TotalPrice = req.body.items.reduce((total, item) => total + item.price, 0);
        const newOrder = await Order.create(req.body);
       
        for(let i=0;i<cartitem.length;i++)
        {
            await cart.findByIdAndDelete(cartitem[i]._id);
        }

        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const GetAllOrdersForUsers = async (req, res) => {
    try {
        const orders = await Order.find({}).populate("UserId", "name email");
        res.status(200).json({ orders }); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



export const UpdateStatus = (req, res) => {
    try {
        const orderId = req.params.id;
        const updatedStatus = req.body.status;
        Order.findByIdAndUpdate(orderId, { status: updatedStatus }, { new: true })
            .then(updatedOrder => {
                if (!updatedOrder) {
                    return res.status(404).json({ message: "Order not found" });
                }
                res.status(200).json(updatedOrder);
            })
            .catch(error => {
                res.status(500).json({ message: error.message });
            });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}