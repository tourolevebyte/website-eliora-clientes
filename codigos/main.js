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