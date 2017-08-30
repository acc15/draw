
import express from "express";
import expressWs from "express-ws";
import morgan from "morgan";

const port = process.env.PORT || 4000;
const pub = process.env.PUB || "../draw-web/build";

const app = express();
const wss = expressWs(app);

app
.use(morgan("tiny"))
.ws("/api/ws", (ws, req) => {
    ws.on("message", msg => console.log("message from " + ws + ": " + msg));
    console.log("ws connected: " + ws);
})
.use(express.static(pub))
.use((req, res, next) => {
    if (req.url.indexOf("/api") === 0) {
        next();
        return;
    }
    res.sendFile("index.html", {root: pub})
})
.listen(port, () => console.log(`server listening on ${port} port (public is ${pub})`));
