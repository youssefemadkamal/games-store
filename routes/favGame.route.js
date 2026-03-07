import{Router } from "express"
import { createFavGame, getFavGames, removeFavGame } from "../controllers/FavGame.controller.js";
import { checkToken } from "../middleware/checkToken.js";
export const favGameRouter = Router();

favGameRouter.get("/", checkToken, getFavGames);
favGameRouter.delete("/:id", checkToken, removeFavGame);
favGameRouter.post("/", checkToken, createFavGame);