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
/*exports.handler = function(event, context) {
var WebSocketServer = require('ws').Server
  , http = require('http');

var server = http.createServer();
server.listen(8080);

var wss = new WebSocketServer({server: server});
wss.on('connection', function(ws) {
  console.log("New Connection");
  var id = setInterval(function() {
    ws.send(JSON.stringify(process.memoryUsage()), 
      function() { /* ignore errors */// });
  /*}, 100);
  ws.on('close', function() {
    console.log("Connection Closed");
    clearInterval(id);
  });
});
};*/

exports.handler = function(event2, context) {
const ws = new require('ws');
const wss = new ws.Server({noServer: true});

const clients = new Set();

http.createServer((req, res) => {
  // here we only handle websocket connections
  // in real project we'd have some other code here to handle non-websocket requests
  wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onSocketConnect);
});

function onSocketConnect(ws) {
  clients.add(ws);

  ws.on('message', function(message) {
    message = message.slice(0, 50); // max message length will be 50

    for(let client of clients) {
      client.send(message);
    }
  });

  ws.on('close', function() {
    clients.delete(ws);
  });
}
};
