var express = require('express');
const { connected } = require('process');
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


var skts = {
    'bot': {
        isReady: true,
        name: 'BOT1',
        time: new Date().toLocaleTimeString(),
        color: '#ff00aa'
    }
};

app.use(express.static('files'));

io.on('connection', function (socket) {
    skts[socket.id] = {
        isReady: false,
    }
    console.log('Alguien se ha conectado con Sockets');
    socket.emit('messages', messages);
    socket.emit('conected', skts);

    socket.on('new-conected', (data) => {
        data['time'] = new Date().toLocaleTimeString();
        skts[socket.id] = data;
        io.sockets.emit('conected', skts);
    });

    socket.on('new-message', function (data) {
        data['time'] = new Date().toLocaleTimeString();
        messages.push(data);
        io.sockets.emit('messages', messages);
    });

    socket.on('disconnect', (data) => {
        console.log(skts[socket.id].name + ' se desconecto')
        console.log(JSON.stringify(skts));
        delete skts[socket.id];
        console.log(JSON.stringify(skts));
        io.sockets.emit('conected', skts);
    });
});

server.listen(port, function() {
  console.log("Servidor corriendo en http://localhost:8080");
});