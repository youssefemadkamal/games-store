import app from "./app.js";
import { dbconnection } from "./dbconnection/dbconnection.js";
import dotenv from "dotenv";
import http from "http";
import { initChatSocket } from "./chat/chat.socket.js";

dotenv.config();
dbconnection();

const port = process.env.PORT || 3000; 

const server = http.createServer(app);

initChatSocket(server);

server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

