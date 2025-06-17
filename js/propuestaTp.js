let vidaJugador = 10;
let vidaComputadora = 10;
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

    function createCard(mazoFuente, prioridad = null) {
        if (mazoFuente.length === 0) return null;
    
        let mazoFiltrado = mazoFuente;
    
        if (prioridad) {
            const preferidas = mazoFuente.filter(c => c.tipo === prioridad);
            if (preferidas.length > 0) {
                mazoFiltrado = preferidas;
            }
        }
    
        const randomIndex = Math.floor(Math.random() * mazoFiltrado.length);
        const cartaSeleccionada = mazoFiltrado[randomIndex];
    
        // Eliminar esa carta del mazo original (mazoFuente)
        const indexEnMazo = mazoFuente.indexOf(cartaSeleccionada);
        if (indexEnMazo !== -1) {
            mazoFuente.splice(indexEnMazo, 1);
        }
    
        return cartaSeleccionada;
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
    
        // Resetear interfaz
        mensajeEl.textContent = 'Selecciona una carta';
        cartaComputadoraEl.style.display = 'none';
        ataqueComputadoraEl.textContent = '';
        defensaComputadoraEl.textContent = '';
        cartasRivalEl.innerHTML = '';
        botonJugar.disabled = true;
        botonReiniciar.style.display = 'none';
    
        updateGame(); // Actualizar pantalla
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

        // Lógica de fin de juego por vida
        if (vidaJugador <= 0 || vidaComputadora <= 0) {
            gameOver = true;

            if (vidaJugador <= 0 && vidaComputadora <= 0) {
                mensajeEl.textContent = "Empate";
            } else if (vidaComputadora <= 0) {
                mensajeEl.textContent = "Victoria";
            } else {
                mensajeEl.textContent = "Derrota";
            }

            botonReiniciar.style.display = 'inline-block';
            botonJugar.disabled = true;
            return;
        }

        // Lógica de fin de juego por mazos vacíos
        if (mazoJugador.length === 0 && cartasJugador.length === 0) {
            gameOver = true;
            mensajeEl.textContent = "Te quedaste sin cartas. Derrota.";
            botonReiniciar.style.display = 'inline-block';
            botonJugar.disabled = true;
            return;
        }

        if (mazoComputadoraActual.length === 0) {
            gameOver = true;
            mensajeEl.textContent = "El rival se quedó sin cartas. ¡Victoria!";
            botonReiniciar.style.display = 'inline-block';
            botonJugar.disabled = true;
            return;
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
    if (cartaJugador.tipo === "ataque") {
        vidaComputadora -= cartaJugador.valor;
        mensajeEl.textContent = `${cartaJugador.name} hizo ${cartaJugador.valor} de daño a la computadora.`;
    } else if (cartaJugador.tipo === "defensa") 
        vidaJugador += cartaJugador.valor;
        mensajeEl.textContent = `${cartaJugador.name} te curó ${cartaJugador.valor} de vida.`;
    

    vidaJugador = Math.max(0, vidaJugador);
    vidaComputadora = Math.max(0, vidaComputadora);

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

    const cartaRival = createCard(mazoComputadoraActual, "ataque");

    if (!cartaRival) {
        mensajeEl.textContent += " | El rival no tiene más cartas.";
        updateGame();
        return;
    }

    if (cartaRival.tipo === "ataque") {
        vidaJugador -= cartaRival.valor;
        mensajeEl.textContent += ` | El rival usó ${cartaRival.name} e hizo ${cartaRival.valor} de daño.`;
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