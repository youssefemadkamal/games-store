import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const checkToken = (req,res,next)=>{
    try{
    const token = req.headers.token
    if(!token){
    return res.status(401).json({ message: "Unauthorized: Please login" });
    }
    const verifed = jwt.verify(token,process.env.SECRET_ACCESS_TOKEN);
    req.user = verifed;
    next();
}catch(err){
    next(err)
}}

