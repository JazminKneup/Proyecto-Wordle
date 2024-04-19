let intentos = 6;
let tieneVidas = 6;
let verde = "#79b851";
let amarillo = "#f3c237";
let gris = "#a4aec4";
let diccionario = ["MONEY", "HAPPY", "ENJOY", "DREAM", "DRINK", "START"];
let palabra = palabraAleatoria(diccionario);


function palabraAleatoria(diccionario) {
    let max = diccionario.length - 1;
    let indice = Math.floor(Math.random() * (max + 1));
    return diccionario[indice];
}


const button = document.getElementById("guess-button");
const GRID = document.getElementById("grid");

button.addEventListener('click', intentar);

function iniciarJuego() {
    
    const palabra = diccionario[Math.floor(Math.random() * diccionario.length)];
    console.log(palabra);

    button.disabled = false;
    intentos = 6;
    GRID.innerHTML = '';
}

function intentar() {
    const ROW = document.createElement('div');
    ROW.className = 'row';
    const INTENTO = leerIntento().toUpperCase();

    console.log("Intento:", INTENTO);
    intentos--;

    if (INTENTO === palabra) {
        console.log("Ganaste");
        terminar("<h1>¡GANASTE! 🥳</h1>");
        return;
    }

    for (let i = 0; i < palabra.length; i++) {
        const SPAN = document.createElement('span');
        SPAN.className = "letter";

        if (palabra[i] === INTENTO[i]) {
            console.log(INTENTO[i], "verde");
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = "green";
        } else if (palabra.includes(INTENTO[i])) {
            console.log(INTENTO[i], "amarillo");
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = "yellow";
        } else {
            console.log(INTENTO[i], "gris");
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = "gray";
        }

        ROW.appendChild(SPAN);
    }

    GRID.appendChild(ROW);

    if (intentos === 0) {
        console.log("PERDISTE!");
        terminar("<h1>¡PERDISTE! ☠️</h1>");
    }
}

function leerIntento() {
    const intentoInput = document.getElementById("guess-input");
    const intento = intentoInput.value;
    intentoInput.value = ''; 
    return intento;
}

function terminar(mensaje) {
    const INPUT = document.getElementById("guess-input");
    INPUT.disabled = true;
    button.disabled = true;
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje;
}


iniciarJuego();
