//var socket = io.connect('https://semanpoly.herokuapp.com', { 'forceNew': true });
var socket = io.connect('http://localhost:8080', { 'forceNew': true });

socket.on("game-update", (game) => {
    console.log(game);
    renderGame(game)
});

function renderGame(game) {
    for (i = 0; i < game.jugadores.length; i++) {
        var jugador = game.jugadores[i];
        console.log(jugador);
        //Elimina posicion anterior
        $(`#jugador${jugador.id}`).remove();
        //Poner posicion
        $(`#cell${jugador.posicion}`).append(`<div id="jugador${jugador.id}" class="token" style="background: ${jugador.color}"></div>`)
    }
}

function play() {
    rollDice();
}

function Iniciar() {
    var nick = $("#Nick").val();
    if (nick.length >= 3 && nick.length <= 10) {
        $('#Contenedor-Inicio').hide('slow');
        $('#Contenedor-Juego').show('slow');
    } else {
        
    }
}
//Iniciar();