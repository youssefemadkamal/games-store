import mongoose from "mongoose";

export const dbconnection = async ()=> {
    try{
    await mongoose.connect("mongodb://localhost:27017/gamesStore")
    console.log("DB is connected")
    }catch(err){
    console.log(err)
}}
