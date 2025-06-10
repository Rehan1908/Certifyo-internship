import http from "http"

const server = http.createServer((req,res) => {
  res.setHeader("Content-Type", 'application/json');
  if (req.method === "GET" && req.url === '/') {
    res.writeHead(200);
    res.end (JSON.stringify ({
      message: "Welcome to the HomePage"
    }))
  }
  else if (req.method === "GET" && req.url === "/about") {
    res.writeHead(200);
    res.end (JSON.stringify ({
      message: "This is a basic Node Js server"
    }))
  }
  else if (req.method === "POST" && req.url === "/echo") {
    let body = "";
    req.on ("data", chunk => {
      body = body + chunk.toString();
    })
    req.on("end", () => {
      res.writeHead(200);
      res.end (JSON.stringify({
        message: "Data recieved Successfully",
        yourData : body
      }))
    })
  }
  else {
    res.writeHead (404);
    res.end (JSON.stringify({
      error:"Not Found"
    }))
  }
})
server.listen(3000, () => {
  console.log ("server running on http://localhost:3000");
})

fetch ("http://localhost:3000/echo", {
  method: "POST",
  body: JSON.stringify({
    name : "Rehan"
  })
}).then(res => res.json()).then(data => console.log (data))