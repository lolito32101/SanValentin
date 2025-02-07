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



let tiempoRestante = localStorage.getItem("contador") ? parseInt(localStorage.getItem("contador")) : 5; // 10 minutos en segundos
/* 

RESETEAR CONTADOR
let tiempoRestante = 5; // Siempre inicia en 5 SEGUNDOS
localStorage.setItem("contador", tiempoRestante); 

*/



let tiempoInicial = 10 * 60 * 1000; // 10 minutos en milisegundos

        function obtenerTiempoRestante() {
            let tiempoFin = localStorage.getItem("tiempoFin");

            if (!tiempoFin) {
                let ahora = Date.now();
                tiempoFin = ahora + tiempoInicial;
                localStorage.setItem("tiempoFin", tiempoFin);
            }

            let tiempoRestante = Math.max(0, Math.floor((tiempoFin - Date.now()) / 1000));
            return tiempoRestante;
        }

        function formatearTiempo(segundos) {
            let minutos = Math.floor(segundos / 60);
            let segundosRestantes = segundos % 60;
            return `${String(minutos).padStart(2, '0')}:${String(segundosRestantes).padStart(2, '0')}`;
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
                localStorage.removeItem("tiempoFin"); // Borra el tiempo guardado
                clearInterval(intervalo); // Detiene el contador
            }
        }

        function iniciarContador() {
            actualizarContador();
            intervalo = setInterval(actualizarContador, 1000);
        }

        let intervalo;
        iniciarContador();