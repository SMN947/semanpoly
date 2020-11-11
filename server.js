var express = require('express');
const { connected, emit } = require('process');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const port = process.env.PORT || 8080

app.use(express.static('files'));

//Juego
var game = {
    jugadores: {},
    dados: [1, 1],
    jugadorActual: null,
    isActive: false,
    owner: '',
    topic: null,
    question: null,
    questionid: null,
    respuestas: null,
    ordenJugadores: [],
    dado1: null,
    dado2: null
}
var celdas = {
    1:"GO",
    2:"Semantics and pragmatics",
    3:"Language and its characteristics",
    4:"Grammaticality and acceptability",
    5:"Word formation",
    6:"Word collocation",
    7:"Chance",
    8:"Word function",
    9:"Nouns",
    10:"Adjectives",
    11:"ESPECIAL",
    12:"Adverbs",
    13:"Verbs",
    14:"Simple sentences",
    15:"Chance",
    16:"Compound sentences",
    17:"Complex sentences",
    18:"ESPECIAL",
    19:"Semantics and pragmatics",
    20:"Language and its characteristics",
    21:"Grammaticality and acceptability",
    22:"Word formation",
    23:"Word collocation",
    24:"Chance",
    25:"Word function",
    26:"Nouns",
    27:"Adjectives",
    28:"ESPECIAL",
    29:"Adverbs",
    30:"Verbs",
    31:"Simple sentences",
    32:"Chance",
    33:"Compound sentences",
    34:"Complex sentences"
}
var preguntas = {
    "Semantics and pragmatics": [
        {
            "pregunta": "Semantics is:",
            "respuestas": [
                {
                    "respuesta": "The study of the word.",
                    "correcta": false
                },{
                    "respuesta": "The study of meaning.",
                    "correcta": true
                },{
                    "respuesta": "The study of the human body.",
                    "correcta": false
                }
            ]
        },{
            "pregunta": "We use an ___ to express an idea or a feeling in spoken words.",
            "respuestas": [
                {
                    "respuesta": "Adjective",
                    "correcta": false
                },{
                    "respuesta": "Verb",
                    "correcta": false
                },{
                    "respuesta": "Utterance",
                    "correcta": true
                }
            ]
        },{
            "pregunta": "What type of word is best classified using semantic features?",
            "respuestas": [
                {
                    "respuesta": "Noun",
                    "correcta": true
                },{
                    "respuesta": "Common",
                    "correcta": false
                },{
                    "respuesta": "Verb",
                    "correcta": false
                }
            ]
        },{
            "pregunta": "What is the diference between semantics and pragmatic?",
            "respuestas": [
                {
                    "respuesta": "Semantics is the study of the context and pragmatic is the study of the words",
                    "correcta": false
                },{
                    "respuesta": "Semantics is the study of meanings and pragmatic is the study of the way context can be influence our knowledge of linguistics",
                    "correcta": true
                },{
                    "respuesta": "Semantics is the study of vocabulary and pragmatic is the study of the way context can be influence our knowledge of the life",
                    "correcta": false
                }
            ]
        }
    ],
    "tema": [
        {
            "pregunta": "pregunta",
            "respuestas": [
                {
                    "respuesta": "algo",
                    "correcta": true
                },{
                    "respuesta": "Verde",
                    "correcta": false
                },{
                    "respuesta": "Rojo",
                    "correcta": false
                }
            ]
        },{
            "pregunta": "pregunta",
            "respuestas": [
                {
                    "respuesta": "algo",
                    "correcta": true
                },{
                    "respuesta": "Verde",
                    "correcta": false
                },{
                    "respuesta": "Rojo",
                    "correcta": false
                }
            ]
        },{
            "pregunta": "pregunta",
            "respuestas": [
                {
                    "respuesta": "algo",
                    "correcta": true
                },{
                    "respuesta": "Verde",
                    "correcta": false
                },{
                    "respuesta": "Rojo",
                    "correcta": false
                }
            ]
        },{
            "pregunta": "pregunta",
            "respuestas": [
                {
                    "respuesta": "algo",
                    "correcta": true
                },{
                    "respuesta": "Verde",
                    "correcta": false
                },{
                    "respuesta": "Rojo",
                    "correcta": false
                }
            ]
        }
    ]
}

function jugador(id, nombre, token, puntos = 0, posicion = 1, correctas = 0, erroneas = 0, color = getRandomColor()) {
    this.id = id;
    this.nombre = nombre;
    this.token = token;
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

function getRandomNumber(min = 1, max = 6) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

io.on('connection', function (socket) {
    console.log("con: " + socket.id);
    io.to(socket.id).emit("handshake", socket.id);
    socket.on("IAmAdmin", (data) => {
        game.owner = socket.id;
        io.to(socket.id).emit("YouReAdmin", "true")
    });
    socket.on("registro", (data) => {
        console.log("New Player");
        if (!game.isActive) {
            game.jugadores[socket.id] = new jugador(socket.id, data[0], data[1]);
            game.ordenJugadores.push(socket.id);
            io.to(socket.id).emit("Registrado", game);
            io.sockets.emit('pregame-update', game);
        }
    });

    socket.on("Iniciarjuego", (data) => {
        io.to(socket.id).emit("start", game);
    });

    socket.on("StartGame", (data) => {
        game.jugadorActual = game.owner;
        var next = (game.ordenJugadores).findIndex((el) => el === game.jugadorActual);
        game.jugadorActual = game.ordenJugadores[((++next > game.ordenJugadores.length - 1) ? 0 : next)];
        io.sockets.emit("GameStarted", game);
        io.sockets.emit('game-update', game);
    });
    socket.on("RollDice", (id) => {
        if (id == game.jugadorActual) {
            var die1 = getRandomNumber();
            var die2 = getRandomNumber();
            CurrentPlayer("diceRolled", die1, die2);
            io.sockets.emit("DiceRolled", [die1, die2]);
            setTimeout(() => {
                io.sockets.emit('game-update', game);
            }, 1500);
        }
    });
    socket.on("OptClicked", (val) => {
        io.sockets.emit("OptWasClicked", [game, val]);
    });
    socket.on("Answered", (val) => {
        var validacion = preguntas[game.topic][game.questionid].respuestas[val].correcta;
        if (validacion) {
            console.log(game.jugadores[socket.id].puntos);
            game.jugadores[socket.id].puntos += 50;
            console.log(game.jugadores[socket.id].puntos);
        }
        io.sockets.emit("AnswerVal", [validacion, game]);
    });
    socket.on("SiguienteJugador", (x) => {
        //Checa si es par PASA LUEGO DE LA RESPUESTA
        if (game.dado1 != game.dado2) {
            var next = (game.ordenJugadores).findIndex((el) => el === game.jugadorActual);
            game.jugadorActual = game.ordenJugadores[((++next > game.ordenJugadores.length - 1) ? 0 : next)];
            if (game.jugadorActual == game.owner) {
                console.log("Admin No juega, siguiente");
                var next = (game.ordenJugadores).findIndex((el) => el === game.jugadorActual);
                game.jugadorActual = game.ordenJugadores[((++next > game.ordenJugadores.length - 1) ? 0 : next)];
            }
            game.question = null;
            io.sockets.emit('nextPlayer', "");
            io.sockets.emit('game-update', game);
        } else {
            game.question = null;
            io.sockets.emit('nextPlayer', "");
            io.sockets.emit('game-update', game);
        }
    });
    //socket.emit('game-update', game);
    socket.on('disconnect', (data) => {
        console.log("des: " + socket.id)
        //console.log(skts[socket.id].name + ' se desconecto')
        //console.log(JSON.stringify(skts));
        delete game.jugadores[socket.id];
        var temp = []
        for (i = 0; i < game.ordenJugadores.length; i++) {
            if (game.ordenJugadores[i] != socket.id) {
                temp.push(game.ordenJugadores[i]);
            }
        }
        game.ordenJugadores = temp;
        io.sockets.emit('game-update', game);
        io.sockets.emit('player-disconected', socket.id);
        //console.log(JSON.stringify(skts));
        //io.sockets.emit('conected', skts);
    });
});

function CurrentPlayer(action, valor1, valor2) {
    switch (action) {
        case "diceRolled":
            game.jugadores[game.jugadorActual].posicion += (valor1 + valor2);
            //Revisa que no se pase del tablero
            if (game.jugadores[game.jugadorActual].posicion > 34) {
                game.jugadores[game.jugadorActual].posicion = game.jugadores[game.jugadorActual].posicion - 34;
            }
            game.dado1 = valor1;
            game.dado2 = valor2;
            //Manda pregunta
            GetQuestion();
            break;
    
        default:
            break;
    }
}
function GetQuestion(tema = "tema1") {
    var id = getRandomNumber(0, preguntas[tema].length - 1);
    var preg = preguntas[tema][id].pregunta;
    console.log(preg);
    game.topic = tema;
    game.question = preg;
    game.questionid = id;
    game.respuestas = preguntas[tema][id].respuestas.map((el) => {
        return el.respuesta;
    });
}

server.listen(port, function () {
  console.log("Servidor corriendo en http://localhost:8080");
});