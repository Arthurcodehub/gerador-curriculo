// app.js — orquestrador principal

// 1. Ao carregar a página, verifica se há dados salvos
const dadosSalvos = carregarDados();

if (dadosSalvos) {
  preencherFormulario(dadosSalvos);
  atualizarPreview(dadosSalvos);
} else {
  // Sem dados salvos: começa com um item vazio de cada
  adicionarExperiencia();
  adicionarFormacao();
}

// 2. Toda vez que o formulário mudar: atualiza o preview E salva
document.addEventListener('dadosAtualizados', (evento) => {
  atualizarPreview(evento.detail);
  salvarDados(evento.detail);
});

// 3. Botão "Limpar dados"
const btnLimpar = document.getElementById('btn-limpar');

btnLimpar.addEventListener('click', () => {
  const confirmar = confirm('Tem certeza que deseja apagar todos os dados preenchidos?');
  if (!confirmar) return;

  limparDadosSalvos();
  form.reset(); // método nativo do HTML que limpa todos os inputs
  listaExperiencias.innerHTML = '';
  listaFormacao.innerHTML = '';
  contadorExperiencia = 0;
  contadorFormacao = 0;
  adicionarExperiencia();
  adicionarFormacao();
  disparaAtualizacao();
});

// Botão "Exportar PDF"
const btnExportarPDF = document.getElementById('btn-exportar-pdf');

btnExportarPDF.addEventListener('click', () => {
  const camposValidos = Array.from(camposObrigatorios).every((input) => validarCampo(input));

  if (!camposValidos) {
    alert('Preencha os campos obrigatórios antes de exportar.');
    camposObrigatorios[0].focus();
    return;
  }

  window.print();
});