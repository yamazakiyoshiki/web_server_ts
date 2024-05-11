import * as net from "net";
import { Socket, ListenOptions } from "net";

const PORT = 3000;

net
  .createServer((socket: Socket) => {
    console.log("connected");

    socket.on("data", (data: Buffer | string) => {
      console.log(data);
      socket.write(data);
    });

    socket.on("close", () => {
      console.log("connection closed");
    });
  })
  .listen(PORT, "127.0.0.1");

console.log(`Server started on port ${PORT}`);
