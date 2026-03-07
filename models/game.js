import mongoose from "mongoose";
    
const gameSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    image: { type: String, required: true },
    category: { type: String, required: true },
    stock: { type: Number, default: 0, min: 0 },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    status: { type: String, default: "active", enum: ["active", "inactive"] },
    
    developer: { type: String, default: "Unknown" },
    requirements: {
        os: { type: String, default: "Windows 10 64-bit" },
        processor: { type: String, default: "Intel Core i7-1185G7 / AMD PRO A8-9600" },
        memory: { type: String, default: "8GB - 16GB RAM" },
        graphics: { type: String, default: "Intel Iris Xe / AMD Radeon R7" },
        storage: { type: String, default: "50 GB available space" }
    }
}, { versionKey: false });

const Game = mongoose.model('Game', gameSchema);
export default Game;