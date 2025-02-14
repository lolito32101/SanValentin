document.addEventListener("DOMContentLoaded", function () {
    const audio = new Audio("EnOtraVida.mp3");

    const playAudio = () => {
        audio.play().catch(error => {
            console.log("Reproducción automática bloqueada, esperando interacción del usuario.");
        });
    };

    playAudio();

    document.body.addEventListener("click", () => {
        audio.play();
    }, { once: true });
});

document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});

document.addEventListener('keydown', function (e) {
    if (e.key === 'F12') {
        e.preventDefault();
    }
    if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault();
    }
    if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
    }
});

//const fechaObjetivo = Date.now() + 5000; 5 segundos
const fechaObjetivo = new Date("2025-02-14T01:40:00-05:00").getTime();

function obtenerTiempoRestante() {
    let ahora = Date.now();
    let tiempoRestante = Math.max(0, Math.floor((fechaObjetivo - ahora) / 1000));
    return tiempoRestante;
}


function formatearTiempo(segundos) {
    let dias = Math.floor(segundos / 86400);
    let horas = Math.floor((segundos % 86400) / 3600);
    let minutos = Math.floor((segundos % 3600) / 60);
    let segundosRestantes = segundos % 60;
    return `${String(dias).padStart(2, '0')}d : ${String(horas).padStart(2, '0')}h : ${String(minutos).padStart(2, '0')}m : ${String(segundosRestantes).padStart(2, '0')}s`;
}

function actualizarContador() {
    let contadorElemento = document.getElementById("contador");
    let descargaElemento = document.getElementById("descarga");
    let tiempoRestante = obtenerTiempoRestante();

    if (tiempoRestante > 0) {
        contadorElemento.textContent = formatearTiempo(tiempoRestante);
    } else {
        contadorElemento.style.display = "none"; // Oculta el h1
        descargaElemento.style.display = "block"; // Muestra el botón
        clearInterval(intervalo); // Detiene el contador
    }
}

function iniciarContador() {
    actualizarContador();
    intervalo = setInterval(actualizarContador, 1000);
}

let intervalo;
iniciarContador();
