// Cross platform server in vanilla nodejs
// You can even run this on Android btw!

import http from "http"
import fs from "fs"

const mimeTypes = {
    ".html" : "text/html",
    ".css"  : "text/css",
    ".js"   : "text/javascript",
    ".jpeg" : "image/jpeg",
    ".jpg"  : "image/jpeg",
    ".png"  : "image/png",
    ".svg"  : "image/svg+xml",
    ".ico"  : "image/x-icon",
    ".gif"  : "image/gif",
    ".ttf"  : "font/ttf",
    ".otf"  : "font/otf",
    ".mp4"  : "video/mp4",
    ".mp3"  : "audio/mpeg",
    ".wav"  : "audio/wav",
    ".md"   : "text/markdown",
    ".json" : "application/json",
};

const emptyRouteFile = "index.html";

const server = http.createServer((req, res) => {
    if (req.url == "/") { // redirect to `index.html`
        req.url = emptyRouteFile;
    }

    fs.readFile(`./${req.url}`, (err, data) => {
        if (!err) {
            const offset = req.url.lastIndexOf(".");
            const index = offset == -1 ? "" : req.url.substr(offset);

            const mimetype = mimeTypes[index] ?? "text/plain";

            res.setHeader("Content-type" , mimetype);
            res.end(data);
        } 
        else {
            res.writeHead(404, `Cannot resolve a file ${req.url}`);
            res.end();
        }
    });
});

const portFlag = "-p";
var port = 1984;

if (process.argv.includes(portFlag)) {
    const argPort = process.argv[process.argv.indexOf(portFlag) + 1];

    if (argPort) {      // check if port is assigned
        port = argPort; // so replace the vanilla port number
    }
}

server.listen(port, () => {
    console.clear();
    console.log("Womp Womp 🐳");
    console.log(`It's settled: http://localhost:${port}`);
});

server.on("error", (e) => {
    console.log(e.message);
});