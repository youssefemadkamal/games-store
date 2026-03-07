import {Router} from "express";
import {createRate, getAllRates , removeRate} from "../controllers/rate.controller.js";
import {checkToken} from "../middleware/checkToken.js";
export const rateRouter = Router();
rateRouter.post("/",checkToken,createRate);
rateRouter.get("/:id",checkToken,getAllRates);
rateRouter.delete("/:id",checkToken,removeRate);
