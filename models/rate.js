import mongo from "mongoose";

const RateSchema = new mongo.Schema({
    UserId:{
        type:mongo.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    GameId:{
        type:mongo.Schema.Types.ObjectId,
        ref:"Game",
        required:true
    },
    rating:{
        type: Number,
        default: 0,
        min: 0,
        max: 5  
    }
})

const Rate= mongo.model("Rate",RateSchema)
export default Rate;