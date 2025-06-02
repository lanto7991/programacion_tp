let vidaOsito=100
let dañoOsito=20
let vidaEnemigo=100
let dañoEnemigo=10
let cantCartasAtaque=0
let cantCartasDefensa=0
let cantCartasRandom=0
let cantCartasTotales=0

let jugador1 = 1
let jugador2 = 2

let turnos = 3

function turnos_player(){
    while(true)
    {
        if(turnos%= 2 == 0)
            {
                alert("Turno del jugador 2")
                turnos++
            }
        else
            {
                alert("Turno del jugador 1")
                turnos++
            }
    }
}

function setValues(){
    let vida_osito = document.getElementById("vida_osito")
    let vida_enemigo = document.getElementById("vida_enemigo")

    vida_osito.innerText = vidaOsito
    vida_enemigo.innerText = vidaEnemigo
}

function check_game(){ 
    if(vida_osito.innerText != "0" && vida_enemigo.innerText != "0")
    {
        alert("El combate esta en curso")
    }
    else
    {
        if(vida_osito.innerText == "0" || vida_enemigo.innerText == "0")
        {
            setValues()
        } 
    }
        
}

function atacar_enemigo()
{  
    let vida_osito = document.getElementById("vida_osito")
    let vida_enemigo = document.getElementById("vida_enemigo")
    let enemy_attack = document.getElementById("btnAt1")
    let osito_attack = document.getElementById("btnAt 2")

    if(enemy_attack.clicked)
        {
            vida_osito.innerText = vidaOsito - dañoEnemigo
        }
    if(osito_attack.clicked)
{
            vida_enemigo.innerText = vidaEnemigo - dañoOsito
        }
   
}


function darCartas(){
    while(cantCartasTotales < 3)
        {
        let probabilidades=Math.floor(Math.random()*3)
        switch(probabilidades){
            case 1:
                cantCartasAtaque++
            break
            case 2:
                cantCartasDefensa++
            break
            case 3:
                cantCartasRandom++
            break
        cantCartasTotales++
        }}
}

function efectoRandom(){
    let probabilidades=Math.floor(Math.random()*22)
    if(probabilidades<=5){
        // Efecto lentitud enemigo
    } else if (probabilidades<=10){
    //efecto critico 
    } else if (probabilidades<=15){
    //efecto fuego 
    } else if (probabilidades<=20){
    //efecto robo de vida 
    } else if (probabilidades==21){
    //one hit 
    }else{
    //nada, perdes el turno
    }
}
function ataqueOsito(){
    vidaEnemigo-dañoOsito
}
function defensaOsito(){
    vidaOsito+10
}
function ataqueEnemigo(){
    vidaOsito-dañoEnemigo
}
function verificarCombate(){
    if (vidaEnemigo<=0){
        //finalizar combate
    }
    if (vidaOsito<=0){
        //perdes
    }
}

function turnoJugador(){
    darCartas()
}