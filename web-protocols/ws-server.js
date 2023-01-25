const { WebSocketServer } = require("ws");

const wss = new WebSocketServer({ port: 3000 });

wss.on("connection", (socket) => {
  socket.on("message", (msg) => {
    if (msg.toString() === "Hello") {
      socket.send("World!");
    }
  });
});
