import { getAllOrders, removeOrder, getOrderById, createOrder, GetAllOrdersForUsers, UpdateStatus } from "../controllers/order.controller.js";
import { checkToken } from "../middleware/checkToken.js";
import { checkAdmin } from "../middleware/checkAdmin.js"
import { Router } from "express";

export const orderRouter = Router();

orderRouter.get("/AllOrders", checkToken, checkAdmin, GetAllOrdersForUsers);
orderRouter.get("/", checkToken, getAllOrders);
orderRouter.get("/:id", checkToken, getOrderById);
orderRouter.post("/", checkToken, createOrder);
orderRouter.delete("/:id", checkToken, removeOrder);
orderRouter.patch("/UpdateStatus/:id", checkToken, checkAdmin, UpdateStatus);