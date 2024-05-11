import * as net from "net";
import { Socket, ListenOptions } from "net";
const fs = require("fs");

const PORT = 3000;

net
  .createServer((socket: Socket) => {
    console.log("connected");

    socket.on("data", (data: Buffer) => {
      const httpRequest = data.toString();
      const requestLine = httpRequest.split("\r\n")[0];
      console.log(requestLine);

      const path = requestLine.split("")[1];
      console.log(path);

      const requestFile = path.endsWith("/") ? path + "index.html" : path;

      if (!fs.existsSync(`.${requestFile}`)) {
        const httpResponse = `HTTP/1.1 404 Not Found
content-length: 0

`;
        socket.write(httpResponse);
        return;
      }

      const fileContent = fs.readFileSync(`.${requestFile}`);
      const httpResponse = `HTTP/1.1 200 OK
content-length: ${fileContent.length}

${fileContent}`;
      socket.write(httpResponse);
    });

    socket.on("close", () => {
      console.log("connection closed");
    });
  })
  .listen(PORT, "127.0.0.1");

console.log(`Server started on port ${PORT}`);
