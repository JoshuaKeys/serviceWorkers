const http = require("http");
const https = require("https");
const url = require("url");
const StringDecoder = require("string_decoder").StringDecoder;
const router = require("./lib/router");
const fs = require('fs');
const path = require('path');

const server = (req, res) => {
  const method = req.method;
  const headers = req.headers;
  let parsedUrl = url.parse(req.url, true);
  const reqPath = parsedUrl.pathname.replace(/^\/+|\/+$/, "");
  const queryObj = parsedUrl.query;

  let payload = "";
  const stringDecoder = new StringDecoder("utf8");
  req.on("data", chunk => {
    payload += stringDecoder.write(chunk);
  });
  req.on("end", () => {
    payload += stringDecoder.end();

    payload =
      typeof payload === "string" && payload.trim().length > 0
        ? JSON.parse(payload)
        : {};

    let reqPayload = { method, headers, reqPath, queryObj, payload };

    const choosenHandler =
      typeof(router[reqPath]) === "function" ? router[reqPath] : undefined;

    if (choosenHandler) {
      choosenHandler(reqPayload, (statusCode, resPayload, headers) => {
        resPayload =
          typeof resPayload === "object" ? JSON.stringify(resPayload) : "{}";
        statusCode = typeof statusCode !== "undefined" ? statusCode : 200;
        headers = typeof headers === "object" ? headers : {};

        res.writeHead(statusCode, {
          ...headers
        });
        res.end(resPayload);
      });
    } else {
      // Serve Files or return 404 if path wasn't not found
      router["handleFiles"](reqPayload, res);
    }
  });
};

const httpServer = http.createServer(server).listen(8080, "localhost", () => {
  console.log("Server started at http://localhost:8080");
});

const httpsServer = https.createServer({
    key: fs.readFileSync(path.resolve(__dirname, 'private', 'key.pem')),
    cert: fs.readFileSync(path.resolve(__dirname, 'private', 'cert.pem'))
}, server).listen(9090, 'localhost', ()=>console.log(`Secure Server started at https://localhost:9090`));
