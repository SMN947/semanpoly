var socket = io.connect('https:semanpoly.herokuapp.com', { 'forceNew': true });
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

socket.on('conected', (data) => {
  latestPlayers = data;
  PlayersCount = data.length;
    var html = data.map((el, i) => {
        return `<tr><td>${el.name}</td><td><input type="color" value="${el.color}"></td><td>${el.time}</td></tr>`;
    });
    console.log(html);
    $('#ListConectados').html(html);
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
    var message = {
      name: $('#MyName').val(),
      color: $('#MyColor').val()
    };
    $('#ConectBTN').prop('disabled', true);
    $('#MyName').prop('disabled', true);
    
      socket.emit('new-conected', message);
      return false;
}