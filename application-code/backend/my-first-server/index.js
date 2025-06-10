import http from "http";
import adtwonumbers from "./add.js";

const server = http.createServer((req, res) => {
  res.writeHead(200, {"content-type" : ""});
  const result = adtwonumbers (5,7)
  res.end(`Hello, welcome to my first node.js server 5 + 7 = ${result}`)
});

server.listen(3000, () => {
  console.log ("server is running at http://localhost:3000 ")
});