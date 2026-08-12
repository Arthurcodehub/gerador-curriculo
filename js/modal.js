// modal.js — substitui alert()/confirm() nativos por um modal
// customizado, mantendo o mesmo visual do resto do site

const modalOverlay = document.getElementById('modal-overlay');
const modalCaixa = modalOverlay.querySelector('.modal-caixa');
const modalTitulo = document.getElementById('modal-titulo');
const modalMensagem = document.getElementById('modal-mensagem');
const modalBtnCancelar = document.getElementById('modal-btn-cancelar');
const modalBtnConfirmar = document.getElementById('modal-btn-confirmar');

let elementoComFocoAntes = null;

/**
 * Abre o modal em modo "confirmação" (dois botões).
 * Devolve uma Promise que resolve `true` se confirmar, `false` se cancelar —
 * isso permite usar com `await`, parecido com o confirm() nativo.
 */
function confirmarModal(titulo, mensagem) {
  return new Promise((resolve) => {
    abrirModal(titulo, mensagem, false);

    function limpar() {
      modalBtnConfirmar.removeEventListener('click', aoConfirmar);
      modalBtnCancelar.removeEventListener('click', aoCancelar);
      fecharModal();
    }

    function aoConfirmar() {
      limpar();
      resolve(true);
    }

    function aoCancelar() {
      limpar();
      resolve(false);
    }

    modalBtnConfirmar.addEventListener('click', aoConfirmar);
    modalBtnCancelar.addEventListener('click', aoCancelar);
  });
}

/**
 * Abre o modal em modo "aviso" (um botão só, tipo alert()).
 */
function alertaModal(titulo, mensagem) {
  return new Promise((resolve) => {
    abrirModal(titulo, mensagem, true);

    function limpar() {
      modalBtnConfirmar.removeEventListener('click', aoConfirmar);
      fecharModal();
    }

    function aoConfirmar() {
      limpar();
      resolve();
    }

    modalBtnConfirmar.addEventListener('click', aoConfirmar);
  });
}

function abrirModal(titulo, mensagem, somenteOk) {
  elementoComFocoAntes = document.activeElement; // pra devolver o foco depois
  modalTitulo.textContent = titulo;
  modalMensagem.textContent = mensagem;
  modalCaixa.classList.toggle('modal-somente-ok', somenteOk);
  modalOverlay.hidden = false;
  modalBtnConfirmar.focus();

  document.addEventListener('keydown', aoPressionarEsc);
}

function fecharModal() {
  modalOverlay.hidden = true;
  document.removeEventListener('keydown', aoPressionarEsc);
  if (elementoComFocoAntes) elementoComFocoAntes.focus(); // devolve o foco de onde veio
}

function aoPressionarEsc(evento) {
  if (evento.key === 'Escape') {
    modalBtnCancelar.click();
  }
}