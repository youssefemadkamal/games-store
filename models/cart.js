import mongo from "mongoose";

const CartSchema = new mongo.Schema({
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
    quantity:{
        type:Number,
        default:1
    },
    price:{
        type:Number,
        required:true
    }   ,
    Date:{
        type:Date,
        default:Date.now()
    }
})

const Cart = mongo.model("Cart",CartSchema)
export default Cart;