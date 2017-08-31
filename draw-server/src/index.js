
import express from "express";
import expressWs from "express-ws";
import morgan from "morgan";

const port = process.env.PORT || 4000;
const pub = process.env.PUB || "../draw-web/build";

const wss = expressWs(express());
const app = wss.app;

function parseCommand(cmd) {
    return JSON.parse(cmd);
}

const w = wss.getWss("/ws");

app
.use(morgan("tiny"))
.ws("/ws", (ws, req) => {
    console.log("ws connected: " + req.url);
    ws.on("message", msg => {
        console.log("message from " + ws + ": " + msg);

        const cmd = parseCommand(msg);
        if (cmd.c === "join") {
            ws.data = { name: cmd.p.name };

            w.clients.forEach(client => {
                if (client !== ws && client.data) {
                    client.send(JSON.stringify({ c: "j", p: {name: cmd.p.name }}));
                    ws.send(JSON.stringify({ c: "j", p: {name: client.data.name }}));
                }
            });
        }
    });
    ws.on('close', () => w.clients.forEach(c => c !== w && c.data && c.send(JSON.stringify({ c: "l", p: {name: c.data.name }}))));
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
