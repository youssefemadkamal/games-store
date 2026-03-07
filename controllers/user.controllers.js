import {User} from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { sendEmail } from "../email/email.js";
dotenv.config();

export const signUp = async (req,res)=>{
    try{
        if (req.file) {
            req.body.Image = req.file.filename;
        }
          const newUser =await User.create(req.body);
          await sendEmail(req.body.email);

          return res.status(201).json({User:newUser})
    }catch(err){
        throw err
    }
}




export const signIn = async (req,res)=>{
      try{ 
      const user = await User.findOne({ email: req.body.email }).select("+password");

      if (!user)
        { return res.status(404).json({ message: "user not found please signup" }); }
      
      if (!user.isConfirmed)
        { return res.status(403).json({ message: "Please verify your email before logging in" }); }

    const machPass = await bcrypt.compare(req.body.password, user.password); 

    if (!machPass) 
      { return res.status(401).json({ message: "Invalid email or password" }); } 

    const accessToken = jwt.sign({ id: user._id, role: user.role },process.env.SECRET_ACCESS_TOKEN,{expiresIn:"1d"}); 

    return res.status(200).json({ message:"welcome to your fav games store" ,token: accessToken ,data:user }); 

    }catch(err){
     throw err 
    }
 }


export const verifyAccount = async (req, res) => {
  try {
    const { token } = req.params; 

    jwt.verify(token, process.env.SECRET_EMAIL_TOKEN, async (err, decoded) => {
      if (err) {
        return res.status(400).json({ message: "Invalid or expired token" });
      }
      const updatedUser = await User.findOneAndUpdate(
        { email: decoded.email },
        { isConfirmed: true },
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ message: "Email confirmed successfully", user: updatedUser });
    });
  } catch (err) {
    throw err
}
};

export const getMe = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(404).json({ message: "User data not found in token" });
        }
        
        const fullUser = await User.findById(req.user.id || req.user._id);
        
        if (!fullUser) {
            return res.status(404).json({ message: "User not found in Database" });
        }
        
        res.status(200).json({ data: fullUser });
    } catch (err) {
        next(err);
    }
};

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
};

export const addAdmin = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const newAdmin = new User({
            name,
            email,
            password,
            role: "admin"
        });
        await newAdmin.save();
        res.status(201).json({ message: "Admin added", newAdmin });
    } catch (err) {
        next(err);
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        
        res.status(200).json({ message: "User deleted successfully", data: deletedUser });
    } catch (err) {
        next(err); 
    }
};


export const updateUser = async (req, res) => {
    try {
        const userId = req.user.id || req.user._id; 

        if (!userId) {
            return res.status(400).json({ message: "User ID missing from token" });
        }

        if (req.file) {
            req.body.Image = req.file.filename;
        }

        if (req.body.password) {
            delete req.body.password; 
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId, 
            req.body, 
            { new: true, runValidators: true } 
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ 
            message: "Profile updated successfully", 
            user: updatedUser 
        });

    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ message: "Email is already in use by another account." });
        }
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
}