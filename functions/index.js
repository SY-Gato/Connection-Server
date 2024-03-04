/*const WebSocket = require('ws');
var wss = new WebSocket.Server({ port: 8080 });
console.log("Running On Port 8080");
wss.on('connection', function connection(ws) {
  console.log("New Connection");
  ws.on('message', function incoming(message) {
    console.log(message);
    ws.send(message);
  });
});*/
var WebSocketServer = require('ws').Server
  , http = require('http')
  , express = require('express')
  , app = express();

app.use(express.static(__dirname + '/public'));

var server = http.createServer(app);
server.listen(8080);

var wss = new WebSocketServer({server: server});
wss.on('connection', function(ws) {
  console.log("New Connection");
  var id = setInterval(function() {
    ws.send(JSON.stringify(process.memoryUsage()), 
      function() { /* ignore errors */ });
  }, 100);
  ws.on('close', function() {
    console.log("Connection Closed");
    clearInterval(id);
  });
});
