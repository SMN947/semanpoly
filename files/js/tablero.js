var tablero = [
    [
      { id: 16, cs: 1, rs: 1},
      { id: 17, cs: 1, rs: 1},
      { id: 18, cs: 1, rs: 1},
      { id: 19, cs: 1, rs: 1},
      { id: 20, cs: 1, rs: 1},
      { id: 21, cs: 1, rs: 1},
      { id: 22, cs: 1, rs: 1},
      { id: 23, cs: 1, rs: 1},
      { id: 24, cs: 1, rs: 1},
      { id: 25, cs: 1, rs: 1}
    ],
    [
      { id: 15, cs: 1, rs: 1},
      { id: 0, cs: 8, rs: 5},
      { id: 26, cs: 1, rs: 1},
    ],
    [
      { id: 14, cs: 1, rs: 1},
      { id: 27, cs: 1, rs: 1},
    ],
    [
      { id: 13, cs: 1, rs: 1},
      { id: 28, cs: 1, rs: 1},
    ],
    [
      { id: 12, cs: 1, rs: 1},
      { id: 29, cs: 1, rs: 1},
    ],
    [
      { id: 11, cs: 1, rs: 1},
      { id: 30, cs: 1, rs: 1},
    ],
    [
      { id: 10, cs: 1, rs: 1},
      { id: 9, cs: 1, rs: 1},
      { id: 8, cs: 1, rs: 1},
      { id: 7, cs: 1, rs: 1},
      { id: 6, cs: 1, rs: 1},
      { id: 5, cs: 1, rs: 1},
      { id: 4, cs: 1, rs: 1},
      { id: 3, cs: 1, rs: 1},
      { id: 2, cs: 1, rs: 1},
      { id: 1, cs: 1, rs: 1}
    ]
  ];
  var tab = $("#tablero");
  
  for (a = 0; a < tablero.length; a++) {
    var tr = "<tr>";
    for(b=0;b<tablero[a].length;b++) {
      var c = tablero[a][b];
        tr += ` <td id="cell${c.id}" colspan="${c.cs}" rowspan="${c.rs}">
                </td>`;
    }
    tr += "</tr>";
    tab.append(tr);
  }
$('#cell0').append($('#contenido-centro'));