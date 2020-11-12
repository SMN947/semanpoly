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
    especial: null,
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
    7:"Random Question Land",
    8:"Word function",
    9:"Nouns",
    10:"Adjectives",
    11:"Free Parking",
    12:"Adverbs",
    13:"Verbs",
    14:"Simple sentences",
    15:"Random Question Land",
    16:"Compound sentences",
    17:"Complex sentences",
    18:"Turn Loose",
    19:"Semantics and pragmatics",
    20:"Language and its characteristics",
    21:"Grammaticality and acceptability",
    22:"Word formation",
    23:"Word collocation",
    24:"Random Question Land",
    25:"Word function",
    26:"Nouns",
    27:"Adjectives",
    28:"Free Parking",
    29:"Adverbs",
    30:"Verbs",
    31:"Simple sentences",
    32:"Random Question Land",
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
            "pregunta": "We use an _ to express an idea or a feeling in spoken words.",
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
    "Language and its characteristics": [
        {
            "pregunta": "What is a language?",
            "respuestas": [
                {
                    "respuesta": "Is a structured system of communication.",
                    "correcta": false
                },{
                    "respuesta": "It is the primary way in which we gain information  about the world around us.",
                    "correcta": true
                },{
                    "respuesta": "Is the act of conveying meanings from one entity or group to another through the use of mutually understood signs, symbols, and semiotic rules.",
                    "correcta": false
                }
            ]
        },{
            "pregunta": "There are 3 theories about what makes  some words meaningful and others not  meaningful. Which of the following is not a meaning theory:",
            "respuestas": [
                {
                    "respuesta": "Imagination theory",
                    "correcta": true
                },{
                    "respuesta": "Definition theory",
                    "correcta": false
                },{
                    "respuesta": "Denotation theory",
                    "correcta": false
                }
            ]
        },{
            "pregunta": "What do you think is the definition of this metaphor ''He broke my heart''",
            "respuestas": [
                {
                    "respuesta": "This expression is simply saying that someone brings them joy.",
                    "correcta": false
                },{
                    "respuesta": "This simply indicates that a lucky lady has a lot of male suitors.",
                    "correcta": false
                },{
                    "respuesta": "You're just feeling hurt and sad.",
                    "correcta": true
                }
            ]
        },{
            "pregunta": "Which is the correct meaning of the following idiom ‘Under the weather’",
            "respuestas": [
                {
                    "respuesta": "It means someone is getting wet",
                    "correcta": false
                },{
                    "respuesta": "It means they wish you luck in your future",
                    "correcta": false
                },{
                    "respuesta": "It means you feel bad",
                    "correcta": true
                }
            ]
        }
    ],"Grammaticality and acceptability": [
        {
            "pregunta": "Which of the following sentences is an ungrammatical sentence?",
            "respuestas": [
                {
                    "respuesta": "The student felt nervous before the speech.",
                    "correcta": false
                },{
                    "respuesta": "Thought about leaving the room.",
                    "correcta": true
                },{
                    "respuesta": "Many scientists think in strange ways. Einstein, for example.",
                    "correcta": false
                }
            ]
        },{
            "pregunta": "In order for a sentence to be grammatically correct, the subject and verb must both be singular or plural.If the subject is in plural form, the verb should also be in plural form. Choose the correct sentence:",
            "respuestas": [
                {
                    "respuesta": "The group of students is complaining about grades.",
                    "correcta": true
                },{
                    "respuesta": "The facts in that complex case is questionable.",
                    "correcta": false
                },{
                    "respuesta": "A recipe with more than six ingredients are too complicated.",
                    "correcta": false
                }
            ]
        },{
            "pregunta": "Pronouns take the place of nouns in sentences. In order to avoid a grammar error, the pronoun has to agree with the noun that it is replacing. Select the incorrect sentence:",
            "respuestas": [
                {
                    "respuesta": "Anna and Pat are married; they have been together for 20 years.",
                    "correcta": false
                },{
                    "respuesta": "I fed all of her fish, then cleaned their tank.",
                    "correcta": false
                },{
                    "respuesta": "When the girls on the team got to the hotel, they dropped off her luggage.",
                    "correcta": true
                }
            ]
        },{
            "pregunta": "The sentence ''Because I ate dinner'' you can say that is:",
            "respuestas": [
                {
                    "respuesta": "A fragment of a sentence",
                    "correcta": true
                },{
                    "respuesta": "A run-on sentence",
                    "correcta": false
                },{
                    "respuesta": "A complete sentence",
                    "correcta": false
                }
            ]
        }
    ],"Word formation": [
        {
            "pregunta": "In linguistics, word formation is the creation of a new word. There are four main kinds of word formation:",
            "respuestas": [
                {
                    "respuesta": "Prefixes, suffixes, conversion, compounds",
                    "correcta": true
                },{
                    "respuesta": "Prefixes, suffixes, conversion, complex",
                    "correcta": false
                },{
                    "respuesta": "Prefixes, formation, conversion, compounds",
                    "correcta": false
                }
            ]
        },{
            "pregunta": "The word “tattoo” is a borrowing from:",
            "respuestas": [
                {
                    "respuesta": "Japanese",
                    "correcta": false
                },{
                    "respuesta": "Turkish",
                    "correcta": false
                },{
                    "respuesta": "Tahitian",
                    "correcta": true
                }
            ]
        },{
            "pregunta": "Use the word at the end of the sentence to form a new word that fits into the sentence. ''There have been a lot of ____ in the world of medicine in the last two decades'' (Develop)",
            "respuestas": [
                {
                    "respuesta": "Develop",
                    "correcta": false
                },{
                    "respuesta": "Developments",
                    "correcta": true
                },{
                    "respuesta": "Developing",
                    "correcta": false
                }
            ]
        },{
            "pregunta": "Add a prefix or suffix to the word to form the correct answer. The verb form of the adjective ''intense'' is:",
            "respuestas": [
                {
                    "respuesta": "Intensify",
                    "correcta": true
                },{
                    "respuesta": "Intensive",
                    "correcta": false
                },{
                    "respuesta": "Intensity",
                    "correcta": false
                }
            ]
        }
    ],"Word collocation": [
        {
            "pregunta": "What is the correct or typical collocation of “She has beige hair”",
            "respuestas": [
                {
                    "respuesta": "She has blonde hair",
                    "correcta": true
                },{
                    "respuesta": "She has brown hair",
                    "correcta": false
                },{
                    "respuesta": "She has black hair",
                    "correcta": false
                }
            ]
        },{
            "pregunta": "A word collocation is:",
            "respuestas": [
                {
                    "respuesta": "A Group of words that expresses an independant statement, cuestión, exclamation.",
                    "correcta": false
                },{
                    "respuesta": "Something that someone says or writes officially, or an action done to express an opinion.",
                    "correcta": false
                },{
                    "respuesta": "The combination of words formed when two or more words are often used together in a way that sounds correct.",
                    "correcta": true
                }
            ]
        },{
            "pregunta": "There are several different types of collocation made from combinations of verb, noun, adjective etc. Of the following options, which is not a type of collocation?",
            "respuestas": [
                {
                    "respuesta": "Adjectives + noun",
                    "correcta": false
                },{
                    "respuesta": "Article + verb",
                    "correcta": true
                },{
                    "respuesta": "Verb + verb",
                    "correcta": false
                }
            ]
        },{
            "pregunta": "I like to sit down and ____ the crossword.",
            "respuestas": [
                {
                    "respuesta": "Make",
                    "correcta": false
                },{
                    "respuesta": "Do",
                    "correcta": true
                },{
                    "respuesta": "Prepare",
                    "correcta": false
                }
            ]
        }
    ],"Word function": [
        {
            "pregunta": "What is a word function?",
            "respuestas": [
                {
                    "respuesta": "A function word is a word that expresses a grammatical or structural relationship with other words in a sentence.",
                    "correcta": true
                },{
                    "respuesta": "A function word is an article that expresses a grammatical or structural relationship with other words in a sentence.",
                    "correcta": false
                },{
                    "respuesta": "A function word is a number that expresses a grammatical or structural relationship with other words in a sentence.",
                    "correcta": false
                }
            ]
        },{
            "pregunta": "Decide which words are function  words in the following sentence ''He's going fly to Chicago Next week''",
            "respuestas": [
                {
                    "respuesta": "Fly, Chicago, going, next",
                    "correcta": false
                },{
                    "respuesta": "Fly, Chicago, next, week ",
                    "correcta": true
                },{
                    "respuesta": "He, Chicago, going, week",
                    "correcta": false
                }
            ]
        },{
            "pregunta": "The words for, and, nor, but, or, yet, so are called:",
            "respuestas": [
                {
                    "respuesta": "Conjunctions",
                    "correcta": true
                },{
                    "respuesta": "Preposition",
                    "correcta": false
                },{
                    "respuesta": "Adjectives",
                    "correcta": false
                }
            ]
        },{
            "pregunta": "A function word might be:",
            "respuestas": [
                {
                    "respuesta": "Prepositions, adverbs, auxiliary verbs, subjects, grammatical articles or particles.",
                    "correcta": false
                },{
                    "respuesta": "Prepositions, pronouns, adjectives, conjunctions, grammatical articles or words.",
                    "correcta": false
                },{
                    "respuesta": "Prepositions, pronouns, auxiliary verbs, conjunctions, grammatical articles or particles.",
                    "correcta": true
                }
            ]
        }
    ],"Nouns": [
        {
            "pregunta": "In the case of nouns we can say that there are some exceptions, these would be:",
            "respuestas": [
                {
                    "respuesta": "Words that end in a consonant + ' y ', vowel + ' y ' , ' s ', ' ss ', ' sh ', ' ch ', ' x ', ' o ' , ' f ' or ' fe '",
                    "correcta": true
                },{
                    "respuesta": "Words that end in a consonant + ' d', vowel + ' y ', ' s ', ' ss ', ' sh ', ' ch ', ' x ', ' o ', ' f ' or ' fe '",
                    "correcta": false
                },{
                    "respuesta": "Words that end in a consonant + ' y ', vowel + ' y ', ' s ', ' ss ', ' hh ', ' ch ', ' x ', ' o ', ' f ' or ' fe ",
                    "correcta": false
                }
            ]
        },{
            "pregunta": "Many nouns are pluralized in an irregular way. It is for this reason that the following nouns have the same form in the singular and plural:",
            "respuestas": [
                {
                    "respuesta": "Fish, sheep, tooth, men",
                    "correcta": false
                },{
                    "respuesta": "Fishes, child, father, man",
                    "correcta": false
                },{
                    "respuesta": "Species, series, deer, means",
                    "correcta": true
                }
            ]
        },{
            "pregunta": "Nouns form a large proportion of English vocabulary and they come in a wide variety of types,  these might be:",
            "respuestas": [
                {
                    "respuesta": "A person, place, thing or idea",
                    "correcta": true
                },{
                    "respuesta": "A person, subject, thing or idea",
                    "correcta": false
                },{
                    "respuesta": "A person, place, thing or complement",
                    "correcta": false
                }
            ]
        },{
            "pregunta": "Most nouns have an '___' added at the end to form the plural:",
            "respuestas": [
                {
                    "respuesta": "Ing",
                    "correcta": false
                },{
                    "respuesta": "Ed",
                    "correcta": false
                },{
                    "respuesta": "S",
                    "correcta": true
                }
            ]
        }
    ],"Adjectives": [
        {
            "pregunta": "In many languages, attributive adjectives usually occur in a specific order. In general, the adjective order in English can be summarised as:",
            "respuestas": [
                {
                    "respuesta": "Opinion, size, age or shape, colour, origin, purpose, material. ",
                    "correcta": false
                },{
                    "respuesta": "Opinion, size, age or shape, origin, colour, purpose, material.",
                    "correcta": false
                },{
                    "respuesta": "Opinion, size, age or shape, colour, origin, material, purpose.",
                    "correcta": true
                }
            ]
        },{
            "pregunta": "An adjective is:",
            "respuestas": [
                {
                    "respuesta": "An adjective is a word that modifies a noun or noun phrase or describes its referent.",
                    "correcta": true
                },{
                    "respuesta": "Adjectives are one of the main parts of speech of the English language.",
                    "correcta": false
                },{
                    "respuesta": "Adjectives used to describe clothes, language, and behaviour that are serious or very polite.",
                    "correcta": false
                }
            ]
        },{
            "pregunta": "Find the adjective that fit in the blank best: We visited the museum, where we saw ____ artifacts",
            "respuestas": [
                {
                    "respuesta": "A lot of",
                    "correcta": false
                },{
                    "respuesta": "Ancient",
                    "correcta": true
                },{
                    "respuesta": "A room files with",
                    "correcta": false
                }
            ]
        },{
            "pregunta": "The president sat in a _____ chair.",
            "respuestas": [
                {
                    "respuesta": "Leather",
                    "correcta": true
                },{
                    "respuesta": "Funny",
                    "correcta": false
                },{
                    "respuesta": "Important",
                    "correcta": false
                }
            ]
        }
    ],"Adverbs": [
        {
            "pregunta": "In the sentence ''You often make mistakes'', what modifies the word often?",
            "respuestas": [
                {
                    "respuesta": "Modifies the subject you",
                    "correcta": false
                },{
                    "respuesta": "Modifies the sentence as a whole ",
                    "correcta": false
                },{
                    "respuesta": "Modifies the verb phrase make mistakes",
                    "correcta": true
                }
            ]
        },{
            "pregunta": "An adverb is:",
            "respuestas": [
                {
                    "respuesta": "An adverb is a word that is used to change, modify or qualify several types of words.",
                    "correcta": true
                },{
                    "respuesta": "An adverb is something that someone says or writes officially, or an action done to express an opinion.",
                    "correcta": false
                },{
                    "respuesta": "An adverb is something that is known to have happened or to exist.",
                    "correcta": false
                }
            ]
        },{
            "pregunta": "What are the types of adverbs?",
            "respuestas": [
                {
                    "respuesta": "Adverbs of degree, frequency, manner, place and time.",
                    "correcta": true
                },{
                    "respuesta": "Adverbs of degree, frequency, manner, function and time.",
                    "correcta": false
                },{
                    "respuesta": "Adverbs of degree, frequency, qualifies, place and time.",
                    "correcta": false
                }
            ]
        },{
            "pregunta": "Which of the following is an adverb of manner:",
            "respuestas": [
                {
                    "respuesta": "Below",
                    "correcta": false
                },{
                    "respuesta": "Softly",
                    "correcta": true
                },{
                    "respuesta": "Again",
                    "correcta": false
                }
            ]
        }
    ],"Verbs": [
        {
            "pregunta": "What is a verb?",
            "respuestas": [
                {
                    "respuesta": "Words that describe an action or talk about something that happens.",
                    "correcta": true
                },{
                    "respuesta": "Words that are complete in itself, typically containing a subject and predicate.",
                    "correcta": false
                },{
                    "respuesta": "The body of words used in a particular language.",
                    "correcta": false
                }
            ]
        },{
            "pregunta": "Now he ____ questions to see if the students have understood the lesson.",
            "respuestas": [
                {
                    "respuesta": "Is asking",
                    "correcta": true
                },{
                    "respuesta": "Asked",
                    "correcta": false
                },{
                    "respuesta": "Asks",
                    "correcta": false
                }
            ]
        },{
            "pregunta": "Which of the following verbs is not a regular verb?",
            "respuestas": [
                {
                    "respuesta": "Add",
                    "correcta": false
                },{
                    "respuesta": "Laugh",
                    "correcta": false
                },{
                    "respuesta": "Cost",
                    "correcta": true
                }
            ]
        },{
            "pregunta": "What is the past simple tense form of the verb forsake?",
            "respuestas": [
                {
                    "respuesta": "Forsaked",
                    "correcta": false
                },{
                    "respuesta": "Forsook",
                    "correcta": true
                },{
                    "respuesta": "Forsaken",
                    "correcta": false
                }
            ]
        }
    ],"Simple sentences": [
        {
            "pregunta": "We can say that the following sentence ''I bought to my friend some candies'' is a simple sentence because:",
            "respuestas": [
                {
                    "respuesta": "Have a subject, predicate and is an dependent clause",
                    "correcta": false
                },{
                    "respuesta": "Have a subject, predicate and also is an independent clause",
                    "correcta": true
                },{
                    "respuesta": "Have a subject, preposition and a complement",
                    "correcta": false
                }
            ]
        },{
            "pregunta": "What is the correct simple sentence?",
            "respuestas": [
                {
                    "respuesta": "The sand dunes squeaked, and the vultures squawked.",
                    "correcta": false
                },{
                    "respuesta": "Inspector DeRay looked around, but he couldn't find any fingerprints.",
                    "correcta": false
                },{
                    "respuesta": "Ramzi put an extra dash of ginger in the cookie batter.",
                    "correcta": true
                }
            ]
        },{
            "pregunta": "What is the grammatical structure of a sentence:",
            "respuestas": [
                {
                    "respuesta": "Subject + verb + preposition",
                    "correcta": false
                },{
                    "respuesta": "Subject + verb + complement",
                    "correcta": true
                },{
                    "respuesta": "Subject + verb + adverb",
                    "correcta": false
                }
            ]
        },{
            "pregunta": "What is not a simple sentence?",
            "respuestas": [
                {
                    "respuesta": "The plates clattered, and a glass fell to the floor and broke.",
                    "correcta": true
                },{
                    "respuesta": "In Greek mythology, Athena is the goddess of wisdom.",
                    "correcta": false
                },{
                    "respuesta": "The witches stirred their cauldrons with long-handled birch sticks.",
                    "correcta": false
                }
            ]
        }
    ],"Compound sentences": [
        {
            "pregunta": "A compound sentence is:",
            "respuestas": [
                {
                    "respuesta": "A compound sentence is a sentence that has at least two independent clauses joined by a comma, semicolon or conjunction.",
                    "correcta": true
                },{
                    "respuesta": "A compound sentence is a group of words giving a complete thought. A sentence must contain a subject and a verb.",
                    "correcta": false
                },{
                    "respuesta": "A compound sentence is a sentence that gives a condition and the outcome of the condition occurring.",
                    "correcta": false
                }
            ]
        },{
            "pregunta": "Choose the compound sentence:",
            "respuestas": [
                {
                    "respuesta": "Shepherds and goatherds herd sheep and goats, respectively.",
                    "correcta": false
                },{
                    "respuesta": "Humphrey spun the globe, and Peggy put her finger on a random country.",
                    "correcta": true
                },{
                    "respuesta": "Whenever it storms, Gizmo hides under the covers.",
                    "correcta": false
                }
            ]
        },{
            "pregunta": "What is the correct compound sentence?",
            "respuestas": [
                {
                    "respuesta": "I want the sporty red car, but I will lease the practical blue one.",
                    "correcta": true
                },{
                    "respuesta": "Because I was running late for work, I was snippy with him.",
                    "correcta": false
                },{
                    "respuesta": "Although he was wealthy, he was still unhappy.",
                    "correcta": false
                }
            ]
        },{
            "pregunta": "What is not a compound sentence?",
            "respuestas": [
                {
                    "respuesta": "The shoplifter had stolen clothes, so he ran once he saw the police.",
                    "correcta": false
                },{
                    "respuesta": "They spoke to him in Spanish, but he responded in English.",
                    "correcta": false
                },{
                    "respuesta": "After eating lunch at The Cheesecake Factory, Tim went to the gym to exercise.",
                    "correcta": true
                }
            ]
        }
    ],"Complex sentences": [
        {
            "pregunta": "What is a complex sentence?",
            "respuestas": [
                {
                    "respuesta": "A complex sentence is a sentence that contains one independent and at least one dependent clause.",
                    "correcta": true
                },{
                    "respuesta": "A complex sentence is a sentence that contains two dependent clauses.",
                    "correcta": false
                },{
                    "respuesta": "A complex sentence is a sentence that contains two independent clauses .",
                    "correcta": false
                }
            ]
        },{
            "pregunta": "''I like to eat the candy before I watch a movie'' is a complex sentence because:",
            "respuestas": [
                {
                    "respuesta": "Have two independent clauses",
                    "correcta": false
                },{
                    "respuesta": "Have two dependant clauses ",
                    "correcta": false
                },{
                    "respuesta": "Have an independent clause and a dependent clause",
                    "correcta": true
                }
            ]
        },{
            "pregunta": "Which of the following sentences is not a complex sentence?",
            "respuestas": [
                {
                    "respuesta": "Having a party is a bad idea because the neighbors will complain.",
                    "correcta": false
                },{
                    "respuesta": "I was born in the United States, yet I consider myself Canadian.",
                    "correcta": true
                },{
                    "respuesta": "Annie was still crying, although she had been happy about the news.",
                    "correcta": false
                }
            ]
        },{
            "pregunta": "Choose the complex sentence:",
            "respuestas": [
                {
                    "respuesta": "Whenever he was lonely, Lance called his mother.",
                    "correcta": true
                },{
                    "respuesta": "David drives carefully to work in the morning.",
                    "correcta": false
                },{
                    "respuesta": "She wanted spinach salad; he wanted a hamburger.",
                    "correcta": false
                }
            ]
        }
    ]
}

function jugador(id, nombre, token, habilitado = true, pierdeTurno, puntos = 0, posicion = 1, correctas = 0, erroneas = 0, color = getRandomColor()) {
    this.id = id;
    this.nombre = nombre;
    this.token = token;
    this.puntos = puntos;
    this.posicion = posicion;
    this.correctas = correctas;
    this.erroneas = erroneas;
    this.color = color;
    this.habilitado = habilitado;
    this.pierdeTurno = pierdeTurno;
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
    
    game.owner = socket.id;
    console.log("con: " + socket.id);
    io.sockets.emit('pregame-update', game);
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
    socket.on('Changeplayerstatus', (id) => {
        game.jugadores[id].habilitado = !game.jugadores[id].habilitado;
        io.sockets.emit('pregame-update', game);
    })
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

            //Pierde turno
            if (game.jugadores[game.jugadorActual].pierdeTurno) {
                game.jugadores[game.jugadorActual].pierdeTurno = false;
                console.log("pierde Turno, siguiente");
                var next = (game.ordenJugadores).findIndex((el) => el === game.jugadorActual);
                game.jugadorActual = game.ordenJugadores[((++next > game.ordenJugadores.length - 1) ? 0 : next)];
            }
            if (game.jugadores[game.jugadorActual].pierdeTurno) {
                game.jugadores[game.jugadorActual].pierdeTurno = false;
                console.log("pierde Turno, siguiente");
                var next = (game.ordenJugadores).findIndex((el) => el === game.jugadorActual);
                game.jugadorActual = game.ordenJugadores[((++next > game.ordenJugadores.length - 1) ? 0 : next)];
            }
            if (game.jugadores[game.jugadorActual].pierdeTurno) {
                game.jugadores[game.jugadorActual].pierdeTurno = false;
                console.log("pierde Turno, siguiente");
                var next = (game.ordenJugadores).findIndex((el) => el === game.jugadorActual);
                game.jugadorActual = game.ordenJugadores[((++next > game.ordenJugadores.length - 1) ? 0 : next)];
            }
            if (game.jugadores[game.jugadorActual].pierdeTurno) {
                game.jugadores[game.jugadorActual].pierdeTurno = false;
                console.log("pierde Turno, siguiente");
                var next = (game.ordenJugadores).findIndex((el) => el === game.jugadorActual);
                game.jugadorActual = game.ordenJugadores[((++next > game.ordenJugadores.length - 1) ? 0 : next)];
            }

            //Finaliza pierde turno
            
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
                game.jugadores[game.jugadorActual].puntos = game.jugadores[game.jugadorActual].puntos + 60;
                game.jugadores[game.jugadorActual].posicion = game.jugadores[game.jugadorActual].posicion - 34;
            }
            game.dado1 = valor1;
            game.dado2 = valor2;
            //Manda pregunta

            GetQuestion(game.jugadores[game.jugadorActual].posicion);
            break;
    
        default:
            break;
    }
}
function GetQuestion(celda, random = false) {
    var tema = celdas[celda];
    console.log(celda, tema);
    if (tema != 'Turn Loose'&&tema != 'Free Parking' && tema != 'Random Question Land' && tema != 'GO') {
        var id = getRandomNumber(0, preguntas[tema].length - 1);
        var preg = preguntas[tema][id].pregunta;
        console.log(preg);
        game.topic = tema;
        game.question = preg;
        game.questionid = id;
        game.respuestas = preguntas[tema][id].respuestas.map((el) => {
            return el.respuesta;
        });
    } else {
        game.topic = tema
        
        switch (tema) {
            case 'Turn Loose':
                game.question = 'You must wait and go through a round without playing.';
                game.jugadores[game.jugadorActual].pierdeTurno = true;
                break;
            case 'Free Parking':
                game.question = 'Keep calm!  Nothing bad happens.';
                break;
            case 'Random Question Land':
                getRandomNumber(1, 13);
                GetQuestion(getRandomNumber(1, 13), true);
                break;
            case 'GO':
                game.question = 'GO';
                game.jugadores[game.jugadorActual].puntos = game.jugadores[game.jugadorActual].puntos + 60;
                game.question = 'You have got 60 points.'
                break;
        
            default:
                break;
        }
    }
}

server.listen(port, function () {
  console.log("Servidor corriendo en http://localhost:8080");
});