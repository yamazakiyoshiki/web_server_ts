"use strict";
const net = require("net");
const SERVER_IP = "127.0.0.1";
const SERVER_PORT = "3000";
const socket = new net.Socket();
socket.connect(SERVER_PORT, SERVER_IP, () => {
    console.log(`connect to ${SERVER_IP}:${SERVER_PORT}`);
});
process.stdin.on("data", (data) => {
    socket.write(data);
});
socket.on("data", (data) => {
    console.log(`received: ${data}`);
});
