let vidaJugador = 10;
let vidaComputadora = 10;
let defensaGeneral = 0; 
let cartasJugador = [];
let cartasComputadora = [];
let cartasSeleccionadas = null;
let cartaRival = null;
let gameOver = false;
let mazoJugador = [];
let mazoComputadoraActual = [];

let canvas
let ctx
let imgEnemigo=new Image
let audioHoverboton 
let audioHovercarta 
let audioSelectboton 
let audioSelectcarta
let audioSelectreglas
let audioAtaque
let audioDaño
let audioDaño2
let audioDefensa
let audioMuertejugador
let audioMuertepc
let audioLose
let audioWin
let audioMusicamenu
let audioMusicapelea

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
const botonMenuPrincipal = document.getElementById('boton-menu-principal');

audioHoverboton=new Audio();
audioHoverboton.src="audios/hover_boton.wav";
audioHovercarta=new Audio();
audioHovercarta.src="audios/hover_carta.wav";
audioSelectboton=new Audio();
audioSelectboton.src="audios/select_boton.wav";
audioSelectcarta=new Audio();
audioSelectcarta.src="audios/select_carta.wav";
audioSelectreglas=new Audio();
audioSelectreglas.src="audios/select_reglas.wav";
audioAtaque=new Audio();
audioAtaque.src="audios/ataque.wav";
audioDaño=new Audio();
audioDaño.src="audios/daño.wav";
audioDaño2=new Audio();
audioDaño2.src="audios/daño2.wav";
audioDefensa=new Audio();
audioDefensa.src="audios/defensa.wav";
audioMuertejugador=new Audio();
audioMuertejugador.src="audios/muerte_jugador.wav";
audioMuertepc=new Audio();
audioMuertepc.src="audios/muerte_pc.wav";
audioLose=new Audio();
audioLose.src="audios/game_over.wav";
audioWin=new Audio();
audioWin.src="audios/game_win.wav";
audioMusicamenu=new Audio();
audioMusicamenu.src="audios/mus_menu.wav";
audioMusicapelea=new Audio();
audioMusicapelea.src="audios/mus_pelea.wav";

window.onload=function(){
    canvas=document.getElementById("canvas")
    ctx=canvas.getContext("2d")
    canvas.style.backgroundImage = "url('img/fondocombate.png')"
    imgEnemigo.src = "img/LoboMarino.png";
    imgEnemigo.onload = function() {
        enemigo = new Personaje(900, 680, 170, 250, imgEnemigo);
        enemigo.dibujar();  
    };
} 
function Personaje(x,y,ancho,alto,imagen){
    this.x=x
    this.y=y
    this.ancho=ancho
    this.alto=alto
    this.imagen=imagen
    this.dibujar=function(){
        ctx.drawImage(this.imagen,this.x, this.y, this.ancho, this.alto)
    }
}
const mazoOriginalJugador = [
    { name: "Puñetazo", tipo: "ataque", valor: 3 },
    { name: "Bofetada", tipo: "ataque", valor: 2 },
    { name: "Arañazo", tipo: "ataque", valor: 4 },
    { name: "Puñetazo", tipo: "ataque", valor: 3 },
    { name: "Patada", tipo: "ataque", valor: 5 },
    { name: "Bofetada", tipo: "ataque", valor: 2 },
    { name: "Hechizo", tipo: "ataque", valor: 6 },
    { name: "Arañazo", tipo: "ataque", valor: 4 },
    { name: "Puñetazo", tipo: "ataque", valor: 3 },
    { name: "Patada", tipo: "ataque", valor: 5 },
    { name: "DEF", tipo: "defensa", valor: 3 },
    { name: "DEF", tipo: "defensa", valor: 4 },
    { name: "DEF", tipo: "defensa", valor: 2 },
    { name: "DEF", tipo: "defensa", valor: 5 },
    { name: "DEF", tipo: "defensa", valor: 3 },
    { name: "DEF", tipo: "defensa", valor: 4 },
    { name: "DEF", tipo: "defensa", valor: 4 },
    { name: "DEF", tipo: "defensa", valor: 2 },
    { name: "DEF", tipo: "defensa", valor: 3 },
    { name: "DEF", tipo: "defensa", valor: 5 },
    { name: "Puñetazo", tipo: "ataque", valor: 3 },
    { name: "Bofetada", tipo: "ataque", valor: 2 },
    { name: "Arañazo", tipo: "ataque", valor: 4 },
    { name: "Puñetazo", tipo: "ataque", valor: 3 },
    { name: "Patada", tipo: "ataque", valor: 5 },
    { name: "Bofetada", tipo: "ataque", valor: 2 },
    { name: "Hechizo", tipo: "ataque", valor: 6 },
    { name: "Arañazo", tipo: "ataque", valor: 4 },
    { name: "Puñetazo", tipo: "ataque", valor: 3 },
    { name: "Patada", tipo: "ataque", valor: 5 },
    { name: "DEF", tipo: "defensa", valor: 3 },
    { name: "DEF", tipo: "defensa", valor: 4 },
    { name: "DEF", tipo: "defensa", valor: 2 },
    { name: "DEF", tipo: "defensa", valor: 5 },
    { name: "DEF", tipo: "defensa", valor: 3 },
    { name: "DEF", tipo: "defensa", valor: 4 },
    { name: "DEF", tipo: "defensa", valor: 4 },
    { name: "DEF", tipo: "defensa", valor: 2 },
    { name: "DEF", tipo: "defensa", valor: 3 },
    { name: "DEF", tipo: "defensa", valor: 5 }
];

const mazoOriginalComputadora = [ 
    { name: "Embestida", tipo: "ataque", valor: 2 },
    { name: "Palmeo", tipo: "ataque", valor: 1 },
    { name: "Arañazo", tipo: "ataque", valor: 3 },
    { name: "Embestida", tipo: "ataque", valor: 1 },
    { name: "Mordisco", tipo: "ataque", valor: 4 },
    { name: "Palmeo", tipo: "ataque", valor: 1 },
    { name: "Arañazo", tipo: "ataque", valor: 3 },
    { name: "Arañazo", tipo: "ataque", valor: 3 },
    { name: "Embestida", tipo: "ataque", valor: 2 },
    { name: "Embestida", tipo: "ataque", valor: 2 },
    { name: "DEF", tipo: "defensa", valor: 2 },
    { name: "DEF", tipo: "defensa", valor: 4 },
    { name: "DEF", tipo: "defensa", valor: 2 },
    { name: "DEF", tipo: "defensa", valor: 3 },
    { name: "DEF", tipo: "defensa", valor: 2 },
    { name: "DEF", tipo: "defensa", valor: 2 },
    { name: "DEF", tipo: "defensa", valor: 2 },
    { name: "DEF", tipo: "defensa", valor: 2 },
    { name: "DEF", tipo: "defensa", valor: 3 },
    { name: "DEF", tipo: "defensa", valor: 3 },
    { name: "Embestida", tipo: "ataque", valor: 2 },
    { name: "Palmeo", tipo: "ataque", valor: 1 },
    { name: "Arañazo", tipo: "ataque", valor: 3 },
    { name: "Embestida", tipo: "ataque", valor: 1 },
    { name: "Mordisco", tipo: "ataque", valor: 4 },
    { name: "Palmeo", tipo: "ataque", valor: 1 },
    { name: "Arañazo", tipo: "ataque", valor: 3 },
    { name: "Arañazo", tipo: "ataque", valor: 3 },
    { name: "Embestida", tipo: "ataque", valor: 2 },
    { name: "Embestida", tipo: "ataque", valor: 2 },
    { name: "DEF", tipo: "defensa", valor: 2 },
    { name: "DEF", tipo: "defensa", valor: 4 },
    { name: "DEF", tipo: "defensa", valor: 2 },
    { name: "DEF", tipo: "defensa", valor: 3 },
    { name: "DEF", tipo: "defensa", valor: 2 },
    { name: "DEF", tipo: "defensa", valor: 2 },
    { name: "DEF", tipo: "defensa", valor: 2 },
    { name: "DEF", tipo: "defensa", valor: 2 },
    { name: "DEF", tipo: "defensa", valor: 3 },
    { name: "DEF", tipo: "defensa", valor: 3 }];

const ENEMIGOS_DISPONIBLES = [
    {
        id: 'tatu',
        name: 'Tatu Carretera',
        description: 'Un lento mamifero amante de las rutas.',
        image: 'img/TatuCarreterafoto.png',
        video: 'videos/fondotatu.mp4',
        mazo: [...mazoOriginalComputadora],
        vidaInicial: 10,
        dificultad: 'Facil'
    },    
    {
        id: 'tapir',
        name: 'Tapir Cosmico',
        description: 'Una bestia de la selva cosmica con gran poder.',
        image: 'img/tapirofoto.png',
        video: 'videos/fondotapir.mp4',
        mazo: [...mazoOriginalComputadora],
        vidaInicial: 20,
        dificultad: 'Medio'
    },
    {
        id: 'puma',
        name: 'Es-Puma',
        description: 'Una criatura veloz de gran poder fisico.',
        image: 'img/pumafoto.png',
        video: 'videos/fondopuma.mp4',
        mazo: [...mazoOriginalComputadora],
        vidaInicial: 30,
        dificultad: 'Media'
    },
    
    {
        id: 'loboMarino',
        name: 'Lobo Rey Mariano III',
        description: 'Un ágil depredador acuático que ataca rápido.',
        image: 'img/LoboMarino.png',
        video: 'videos/fondolobomarino.mp4',
        mazo: [...mazoOriginalComputadora],
        vidaInicial: 40,
        dificultad: 'Dificil'
    }   
];

let enemigoActual = null;

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
        botonMenuPrincipal.classList.add('mostrar');
        document.addEventListener('click',()=>{
            audioMusicapelea.play()
        })
        audioMusicapelea.play();
    
        mazoJugador = [...mazoOriginalJugador];
        mazoComputadoraActual = [...mazoOriginalComputadora];
    
        for (let i = 0; i < 3; i++) {
            const nuevaCarta = createCard(mazoJugador);
            if (nuevaCarta) cartasJugador.push(nuevaCarta);
        }

        for (let i = 0; i < 3; i++) {
            const nuevaCartaRival = createCard(mazoComputadoraActual);
            if (nuevaCartaRival) cartasComputadora.push(nuevaCartaRival);
        }

        const enemigoId = localStorage.getItem('enemigoSeleccionadoId');

        enemigoActual = ENEMIGOS_DISPONIBLES.find(e => e.id === enemigoId);

        const videoFondo = document.getElementById('video-fondo');

        if (videoFondo && enemigoActual && enemigoActual.video) {
            videoFondo.src = enemigoActual.video;
            videoFondo.play();
        }

        if (!enemigoId) {
            window.location.href = "main_menu.html";
            return;
        }

        if (!enemigoActual) {
            window.location.href = "main_menu.html";
            return;
        }
        vidaJugador = 10;
        vidaComputadora = enemigoActual.vidaInicial;
        const tituloEnfrentamientoEl = document.getElementById('titulo-enfrentamiento');
        if (tituloEnfrentamientoEl) {
            const nombreUsuario = localStorage.getItem("usuarioPixelcard") || "Jugador";
            tituloEnfrentamientoEl.textContent = `${nombreUsuario} vs ${enemigoActual.name}`;
        }
    
        mensajeEl.textContent = 'Selecciona una carta';
        cartaComputadoraEl.style.display = 'none';
        ataqueComputadoraEl.textContent = '';
        defensaComputadoraEl.textContent = '';
        cartasRivalEl.innerHTML = '';
        botonJugar.disabled = true;
        botonReiniciar.classList.add('mostrar');
    
        updateGame();

       
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
                cartaEl.classList.add('seleccionada', 'animada');
                setTimeout(() => {
                    cartaEl.classList.remove('animada');
                }, 300); 
            }
            cartaEl.innerHTML = `
                <div class="nombre-carta">${carta.name}</div>
                <div class="stats">
                    <span class="${carta.tipo}">${carta.tipo.toUpperCase()}: ${carta.valor}</span>
                </div>
            `;
            cartaEl.addEventListener('click', () => selectCard(index));

              cartaEl.addEventListener('mouseenter', () => {
            if (!cartaEl.classList.contains('seleccionada')) {
                audioHovercarta.currentTime = 0; 
                audioHovercarta.play();
            } 
            
        });
                cartasJugadorEl.appendChild(cartaEl);  
    });

        cartasRivalEl.innerHTML = '';

        cartasComputadora.forEach(() => {
            const cartaOculta = document.createElement('div');
            cartaOculta.classList.add('carta', 'carta-rival'); 
            cartasRivalEl.appendChild(cartaOculta);
        });

        if (vidaJugador <= 0 || vidaComputadora <= 0) {
            gameOver = true;

            if (vidaJugador <= 0 && vidaComputadora <= 0) {
        mensajeEl.textContent = "Empate";
    } else if (vidaComputadora <= 0) {
        mensajeEl.textContent = "Victoria";

        audioMusicapelea.pause();
        audioMusicapelea.currentTime = 0;
        audioMusicapelea.loop = false;

        audioMuertepc.currentTime = 0;
        audioMuertepc.play();

        setTimeout(() => {
            audioWin.currentTime = 0;
            audioWin.play();
        }, 2000);
                 const derrotados = JSON.parse(localStorage.getItem("enemigosDerrotados") || "[]");
                if (!derrotados.includes(enemigoActual.id)) {
                    derrotados.push(enemigoActual.id);
                    localStorage.setItem("enemigosDerrotados", JSON.stringify(derrotados));
                }
            } else {
                mensajeEl.textContent = "Derrota";
                audioMusicapelea.pause();
                audioMuertejugador.play();
            }

            botonReiniciar.style.display = 'inline-block';
             botonJugar.style.display = 'none';
            return;
        }

        if (mazoJugador.length === 0 && cartasJugador.length === 0) {
            gameOver = true;
            mensajeEl.textContent = "Te quedaste sin cartas. Derrota.";
            audioMusicapelea.pause();
            audioLose.play();
            botonReiniciar.style.display = 'inline-block';
             botonJugar.style.display = 'none';
            return;
        }

        if (mazoComputadoraActual.length === 0) {
            gameOver = true;
            mensajeEl.textContent = "El rival se quedó sin cartas. ¡Victoria!";
            audioMusicapelea.pause();
            audioWin.play();
            botonReiniciar.style.display = 'inline-block';
            botonJugar.style.display = 'none';
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
        audioAtaque.play();
    } else {
        if (cartaJugador.tipo === "defensa") {
            vidaJugador += cartaJugador.valor;
            mensajeEl.textContent = `${cartaJugador.name} te curó ${cartaJugador.valor} de vida.`;
            audioDefensa.play();
        }
      
    }

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


    function calcularEnemigosDesbloqueados() {
    const derrotados = JSON.parse(localStorage.getItem("enemigosDerrotados") || "[]");

    const orden = ["tatu", "tapir", "puma", "loboMarino"];
    const desbloqueados = [];

        for (let i = 0; i < orden.length; i++) {
            if (i === 0 || derrotados.includes(orden[i - 1])) {
                desbloqueados.push(orden[i]);
            } else {
                break;
            }
        }

        return desbloqueados;
    }

window.addEventListener('DOMContentLoaded', () => {    
    canvas = document.getElementById("canvas");
    if (canvas) {
        ctx = canvas.getContext("2d");
        canvas.style.backgroundImage = "none";
    }

    if (typeof audioSelectboton === 'undefined') {
        audioSelectboton = new Audio('audios/select_boton.wav');
        audioHovercarta = new Audio('audios/hover_carta.wav');
    }


    const botonJugar = document.getElementById('boton-jugar');
    const botonReiniciar = document.getElementById('boton-reiniciar');
    const botonComenzar = document.getElementById('boton-comenzar');

    if (botonComenzar) {
        const menuPrincipal = document.getElementById('menu-principal');
        botonComenzar.addEventListener('click', () => {
            const nombre = document.getElementById("nombre-usuario").value.trim();
            if (nombre === "") {
                alert("Por favor ingresá tu nombre.");
                return;
            }
            localStorage.setItem("usuarioPixelcard", nombre);
            audioSelectboton.play();
            menuPrincipal.classList.add('fade-out');
            setTimeout(() => {
                window.location.href = "select_enemy.html";
            }, 500);
        });
    }


    if (botonJugar) {
        botonJugar.addEventListener('click', playCard);

        botonReiniciar.addEventListener('click', () => {
            window.location.href = "select_enemy.html";
        });
    }
    if (botonMenuPrincipal) {
  botonMenuPrincipal.addEventListener('click', () => {
    window.location.href = "main_menu.html";
  });
}

    cargarEnemigosEnSelector();
});