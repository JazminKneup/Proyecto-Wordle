let intentos = 6;
let diccionario = ["MONEY", "HAPPY", "ENJOY", "DREAM", "DRINK","START"];
let random = Math.floor[Math.floor(Math.random() * diccionario.length)];
const palabra = diccionario[Math.floor(Math.random() * diccionario.length)];

const button = document.getElementById("guess-button");
const GRID = document.getElementById("grid");

console.log(palabra);

button.addEventListener('click', intentar);
function intentar(){
    const ROW = document.createElement('div');
    ROW.className = 'row';
    const INTENTO = leerIntento();

    console.log(INTENTO);
    intentos = intentos -1;

    if (INTENTO === palabra){
        console.log("Ganaste");
        terminar ("<h1>GANASTE!🥳</h1>")
        return
    }else{
        console.log("analizar intento")
        for (i in palabra){
            const SPAN = document.createElement('span')
            SPAN.className =  "letter";

    if(palabra[i] === INTENTO[i]){
        console.log(INTENTO[i], "verde");
        SPAN.innerHTML = INTENTO[i];
        SPAN.style.backgroundColor = "green";
        console.log(SPAN)

    }
    else if (palabra.includes(INTENTO[1])){
        console.log( INTENTO[i], "amarillo");
        SPAN.innerHTML = INTENTO[i];
        SPAN.style.backgroundColor = "yellow";
        console.log(SPAN)
    }
     else {
            console.log(INTENTO[i], "gris")
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = "gray";
            console.log(SPAN)
        }
        ROW.appendChild(SPAN);
    }
    GRID.appendChild(ROW);
  }  
    if (intentos==0){
        console.log("PERDISTE!")
        terminar("<h1>PERDISTE!☠️</h1>")

    }
}
    function leerIntento(){
        let intento = document.getElementById("guess-input");
        intento = intento.value;
        intento = intento.toUpperCase();

         return intento

    }
    function terminar(mensaje){
        const INPUT = document.getElementById("guess-input");
        INPUT.disabled = true;
        BOTON.disabled = true;
        let contenedor = document.getElementById('guesses');
        contenedor.innerHTML = mensaje;
    }