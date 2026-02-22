import express from "express";
import { userRouter } from "./module/user/user.routes.js";
import { gerror } from "./middleware/gerror.js";

const app = express();

app.use(express.json());
app.use("/games",userRouter);


app.use(gerror)
export default app;
