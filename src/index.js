const WebSocket = require('ws');
var wss = new WebSocket.Server({ port: 8080 });
console.log("Running On Port 8080");
wss.on('connection', function connection(ws) {
  console.log("New Connection");
  ws.on('message', function incoming(message) {
    console.log(message);
    ws.send(message);
  });
});
