import Game  from '../models/game.js';

export const getAllGames = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 40;
        const page = parseInt(req.query.page) || 1; 
        const games = await Game.find({}).select("-__v").limit(limit).skip((page - 1) * limit);
        res.status(200).json(games);
    }
    catch (error) {
        throw error;
    }
};

export const getGameById = async (req, res) => {    
    try {
        const game = await Game.findById(req.params.id);
        if (!game) {
            return res.status(404).json({ message: "Game not found" });
        }
        res.status(200).json(game);
    }
    catch (error) {
         throw error;
    }
};

export const createGame = async (req, res) => {
    try {
        const newGame = await Game.create(req.body)
        res.status(201).json(newGame);
    }
    catch (error) {
         throw error;
    }
};

export const updateGame = async (req, res) => {
    try {
        const updatedGame = await Game.findByIdAndUpdate(
            req.params.id,
             req.body,
              { new: true }
        );
        if (!updatedGame) {
            return res.status(404).json({ message: "Game not found" });
        }
        res.status(200).json({ message: "Game updated", data: updatedGame });
    }
    catch (error) {
         throw error;
    }   
};
export const deleteGame = async (req, res) => {
    try {
        const game = await Game.findByIdAndUpdate(
            req.params.id,
            { status: "inactive" },
            { new: true }
        )
        if (!game) {
            return res.status(404).json({ message: "Game not found" })
        }
        return res.status(200).json({ message: "Game deactivated", data: game })
    } catch (err) {
        throw err
    }
}
export const delete_Game = async (req, res) => {
    try {
        const deletedGame = await Game.findByIdAndDelete(req.params.id); 
        
        if (!deletedGame) {
            return res.status(404).json({ message: "Game not found" });
        }   
        
        res.status(200).json({ message: "Game deleted", data: deletedGame });
    }
    catch (error) {     
        throw error;
    }
};


export const searchGames = async (req, res, next) => {
    try {
        const filter = { status: "active" }

        if (req.query.title) {
            filter.title = { $regex: req.query.title, $options: "i" }
        }
        if (req.query.category) {
            filter.category = { $regex: new RegExp(`^${req.query.category}$`, "i") }
        }
        const games = await Game.find(filter)
        return res.status(200).json({ data: games })
    } catch (err) {
        next(err)
    }
}