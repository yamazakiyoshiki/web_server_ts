"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const fs = require("fs");
const PORT = 3000;
http
    .createServer((request, response) => {
    const method = request.method;
    const path = request.url;
    console.log(`[request] ${method} ${path}`);
    const requestFile = path?.endsWith("/") ? path + "index.html" : path;
    if (method !== "GET" ||
        !fs.existsSync(`.${requestFile}`) ||
        fs.statSync(`.${requestFile}`).isDirectory()) {
        const requestOptions = {
            method: method,
            path: path,
            headers: request.headers,
        };
        const taskWebAppRequest = http.request("http://localhost:8080", requestOptions);
        request.on("data", (data) => {
            taskWebAppRequest.write(data);
        });
        taskWebAppRequest.on("response", (taskWebAppResponse) => {
            Object.entries(taskWebAppResponse.headers).forEach(([key, value]) => {
                // valueがundefinedの場合は処理をスキップ
                if (value === undefined)
                    return;
                // 配列かどうかで処理を分ける
                const headerValue = Array.isArray(value) ? value.join(", ") : value;
                response.setHeader(key, headerValue);
            });
            response.writeHead(taskWebAppResponse.statusCode || 500);
            taskWebAppResponse.on("data", (data) => {
                response.write(data);
            });
            taskWebAppResponse.on("end", () => {
                response.end();
            });
        });
        request.on("end", () => {
            taskWebAppRequest.end();
        });
        return;
    }
    const fileContent = fs.readFileSync(`.${requestFile}`);
    response.writeHead(200);
    response.write(fileContent);
    response.end();
})
    .listen(PORT, "127.0.0.1");
console.log(`Server started on port ${PORT}`);
