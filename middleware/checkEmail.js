import { userModel } from "../dbconnection/userModel/user.js"

export const checkSignin = async (req,res,next)=>{
    try{
        const foundEmail = await userModel.findOne({email:req.body.email})
        if(!foundEmail){
            return res.status(404).json({message:"email is not found "})
        }
        next();
    }catch(err){
        next(err)
    }
}