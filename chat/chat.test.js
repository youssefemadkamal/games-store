import { expect } from "chai";
import { io as Client } from "socket.io-client";
import { createServer } from "http";
import express from "express";
import { initChatSocket } from "./chat.socket.js";

describe("Chat Socket Test", () => {
  let io, clientSocket, httpServer;
  const port = 5001;

  before((done) => {
    const app = express();
    httpServer = createServer(app);
    io = initChatSocket(httpServer);

    httpServer.listen(port, () => {
      clientSocket = Client(`http://localhost:${port}`);
      clientSocket.on("connect", done);
    });
  });

  after(() => {
    io.close();
    clientSocket.close();
    httpServer.close();
  });

  it("should send and receive chatMessage", (done) => {
    const testData = { senderName: "Youssef", message: "Hello Test" };

    clientSocket.on("chatMessage", (data) => {
      expect(data).to.deep.equal(testData);
      done();
    });

    clientSocket.emit("chatMessage", testData);
  });
});