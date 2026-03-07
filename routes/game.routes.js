import { Router } from "express";
import { getAllGames, getGameById, createGame, updateGame, deleteGame, searchGames,delete_Game } from "../controllers/game.controllers.js";
import { checkToken } from "../middleware/checkToken.js"
import { checkAdmin } from "../middleware/checkAdmin.js"

export const gameRouter  = Router();



gameRouter.get("/", getAllGames)
gameRouter.get("/search", searchGames)
gameRouter.get("/:id", getGameById)

gameRouter.post("/", checkToken, checkAdmin, createGame)
gameRouter.put("/:id", checkToken, checkAdmin, updateGame)
gameRouter.delete("/:id", checkToken, checkAdmin, deleteGame)
gameRouter.delete("/force/:id", checkToken, checkAdmin, delete_Game)