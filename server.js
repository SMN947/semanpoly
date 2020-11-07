var express = require('express');
const { connected } = require('process');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const port = process.env.PORT || 8080

app.use(express.static('files'));

//Juego
var game = {
    jugadores: [
        new jugador("1", "SMN", 0, 1, 0, 0),
        new jugador("2", "SMN1"),
        new jugador("3", "SMN2"),
        new jugador("4", "SMN3")
    ],
    dados: [1, 1],
    jugadorActual: 0
}

function jugador(id, nombre = 'Visitor', puntos = 0, posicion = 1, correctas = 0, erroneas = 0, color = getRandomColor()) {
    this.id = id;
    this.nombre = nombre;
    this.puntos = puntos;
    this.posicion = posicion;
    this.correctas = correctas;
    this.erroneas = erroneas;
    this.color = color;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function pregunta(tema, pregunta, opciones, contestada = false, puntos = 5) {
    this.tema = tema;
    this.pregunta = pregunta;
    this.opciones = opciones;
    this.contestada = contestada;
    this.puntos = puntos;
}

io.on('connection', function (socket) {
    //socket.emit('game-update', game);
    socket.on('disconnect', (data) => {
        //console.log(skts[socket.id].name + ' se desconecto')
        //console.log(JSON.stringify(skts));
       // delete skts[socket.id];
        //console.log(JSON.stringify(skts));
        //io.sockets.emit('conected', skts);
    });
});

server.listen(port, function() {
  console.log("Servidor corriendo en http://localhost:8080");
});