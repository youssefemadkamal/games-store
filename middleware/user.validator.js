import { userValidation } from "../validation/user.validation.js";

export const userValidate = (req,res,next)=>{
    try{
        const validate = userValidation.validate(req.body,{
            abortEarly:false,
            stripUnknown:true
        })
    if(validate.error){
        const errorMessage = validate.error.details.map(mes => mes)
        return res.status(422).send({err:errorMessage})
    }
    next()   
    }catch(err){
        next(err);
    }
} 