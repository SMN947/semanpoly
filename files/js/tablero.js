var tablero = [
    [
      { id: 18, cs: 1, rs: 1},
      { id: 19, cs: 1, rs: 1},
      { id: 20, cs: 1, rs: 1},
      { id: 21, cs: 1, rs: 1},
      { id: 22, cs: 1, rs: 1},
      { id: 23, cs: 1, rs: 1},
      { id: 24, cs: 1, rs: 1},
      { id: 25, cs: 1, rs: 1},
      { id: 26, cs: 1, rs: 1},
      { id: 27, cs: 1, rs: 1},
      { id: 28, cs: 1, rs: 1}
    ],
    [
      { id: 17, cs: 1, rs: 1},
      { id: 0, cs: 9, rs: 6},
      { id: 29, cs: 1, rs: 1},
    ],
    [
      { id: 16, cs: 1, rs: 1},
      { id: 30, cs: 1, rs: 1},
    ],
    [
      { id: 15, cs: 1, rs: 1},
      { id: 31, cs: 1, rs: 1},
    ],
    [
      { id: 14, cs: 1, rs: 1},
      { id: 32, cs: 1, rs: 1},
    ],
    [
      { id: 13, cs: 1, rs: 1},
      { id: 33, cs: 1, rs: 1},
    ],
    [
      { id: 12, cs: 1, rs: 1},
      { id: 34, cs: 1, rs: 1},
    ],
    [
      { id: 11, cs: 1, rs: 1},
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
  
var celdas = {
  1:{topic :"GO",position: "bottom"},
  2:{topic :"Semantics and pragmatics",position: "bottom"},
  3:{topic :"Language and its characteristics",position: "bottom"},
  4:{topic :"Grammaticality and acceptability",position: "bottom"},
  5:{topic :"Word formation",position: "bottom"},
  6:{topic :"Word collocation",position: "bottom"},
  7:{topic :"Random Question Land",position: "bottom"},
  8:{topic :"Word function",position: "bottom"},
  9:{topic :"Nouns",position: "bottom"},
  10:{topic :"Adjectives",position: "bottom"},
  11:{topic :"Free Parking",position: "left"},
  12:{topic :"Adverbs",position: "left"},
  13:{topic :"Verbs",position: "left"},
  14:{topic :"Simple sentences",position: "left"},
  15:{topic :"Random Question Land",position: "left"},
  16:{topic :"Compound sentences",position: "left"},
  17:{topic :"Complex sentences",position: "left"},
  18:{topic :"Turn Loose",position: "left"},
  19:{topic :"Semantics and pragmatics",position: "top"},
  20:{topic :"Language and its characteristics",position: "top"},
  21:{topic :"Grammaticality and acceptability",position: "top"},
  22:{topic :"Word formation",position: "top"},
  23:{topic :"Word collocation",position: "top"},
  24:{topic :"Random Question Land",position: "top"},
  25:{topic :"Word function",position: "top"},
  26:{topic :"Nouns",position: "top"},
  27:{topic :"Adjectives",position: "top"},
  28:{topic :"Free Parking",position: "right"},
  29:{topic :"Adverbs",position: "right"},
  30:{topic :"Verbs",position: "right"},
  31:{topic :"Simple sentences",position: "right"},
  32:{topic :"Chance",position: "right"},
  33:{topic :"Compound sentences",position: "right"},
  34:{topic :"Complex sentences",position: "right"},
}
  var tab = $("#tablero");
  
  for (a = 0; a < tablero.length; a++) {
    var tr = "<tr>";
    for(b=0;b<tablero[a].length;b++) {
      var c = tablero[a][b];
      tr += ` <td id="cell${c.id}" colspan="${c.cs}" rowspan="${c.rs}">`;
      if (c.id != 0) {
        tr += `<span id="CellTopic" class="Topicsdasdasdads${celdas[c.id].position}">${celdas[c.id].topic}</span>`;
      }
      tr +=`</td>`;
    }
    tr += "</tr>";
    tab.append(tr);
  }
$('#cell0').append($('#contenido-centro'));