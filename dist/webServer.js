"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const net = __importStar(require("net"));
const fs = require("fs");
const PORT = 3000;
net
    .createServer((socket) => {
    console.log("connected");
    socket.on("data", (data) => {
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
