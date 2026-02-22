import app from "./app.js";
import { dbconnection } from "./dbconnection/dbconnection.js";
import dotenv from "dotenv";

dotenv.config();

dbconnection();
const port = process.env.PORT || 3000; 
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})




// Middleware للتحقق من التوكن
// Role-based authorization
