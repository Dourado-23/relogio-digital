
const hh = document.getElementById("hh");
const mm = document.getElementById("mm");
const ss = document.getElementById("ss");
const hora = document.getElementById("hora");
const regua = document.getElementById("regua");
const dataEl = document.getElementById("data");
const fuso = document.getElementById("fuso");
const periodo = document.getElementById("periodo");
const botao = document.getElementById("formato");

const formatoData = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
});

function dois(n) {
    return String(n).padStart(2, "0");
}

let formato12 = false;

function atualizar() {
    const agora = new Date();
    let h = agora.getHours();

    // Formato de 12 ou 24 horas
    if (formato12) {
        periodo.textContent = h < 12 ? "AM" : "PM";
        h = h % 12 || 12;
    }

    periodo.hidden = !formato12;

    // Atualiza o relógio
    hh.textContent = dois(h);
    mm.textContent = dois(agora.getMinutes());
    ss.textContent = dois(agora.getSeconds());

    // Atualiza a data
    dataEl.textContent = formatoData.format(agora);

    // Atualiza a régua dos segundos
    regua.style.transform =
        `scaleX(${agora.getSeconds() / 60})`;

    // Atualiza o elemento de horário, se existir
    hora.textContent = agora.toLocaleTimeString("pt-BR", {
        hour12: formato12
    });
}

// Registra o clique apenas uma vez
botao.addEventListener("click", () => {
    formato12 = !formato12;

    botao.textContent = formato12
        ? "Formato 24 h"
        : "Formato 12 h";

    atualizar();
});

// Mostra o fuso horário local
fuso.textContent =
    Intl.DateTimeFormat().resolvedOptions().timeZone;

// Sincroniza o relógio com os segundos
function ciclo() {
    atualizar();
    setTimeout(ciclo, 1000 - (Date.now() % 1000));
}

ciclo();
