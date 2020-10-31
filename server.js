const express = require('express')
const port = 80;
const app = express()
const http = require("http").Server(app);
var io = require('socket.io')(http);
var socketUsers = require('socket.io.users');
const path = require('path');

app.use(express.static(path.join(__dirname, '/files/index.html')));

var serverData = {};

app.listen(port, function () {
    console.log(properties.ENV, ': Listening on port', port, '- start:', Date(Date.now()).toString());
});

io.on('connection', function (socket) {
    socket.emit('serverData', serverData);
    socket.on('new-user', (data) => {
        serverData[socket.id] = data;
        io.sockets.emit('serverData', serverData);
    });

    socket.on("disconnect", () => {
        delete serverData[socket.id]
        io.sockets.emit('serverData', serverData);
        delete serverData[socket.id];
    });
});
