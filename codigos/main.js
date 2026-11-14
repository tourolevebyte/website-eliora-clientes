gsap.registerPlugin(ScrollToPlugin, Observer);

const secoes = gsap.utils.toArray("main > section");

let secaoAtual = 0;
let animando = false;

function irParaSecao(indice) {
  indice = gsap.utils.clamp(0, secoes.length - 1, indice);

  if (animando || indice === secaoAtual) return;

  animando = true;
  secaoAtual = indice;

  gsap.to(window, {
    duration: 1.8,
    scrollTo: {
      y: secoes[indice],
      autoKill: false
    },
    ease: "power3.inOut",
    overwrite: true,

    onComplete: () => {
      animando = false;
    }
  });
}

secaoAtual = secoes.reduce((maisProxima, secao, indice) => {
  const distancia = Math.abs(
    secao.offsetTop - window.scrollY
  );

  const distanciaAtual = Math.abs(
    secoes[maisProxima].offsetTop - window.scrollY
  );

  return distancia < distanciaAtual ? indice : maisProxima;
}, 0);

Observer.create({
  target: window,
  type: "wheel,touch",
  preventDefault: true,
  tolerance: 20,
  wheelSpeed: 1,

  onDown: () => {
    irParaSecao(secaoAtual + 1);
  },

  onUp: () => {
    irParaSecao(secaoAtual - 1);
  }
});

window.addEventListener("keydown", (e) => {
  if (["ArrowDown", "PageDown", " "].includes(e.key)) {
    e.preventDefault();
    irParaSecao(secaoAtual + 1);
  }

  if (["ArrowUp", "PageUp"].includes(e.key)) {
    e.preventDefault();
    irParaSecao(secaoAtual - 1);
  }

  if (e.key === "Home") {
    e.preventDefault();
    irParaSecao(0);
  }

  if (e.key === "End") {
    e.preventDefault();
    irParaSecao(secoes.length - 1);
  }
});

const tituloPrc = document.querySelector('#secao1 h1');
const textoPrc = document.querySelector('#secao1 span');
const ramo = document.getElementById('ramo_de_oliveira');

function animar(el, tag, delay) {
  if (!tag || !el) return;

  if (tag === 'deslizar-para-direita') {
    const larguraFinal = el.getBoundingClientRect().width;

    el.style.clipPath = 'inset(0 100% 0 0)';
    el.style.opacity = '0';

    setTimeout(() => {
      el.style.transition = 'clip-path 0.8s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.6s ease';
      el.style.clipPath = 'inset(0 0% 0 0)';
      el.style.opacity = '0.5';
    }, 1000);
  }
  if (tag === 'surgir-para-cima') {
    const [direcao, valorComUnidade] = el.dataset.ani.split('_');
    const match = valorComUnidade.match(/^(-?\d+(?:\.\d+)?)(.*)$/);

    if (match) {
      const valorFinal = Number(match[1]);
      const unidade = match[2] || 'px';
      const prop = direcao === 'b' ? 'bottom' : 'top';
      const tempoInicio = delay || 200;

      el.style.transition = 'none';
      el.style[prop] = `${valorFinal - 2}${unidade}`;
      el.style.opacity = '0';

      setTimeout(() => {
        el.style.transition = `${prop} 0.8s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.6s ease, box-shadow 0.5s ease, transform 0.8s ease`;
        el.style[prop] = `${valorFinal + 2}${unidade}`;
        el.style.opacity = '0.75';
      }, tempoInicio);

      setTimeout(() => {
        el.style[prop] = `${valorFinal}${unidade}`;
        el.style.opacity = '1';
      }, tempoInicio + 600);
    }
  }

}

animar(tituloPrc, 'deslizar-para-direita');
animar(textoPrc, 'surgir-para-cima');

document.querySelectorAll('#secao1 button').forEach((botao, indice) => {
  animar(botao, 'surgir-para-cima', indice * 800);
});