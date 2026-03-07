import Cart from "../models/cart.js";
import Game  from "../models/game.js";
import { GetUserIdFromToken } from "../Extention/GetUserIdFromToken.js";

export const addToCart = async (req, res) => {
    try {      
        const gameId = req.body.GameId; 
         const game = await Game.findById(gameId);
          if(!game)
          {
              return res.status(404).json({ message: "Game not found" });
          }
          
          req.body.UserId = GetUserIdFromToken(req); 
          
          const gameInCart = await Cart.findOne({ GameId: gameId, UserId: req.body.UserId });
          
          if (gameInCart) {
                 gameInCart.quantity += req.body.quantity;
                 gameInCart.price = gameInCart.quantity * game.price;
                 await gameInCart.save();
                 return res.status(200).json(gameInCart);
          }
          req.body.price = req.body.quantity * game.price;

        const newCart = await Cart.create(req.body);
        res.status(201).json(newCart);
    } catch (error) {
        throw error;
    }
};

export const removeFromCart = async (req, res) => {
    try {
          const cartItem = await Cart.findByIdAndDelete(req.params.id);
          if(!cartItem) {
            return res.status(404).json({ message: "game not found" });
        }
        res.status(200).json({ message: "the game deleted from Your Cart" });
    } catch (error) {
        throw error;
    }
};

export const getCart = async (req, res) => {
    try {
        const cart = await Cart.find({ UserId: GetUserIdFromToken(req) });    
        res.status(200).json(cart);
    } catch (error) {
        throw error;
    }
};
export const clearCart = async (req, res) => {
    try {
        const userId = GetUserIdFromToken(req);
        
        const result = await Cart.deleteMany({ UserId: userId });
        
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Cart is already empty" });
        }

        res.status(200).json({ message: "Order processed and cart cleared successfully! 🎮" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};