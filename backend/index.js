const http = require('http');
const ReqRes = require("./ReqRes");

// Create a local server to receive data from
const server = http.createServer(ReqRes);

server.listen(5000, ()=>{
    console.log("esta activo el servidor http://localhost:5000/");
});