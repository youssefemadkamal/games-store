import Rate from "../models/rate.js";
import {GetUserIdFromToken} from "../Extention/GetUserIdFromToken.js";

export const createRate = async (req, res) => {
    try {
        const id = GetUserIdFromToken(req); 
        req.body.UserId = id;
        if(req.body.rate < 1 || req.body.rate > 5)
        {
            return res.status(400).json({ message: "Rate must be between 1 and 5" });
        }

        const rate = await Rate.findOne({ UserId: id, GameId: req.body.GameId });
        if (rate) {
            return res.status(400).json({ message: "You have already rated this game" });
        }
        const newRate = await Rate.create(req.body);
        res.status(201).json(newRate);
    } catch (error) {
        throw error;
    }
};

export const removeRate = async (req, res) => {
    try {
        const rate = await Rate.findOneAndDelete({ _id: req.params.id });
        if (!rate) {
            return res.status(404).json({ message: "Rate not found" });
        }
        res.status(200).json({ message: "Rate deleted" });
    } catch (error) {
        throw error;
    }
};

export const getAllRates = async (req, res) => {
    try {
        const rates = await Rate.find({GameId: req.params.id});
        res.status(200).json(rates);
    } catch (error) {
        throw error;
    }
}