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
    }
  }
  $('#ListConectados').html(html);
  $("#conectedPlayesr").html(ConnectedCount)
  $("#readyPlayers").html(PlayersCount)
})

function Conect() {
  if ($('#MyName').val().length != '' && ($('#MyName').val().length >= 3 && $('#MyName').val().length <= 10)) {
    var message = {
      isReady: true,
      name: $('#MyName').val(),
      color: $('#MyColor').val()
    };
    console.log(message)
    $('#ConectBTN').prop('disabled', true);
    $('#MyName').prop('disabled', true);
    
    socket.emit('new-conected', message);
    return false;
  } else {
    alert('Your name must be between 3 and 10 chars length');
  }
  
}