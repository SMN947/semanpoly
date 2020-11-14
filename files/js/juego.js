//Pone Textos
$(".title, #Logo").html(textos.nombre);
$(".desc").html(textos.eslogan);
$("#roll-button").html(textos.roll_dice);
$(".sendAnswer").html(textos.sendanswer)
$("#goSettings").html(textos.settings);
$(".BtnSaveSettings").html(textos.token_name)
$("#NameInputLabel").html(textos.input_nickname);
var sktid = '';
var firstTime = true;
var admin = false;

var socket = io.connect('https://semanpoly.herokuapp.com', { 'forceNew': true });
//var socket = io.connect('http://localhost:8080', { 'forceNew': true });

socket.on("handshake", (id) => {
    sktid = id;
});
socket.on("Registrado", (game) => {
    $("#Settings").hide();
    $("#goSettings").html(textos.waiting_for_host);
});

socket.on("game-update", (game) => {
    //console.clear();
    console.log("GameUpdate")
    console.log(game);
    renderGame(game)
});
socket.on("YouReAdmin", (data) => {
    alert(textos.admin);
    admin = true;
});
socket.on("start", (game) => {
    if (game.owner == sktid) {
        socket.emit("StartGame", "");
        $('#Contenedor-Inicio').hide('slow');
        $('#Contenedor-Juego').show('slow');
    } else {
        console.log(textos.waiting_for_host)
    }
});
socket.on("GameStarted",(game) => {
    if (game.owner != sktid) {
        $('#Contenedor-Inicio').hide('slow');
        $('#Contenedor-Juego').show('slow');
    }
});
socket.on("OptWasClicked", (data) => {
    if (data[0].jugadorActual != sktid) {
        for (i = 0; i < 3;i++){
            //checked
            $(`#opt${i}`).removeAttr("checked");
        }
        $(`#answer${data[1]}`).attr( "checked", true );
    }
})
socket.on("DiceRolled", (data) => {
    const dice = [...document.querySelectorAll(".die-list")];
    var dieVal = 0;
    dice.forEach((die) => {
        toggleClasses(die);
        die.dataset.roll = data[dieVal++];//getRandomNumber(1, 6);
        console.log(die.dataset);
        //console.log(game.dados);
    });
});
socket.on("AnswerVal", (data) => {
    $(".ValidationHolder").show();
    $(".questionHolder").hide();
    if (data[0]) {
        $("#ValidationHolderresultado").addClass("success");
        $("#ValidationHolderresultado").removeClass("error");
        $("#ValidationHolderresultado").html(textos.answer_ok);
    } else {
        $("#ValidationHolderresultado").removeClass("success");
        $("#ValidationHolderresultado").addClass("error");
        $("#ValidationHolderresultado").html(textos.answer_wrong);
    }
    if (data[1].jugadorActual != sktid) {
        $(".nextBTN").hide();
    } else {
        $(".nextBTN").show();
    }
    console.log(data[1].jugadores);
    var rank = '';
    for (const jugador in data[1].jugadores) {
        if (data[1].jugadores.hasOwnProperty(jugador)) {
            if (data[1].owner != data[1].jugadores[jugador].id) {
                const jug = data[1].jugadores[jugador];
                rank += `<li>${jug.nombre} - ${jug.puntos} points</li>`
            }
        }
    }
    $("#Ranking").html(rank)
    //
});
socket.on("nextPlayer", (data) => {
    $(".ValidationHolder").hide();
});
socket.on("player-disconected", (data) => {
    $(`#jugador${data}`).remove();
});
socket.on("pregame-update", (game) => {
    console.log(game.jugadores);
    var html = '';
    for (const key in game.jugadores) {
        if (game.jugadores.hasOwnProperty(key)) {
            const jugador = game.jugadores[key];
            var checked = (jugador.habilitado) ? 'checked' : "";
            html += `<li><input type="checkbox" onchange="PlayerStatusUpdated('${jugador.id}')" ${checked}><img src="./images/${jugador.token}.jpg" class="ControlToken" alt=""> - ${jugador.nombre}</li>`;
        }
    }
    $("#ListaJugadoresControl").html(html);
});
function SavePlayersHabilitados() {
    $("#PlayersControl").hide()
}
function PlayerStatusUpdated(id) {
    socket.emit("Changeplayerstatus", id);
}
function nameAlreadyUsed(name) {
    alert(textos.name_already_taken.replace("$$", name));
}
function SiguienteJugador() {
    socket.emit("SiguienteJugador");
    $(".ValidationHolder").show();
}
var esEspecial = null;
function renderGame(game) {
    $("#CurrentTurn").html(game.jugadores[game.jugadorActual].nombre)
    esEspecial = game;
    for (const key in game.jugadores) {
        if (game.jugadores.hasOwnProperty(key)) {
            const jugador = game.jugadores[key];
            if (jugador.id != game.owner) {
                $(`#jugador${jugador.id}`).remove();
                $(`#cell${jugador.posicion}`).append(`<div id="jugador${jugador.id}" class="token" style="background:url(./images/${jugador.token}.jpg)"></div>`)
            }
        }
    }
    if (game.question != null) {
        $("#tema").html(game.topic);
        $("#question").html(game.question);
        var tema = game.topic;
        if (tema != 'Turn Loose'&&tema != 'Free Parking' && tema != 'Random Question Land' && tema != 'GO') {
            var options = `<label onclick="OptClicked(1)"><input type="radio" name="answer" id="answer1" value="0">A - <span id="opt1">Opcion 1</span></label><br>
            <label onclick="OptClicked(2)"><input type="radio" name="answer" id="answer2" value="1">B - <span id="opt2">Opcion 2</span></label><br>
            <label onclick="OptClicked(3)"><input type="radio" name="answer" id="answer3" value="2">C - <span id="opt3">Opcion 3</span></label><br>`;
            $("#OptionsHOlder").html(options);
            for (i = 1; i <= game.respuestas.length; i++) {
                console.log(game.respuestas);
                console.log(i);
                console.log(game.respuestas[i]);
                $(`#opt${i}`).html(game.respuestas[i-1]);
            }
            $(".questionHolder").show();
            $("#Qholder").css("height", `calc((100% - ${$("#optHolder").height()}px) - 8.2vw)`);
            $(".sendAnswer").html(textos.sendanswer)
        } else {
            
            $(".sendAnswer").html('NEXT')
            $("#tema").html(game.topic);
            $("#question").html(game.question);
            $("#OptionsHOlder").html('');
            
            $(".questionHolder").show();
        }
    } else {
        $(".questionHolder").hide();
    }
    console.log(game, sktid);
    if (game.jugadorActual == sktid) {
        if (game.question == null) {
            $("#roll-button").show();
            $(".sendAnswer").hide();
        } else {
            $("#roll-button").hide();
            $(".sendAnswer").show();
        }
    } else {
        $("#roll-button").hide();
        $(".sendAnswer").hide();
    }
}
function sendAnswer() {
    var game = esEspecial;
    var tema = game.topic;
    if (tema != 'Turn Loose'&&tema != 'Free Parking' && tema != 'Random Question Land' && tema != 'GO') {
        var radioValue = $("input[name='answer']:checked").val();
        if (radioValue) {
            socket.emit("Answered", radioValue);
        } else {
            alert(textos.option_required);
        }
    } else {
        socket.emit("SiguienteJugador");
        
        $(".questionHolder").hide();
    }
}
function OptClicked(val) {
    socket.emit("OptClicked", val)
}

var token = null;
var nickname = null;
function Token(tkn) {
    if (token != null) {
        $(`#OK${token}`).hide();
    }
    $(`#OK${tkn}`).show();
    token = tkn;
}

function OpenSettings() {
    if (token == null && nickname == null) {
        $("#Settings").show();
    } else {
        if (admin) {
            $("#PlayersControl").show();
        }
    }
}
function SaveNameToken() {
    
    var this_token = '';
    
    var nick = $("#Nick").val();
    if (nick.length >= 3 && nick.length <= 10) {
        if (token != null) {
            socket.emit("IAmAdmin", "");
            socket.emit("registro", [nick, token]);
        } else {
            alert(textos.token_empty);
        }
    } else {
        alert(textos.wrong_nickname);
    }
}
function Iniciar() {
    socket.emit("IAmAdmin", "");
    if (admin) {
        socket.emit("Iniciarjuego", "")
        //io.to(socket.id).emit("start", game);
    } else {
        alert(textos.not_host)
    }
}

var adminCount = 0;
function Admin() {
    adminCount++
    if (adminCount >= 4) {
        socket.emit("IAmAdmin", "");
    }
}

function RollDice() {
    socket.emit("RollDice", sktid);
}
  
  function toggleClasses(die) {
    die.classList.toggle("odd-roll");
    die.classList.toggle("even-roll");
}
  
function ShowTutorial() {
    $("#Tutorial").show(1000);
}

function HideTutorial() {
    $("#page-1").click();
    setTimeout(() => {
        $("#Tutorial").hide(1000)
    }, 300);
}
