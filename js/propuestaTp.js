let vidaJugador = 100;
let vidaComputadora = 100;
let cartasJugador = [];
let cartasComputadora = [];
let cartasSeleccionadas = null;
let cartaRival = null;
let gameOver = false;
let mazoJugador = [];
let mazoComputadoraActual = [];

const vidaJugadorEl = document.getElementById('vida-jugador');
const vidaComputadoraEl = document.getElementById('vida-computadora');
const cartasJugadorEl = document.getElementById('cartas-jugador');
const cartaComputadoraEl = document.getElementById('cartaRival');
const ataqueComputadoraEl = document.getElementById('ataque-computadora');
const defensaComputadoraEl = document.getElementById('defensa-computadora');
const botonJugar = document.getElementById('boton-jugar');
const botonReiniciar = document.getElementById('boton-reiniciar');
const mensajeEl = document.getElementById('mensaje');
const cartasRivalEl = document.getElementById('cartas-rival');
const mazoEl = document.getElementById('mazo');
const contadorMazoEl = document.getElementById('contador-mazo');

const mazoOriginalJugador = [
    { name: "ATQ 1", tipo: "ataque", valor: 3 },
    { name: "ATQ 2", tipo: "ataque", valor: 2 },
    { name: "ATQ 3", tipo: "ataque", valor: 4 },
    { name: "ATQ 4", tipo: "ataque", valor: 3 },
    { name: "ATQ 5", tipo: "ataque", valor: 5 },
    { name: "ATQ 6", tipo: "ataque", valor: 2 },
    { name: "ATQ 7", tipo: "ataque", valor: 6 },
    { name: "ATQ 8", tipo: "ataque", valor: 4 },
    { name: "ATQ 9", tipo: "ataque", valor: 3 },
    { name: "ATQ 10", tipo: "ataque", valor: 5 },
    { name: "DEF 1", tipo: "defensa", valor: 3 },
    { name: "DEF 2", tipo: "defensa", valor: 4 },
    { name: "DEF 3", tipo: "defensa", valor: 2 },
    { name: "DEF 4", tipo: "defensa", valor: 5 },
    { name: "Curación", tipo: "defensa", valor: 3 },
    { name: "DEF 5", tipo: "defensa", valor: 4 },
    { name: "DEF 6", tipo: "defensa", valor: 6 },
    { name: "DEF 7", tipo: "defensa", valor: 2 },
    { name: "DEF 8", tipo: "defensa", valor: 3 },
    { name: "DEF 9", tipo: "defensa", valor: 5 }
];

const mazoOriginalComputadora = [ 
    { name: "ATQ 1", tipo: "ataque", valor: 3 },
    { name: "ATQ 2", tipo: "ataque", valor: 2 },
    { name: "ATQ 3", tipo: "ataque", valor: 4 },
    { name: "ATQ 4", tipo: "ataque", valor: 3 },
    { name: "ATQ 5", tipo: "ataque", valor: 5 },
    { name: "ATQ 6", tipo: "ataque", valor: 2 },
    { name: "ATQ 7", tipo: "ataque", valor: 6 },
    { name: "ATQ 8", tipo: "ataque", valor: 4 },
    { name: "ATQ 9", tipo: "ataque", valor: 3 },
    { name: "ATQ 10", tipo: "ataque", valor: 5 },
    { name: "DEF 1", tipo: "defensa", valor: 3 },
    { name: "DEF 2", tipo: "defensa", valor: 4 },
    { name: "DEF 3", tipo: "defensa", valor: 2 },
    { name: "DEF 4", tipo: "defensa", valor: 5 },
    { name: "Curación", tipo: "defensa", valor: 3 },
    { name: "DEF 5", tipo: "defensa", valor: 4 },
    { name: "DEF 6", tipo: "defensa", valor: 6 },
    { name: "DEF 7", tipo: "defensa", valor: 2 },
    { name: "DEF 8", tipo: "defensa", valor: 3 },
    { name: "DEF 9", tipo: "defensa", valor: 5 }];

function createCard(mazoFuente) {
    if (mazoFuente.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * mazoFuente.length);
    return mazoFuente.splice(randomIndex, 1)[0];
}


function startGame() {
    cartasJugador = [];
    cartasComputadora = [];
    cartasSeleccionadas = null;
    cartaRival = null;
    gameOver = false;

    mazoJugador = [...mazoOriginalJugador];
    mazoComputadoraActual = [...mazoOriginalComputadora];

    for (let i = 0; i < 3; i++) {
        const nuevaCarta = createCard(mazoJugador);
        if (nuevaCarta) cartasJugador.push(nuevaCarta);
    }

    updateGame();
    botonJugar.disabled = true;
    botonReiniciar.style.display = 'none';
    cartaComputadoraEl.style.display = 'none';
    mensajeEl.textContent = 'Selecciona una carta';
}

function updateGame() {
    contadorMazoEl.textContent = `${mazoJugador.length + cartasJugador.length}`;
    vidaJugadorEl.textContent = vidaJugador;
    vidaComputadoraEl.textContent = vidaComputadora;
    cartasJugadorEl.innerHTML = '';

    cartasJugador.forEach((carta, index) => {
        const cartaEl = document.createElement('div');
        cartaEl.className = 'carta';
        if (cartasSeleccionadas === index) {
            cartaEl.classList.add('selected');
        }
        cartaEl.innerHTML = `
            <div class="nombre-carta">${carta.name}</div>
            <div class="stats">
                <span class="${carta.tipo}">${carta.tipo.toUpperCase()}: ${carta.valor}</span>
            </div>
        `;
        cartaEl.addEventListener('click', () => selectCard(index));
        cartasJugadorEl.appendChild(cartaEl);
    });

    if (vidaJugador <= 0 || vidaComputadora <= 0) {
        gameOver = true;

        if (vidaJugador == 0 && vidaComputadora == 0) {
            mensajeEl.textContent = "Empate";
        } else if (vidaComputadora <= 1) {
            mensajeEl.textContent = "Victoria";
        } else {
            mensajeEl.textContent = "Derrota";
        }

        botonReiniciar.style.display = 'inline-block';
        botonJugar.disabled = true;
    }

    if (mazoJugador.length === 0 || cartasJugador.length === 0 || mazoComputadoraActual.length === 0) {
        gameOver = true;
        mensajeEl.textContent = "No quedan más cartas. Fin del juego.";
        botonReiniciar.style.display = 'inline-block';
        botonJugar.disabled = true;
    }
}

function selectCard(index) {
    if (gameOver) return;
    cartasSeleccionadas = index;
    botonJugar.disabled = false;
    updateGame();
    mensajeEl.textContent = `Seleccionaste: ${cartasJugador[index].name}`;
}

function playCard() {
    if (cartasSeleccionadas === null || gameOver) return;

    const cartaJugador = cartasJugador[cartasSeleccionadas];
    const cartaRival = createCard(mazoComputadoraActual);

    if (!cartaRival) {
        mensajeEl.textContent = "El rival no tiene más cartas";
        return;
    }

    ataqueComputadoraEl.textContent = cartaRival.tipo === "ataque" ? cartaRival.valor : 0;
    defensaComputadoraEl.textContent = cartaRival.tipo === "defensa" ? cartaRival.valor : 0;
    cartaComputadoraEl.style.display = 'flex';

    if (cartaJugador.tipo === "ataque") {
        const dano = Math.max(0, cartaJugador.valor - (cartaRival.tipo === "defensa" ? cartaRival.valor : 0));
        vidaComputadora -= dano;
        mensajeEl.textContent = `¡${cartaJugador.name} hizo ${dano} de daño!`;
    } else if (cartaJugador.tipo === "defensa") {
        vidaJugador += cartaJugador.valor;
        mensajeEl.textContent = `${cartaJugador.name} te protegió (+${cartaJugador.valor} vida)`;
    }

    vidaComputadora = Math.max(0, vidaComputadora);
    vidaJugador = Math.max(0, vidaJugador);

    cartasJugador.splice(cartasSeleccionadas, 1);
    const nuevaCarta = createCard(mazoJugador);
    if (nuevaCarta) cartasJugador.push(nuevaCarta);

    cartasSeleccionadas = null;
    botonJugar.disabled = true;
    updateGame();
    setTimeout(turnoComputadora, 1000);
}

function turnoComputadora() {
    if (gameOver) return;

    const cartaRival = createCard(mazoComputadoraActual);
    if (!cartaRival) {
        mensajeEl.textContent += " | El rival no tiene más cartas";
        return;
    }

    if (cartaRival.tipo === "ataque") {
        const dano = cartaRival.valor;
        vidaJugador -= dano;
        mensajeEl.textContent += ` | El rival usó ${cartaRival.name} e hizo ${dano} de daño.`;
    } else if (cartaRival.tipo === "defensa") {
        vidaComputadora += cartaRival.valor;
        mensajeEl.textContent += ` | El rival usó ${cartaRival.name} y se curó ${cartaRival.valor}.`;
    }

    vidaJugador = Math.max(0, vidaJugador);
    vidaComputadora = Math.max(0, vidaComputadora);

    updateGame();
}
botonJugar.addEventListener('click', playCard);
botonReiniciar.addEventListener('click', startGame);
window.addEventListener('DOMContentLoaded', startGame);