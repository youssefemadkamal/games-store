import mongo from "mongoose";

const FavGameSchema = new mongo.Schema({
    UserId:{
        type:mongo.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    GameId:{
        type:mongo.Schema.Types.ObjectId,
        ref:"Game",
        required:true
    }
})

export const FavGame = mongo.model("FavGame",FavGameSchema);
