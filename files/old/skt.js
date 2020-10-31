var socket = io.connect('http://localhost:8080', { 'forceNew': true });

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
    var html = data.map((el) => {
        return `<li>${el.name} - ${el.time}</li>`;
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
        name: $('#MyName').val()
    };
    $('#ConectBTN').prop('disabled', true);
    $('#MyName').prop('disabled', true);
    
      socket.emit('new-conected', message);
      return false;
}