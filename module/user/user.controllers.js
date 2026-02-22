import { userModel } from "../../dbconnection/userModel/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
 
dotenv.config();

export const signUp = async (req,res)=>{
    try{
    const newUser =await userModel.create(req.body);
    return res.status(201).json({User:newUser})
    }catch(err){
        throw err
    }
}

export const signIn = async (req,res)=>{
    try{
        const user = await userModel.findOne({ email: req.body.email }).select("+password");
        if(!user){
            return res.status(404).json({message:"user not found please signup"});
        }
        const machPass = await bcrypt.compare(req.body.password, user.password)
        if(!machPass){
            return res.status(401).json({message:"Invalid email or password"});
        }
        const accessToken = jwt.sign({name:req.body.name},process.env.SECRET_ACCESS_TOKEN,{expiresIn:"15min"})
        return res.status(200).json({message:"wellcome to your fav games store",data:user});
    }catch(err){
        throw err
    }
}