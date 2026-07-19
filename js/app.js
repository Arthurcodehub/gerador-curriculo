// app.js — orquestrador principal 

document.addEventListener('dadosAtualizados', (evento) => {
  console.log('Dados do currículo:', evento.detail);
});