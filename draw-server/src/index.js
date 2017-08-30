
import express from "express";
import expressWs from "express-ws";
import morgan from "morgan";

const port = process.env.PORT || 4000;
const pub = process.env.PUB || "../draw-web/build";

const wss = expressWs(express());
const app = wss.app;

app
.use(morgan("tiny"))
.ws("/ws", (ws, req) => {
    ws.on("message", msg => console.log("message from " + ws + ": " + msg));
    ws.on('close', () => console.log('ws disconnected'));
    ws.send("hello");
    console.log("ws connected: " + req.url);
})
.use(express.static(pub))
.use((req, res, next) => {
    if (req.url.indexOf("/api") === 0 || req.url.indexOf("/ws") === 0) {
        next();
        return;
    }
    console.log("fallback to index: " + req.url);
    res.sendFile("index.html", {root: pub})
})
.listen(port, () => console.log(`listening on ${port} port (public is ${pub})`));
