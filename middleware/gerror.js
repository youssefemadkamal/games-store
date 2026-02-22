export const gerror = (err,req,res,next)=>{
    console.error("global error",err);
    res.status(err.statusCode || 5000).json({message:err.message||"internal server error "})
}