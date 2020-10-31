var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const port = process.env.PORT || 8080

var messages = [{
    id: 1,
    time: new Date().toLocaleTimeString(),
    text: "Chat with your playmates :D",
    author: "BOT"
}];
var conected = [{
    name: 'BOT',
    time: new Date().toLocaleTimeString(),
    color: '#fdfdfd'
}]

app.use(express.static('files'));

io.on('connection', function(socket) {
    console.log('Alguien se ha conectado con Sockets');
    socket.emit('messages', messages);
    socket.emit('conected', conected);

    socket.on('new-conected', (data) => {
        data['time'] = new Date().toLocaleTimeString();
        conected.push(data);
        io.sockets.emit('conected', conected);
    });

    socket.on('new-message', function (data) {
        data['time'] = new Date().toLocaleTimeString();
        messages.push(data);
        io.sockets.emit('messages', messages);
    });
});

server.listen(port, function() {
  console.log("Servidor corriendo en http://localhost:8080");
});