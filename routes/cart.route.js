import express from "express";
import { addToCart, removeFromCart, getCart, clearCart } from "../controllers/cart.controller.js"; 
import { checkToken } from "../middleware/checkToken.js";

export const cartRouter = express.Router();

cartRouter.get("/", checkToken, getCart);
cartRouter.post("/", checkToken, addToCart);
cartRouter.get("/:id", checkToken, getCart);
cartRouter.delete("/", checkToken, clearCart); 
cartRouter.delete("/:id", checkToken, removeFromCart);