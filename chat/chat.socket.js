import { Server } from "socket.io";

export const initChatSocket = (server) => {
    const io = new Server(server, { cors: { origin: "*" } });

    io.on("connection", (socket) => {
        console.log("A user connected: " + socket.id);

        socket.on("chatMessage", (data) => {
            console.log("Received message from " + data.senderName + " (" + socket.id + ")");
            io.emit("chatMessage", data);
        });

        socket.on("disconnect", () => {
            console.log("A user disconnected: " + socket.id);
        });
    });
    return io; 
};