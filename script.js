gsap.registerPlugin(SplitText);

// ============================
// STATE
// ============================

let slideAtual = 0;
let transitando = false;

const slides = document.querySelectorAll(".slide");

// ============================
// NAVEGAÇÃO
// ============================

function irParaSlide(index) {
    if (transitando) return;
    transitando = true;

    slides[slideAtual].classList.remove("ativo");
    slideAtual = index;
    slides[slideAtual].classList.add("ativo");
    animarTitulo();

    setTimeout(() => {
        transitando = false;
    }, 1000);
}

function proximoSlide() {
    const next = slideAtual === slides.length - 1 ? 0 : slideAtual + 1;
    irParaSlide(next);
}

function slideAnterior() {
    const prev = slideAtual === 0 ? slides.length - 1 : slideAtual - 1;
    irParaSlide(prev);
}

// Clicar na lata menor (avançar)
document.querySelectorAll(".latas .lata-wrapper:last-child img").forEach((lata) => {
    lata.addEventListener("click", proximoSlide);
});

// Botões de navegação
document.querySelectorAll(".btn-nav:last-child").forEach((btn) => {
    btn.addEventListener("click", proximoSlide);
});

document.querySelectorAll(".btn-nav:first-child").forEach((btn) => {
    btn.addEventListener("click", slideAnterior);
});

// ============================
// ANIMAÇÃO DO TÍTULO
// ============================

function animarTitulo() {
    const split = SplitText.create(".slide.ativo h2", {
        type: "chars",
        mask: "chars",
    });

    gsap.from(split.chars, {
        y: "100%",
        duration: 0.5,
        stagger: 0.05,
        delay: 0.5,
    });
}

// ============================
// WHATSAPP
// ============================

document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const nome = document.getElementById("form-nome").value;
    const email = document.getElementById("form-email").value;
    const msg = document.getElementById("form-mensagem").value;
    const texto = `Olá! Meu nome é ${nome} (${email}). ${msg}`;
    const url = `https://wa.me/5521989898923?text=${encodeURIComponent(texto)}`;
    window.open(url, "_blank");
});
