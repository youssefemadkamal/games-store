import {FavGame} from "../models/FavGame.js";
import  {GetUserIdFromToken}  from "../Extention/GetUserIdFromToken.js";

export const getFavGames = async (req, res) => {
    try {  
        const favGames = await FavGame.find({ UserId: GetUserIdFromToken(req)});
        res.status(200).json(favGames);
    } catch (error) {
        throw error;
    }
};
export const createFavGame = async (req, res) => {
    try {
        const id = GetUserIdFromToken(req); 
        console.log(id);
        const games = await FavGame.find({ UserId: id, GameId: req.body.GameId });
        if (games.length > 0) {
            return res.status(400).json({ message: "Game already in favorites" });
        }
        req.body.UserId = id;
        const newFavGame = await FavGame.create(req.body);
        res.status(201).json(newFavGame);
    } catch (error) {
        throw error;
    }
};
export const removeFavGame = async (req, res) => {
    try {
        const favGame = await FavGame.findOneAndDelete({ _id: req.params.id });
        if (!favGame) {
            return res.status(404).json({ message: "FavGame not found" });
        }
        res.status(200).json({ message: "FavGame deleted" });
    } catch (error) {
        throw error;
    }
}