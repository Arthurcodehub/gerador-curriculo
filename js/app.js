// app.js — orquestrador principal

document.addEventListener('dadosAtualizados', (evento) => {
  atualizarPreview(evento.detail);
});