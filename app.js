import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import { userRouter } from "./routes/user.routes.js";
import { gerror } from "./middleware/gerror.js";
import { gameRouter } from "./routes/game.routes.js"
import { cartRouter } from "./routes/cart.route.js"
import { orderRouter } from "./routes/order.route.js"
import { favGameRouter } from "./routes/favGame.route.js"
import { rateRouter } from "./routes/rate.route.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use("/users", userRouter);
app.use("/games", gameRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);
app.use("/favGame", favGameRouter);
app.use("/rate", rateRouter);

app.use(gerror);

export default app;