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

let input = document.getElementById("guess-input");
input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("guess-button").click();
    }
});
input.addEventListener("input", () => {
    if (input.value.length > 5) {
        alert("Por favor, ingrese solo 5 letras.");
        input.value = input.value.slice(0, 5); // Limitar a 5 letras
    }
});

const API = "https://random-word-api.vercel.app/api?words=1&length=5&type=uppercase";
fetch(API)
    .then((response) => {
        response.json().then((body) => {
            palabra = body[0].toUpperCase();
        });
    })
    .catch((error) => {
        console.log(error);
        palabra = palabraAleatoria(diccionario);
    });

document.getElementById("guess-button").addEventListener("click", () => {
    const intento = leerIntento();
    if (palabra === intento) {
        terminar("GANASTE!>");
        return;
    }
    const ROW = document.createElement("div");
    ROW.className = "row";
    const grid = document.getElementById("grid");
    for (const i in intento) {
        const SPAN = document.createElement("span");
        SPAN.className = "letter";
        SPAN.innerText = intento[i];
        if (intento[i] === palabra[i]) {
            SPAN.style.background = verde;
        } else if (
            palabra.includes(intento[i]) &&
            noSeRepite(palabra, intento[i])
        ) {
            SPAN.style.background = amarillo;
        } else {
            SPAN.style.background = gris;
        }
        ROW.appendChild(SPAN);
    }
    grid.appendChild(ROW);
    tieneVidas--;
    if (!tieneVidas) {
        terminar("GAME OVER!");
        setTimeout(() => {
            terminar("La palabra correcta era: " + palabra);
        }, 2000); // Mostrar el mensaje de la palabra correcta después de 2 segundos (2000 milisegundos)
        return;
    }
});

function leerIntento() {
    let intento = document.getElementById("guess-input").value.toUpperCase();
    return intento;
}

function terminar(mensaje) {
    document.getElementById("guess-button").disabled = true;
    let p = document.getElementById("guesses");
    p.innerHTML = "<h1>" + mensaje + "</h1>";
    reloadAfterDelay();
}

function reloadAfterDelay() {
    setTimeout(() => {
        // Recargar la página después de 4 segundos (4000 milisegundos)
        location.reload();
    }, 10000);
}

function noSeRepite(palabra, letra) {
    return palabra.includes(letra);
}

function reiniciarJuego() {
    input.value = ""; // Borrar el contenido del campo de entrada
    input.disabled = false; 
}
