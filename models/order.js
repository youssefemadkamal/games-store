import mongo from "mongoose";

const OrderSchema = new mongo.Schema({
    UserId:{
        type:mongo.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    items:{
        type:[mongo.Schema.Types.ObjectId],
        ref:"Game",
        required:true
    },
    Date:{
        type:Date,
        default:Date.now()
    },
    TotalPrice:{
        type:Number,
        required:true   
    },
    status:{
        type:String,
        enum:["pending","completed","rejected"],
        default:"pending"
    }
})

export const order = mongo.model("Order",OrderSchema);