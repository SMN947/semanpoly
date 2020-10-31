var socket = io.connect('https://semanpoly.herokuapp.com', { 'forceNew': true });
//var socket = io.connect('http://localhost:8080', { 'forceNew': true });
var PlayersCount = 0;
var latestPlayers;

socket.on('messages', function(data) {
  console.log(data);
    var html = data.map(function(elem, index) {
        return(`<div>
            <strong>${elem.author}</strong> at 
            <i>${elem.time}</i>:
            <em>${elem.text}</em>
            </div>`);
    }).join(" ");
    
    var elem = document.getElementById('messages');
    //elem.innerHTML = html;
    //elem.scrollTop = elem.scrollHeight;
})

//readyPlayers
//conectedPlayesr
socket.on('conected', (data) => {
  //console.log(data)
  latestPlayers = data;
  PlayersCount = 0;
  ConnectedCount = 0;
  var html = '';
  for (const skt in data) {
    if (data.hasOwnProperty(skt)) {
      ConnectedCount++;
      var el = data[skt];
      if (data[skt].isReady) {
        PlayersCount++;
        html += `<tr><td>${el.name}</td><td><input type="color" value="${el.color}"></td><td>${el.time}</td></tr>`;
      }
      //console.log(data[skt]);
    }
  }
  $('#ListConectados').html(html);
  $("#conectedPlayesr").html(ConnectedCount)
  $("#readyPlayers").html(PlayersCount)
})


function addMessage(e) {
  var message = {
    author: $('#MyName').val(),
    text: document.getElementById('texto').value,
  };

  socket.emit('new-message', message);
  return false;
}

function Conect() {
  if ($('#MyName').val().length >= 3 || $('#MyName').val().length <= 10) {
    var message = {
      isReady: true,
      name: $('#MyName').val(),
      color: $('#MyColor').val()
    };
    $('#ConectBTN').prop('disabled', true);
    $('#MyName').prop('disabled', true);
    
    socket.emit('new-conected', message);
    return false;
  } else {
    alert('Your name must be between 3 and 10 chars length');
  }
  
}