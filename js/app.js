// @ts-nocheck
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

btnLimpar.addEventListener('click', async () => {
  const confirmar = await confirmarModal(
    'Limpar todos os dados?',
    'Essa ação vai apagar tudo que você preencheu. Não é possível desfazer.'
  );
  if (!confirmar) return;

  limparDadosSalvos();
  form.reset();
  listaExperiencias.innerHTML = '';
  listaFormacao.innerHTML = '';
  contadorExperiencia = 0;
  contadorFormacao = 0;
  adicionarExperiencia();
  adicionarFormacao();
  disparaAtualizacao();
});

// 4. Botão "Exportar PDF"
const btnExportarPDF = document.getElementById('btn-exportar-pdf');

btnExportarPDF.addEventListener('click', async () => {
  const camposValidos = Array.from(camposObrigatorios).every((input) => validarCampo(input));

  if (!camposValidos) {
    await alertaModal('Campos obrigatórios', 'Preencha os campos obrigatórios antes de exportar.');
    camposObrigatorios[0].focus();
    return;
  }

  // Verifica se jsPDF carregou corretamente
  if (typeof jsPDF === 'undefined') {
    await alertaModal('Erro', 'Biblioteca de PDF não carregou. Tente recarregar a página.');
    return;
  }

  const dados = coletarDadosFormulario();
  gerarPDFTextoReal(dados);
  mostrarToast('PDF exportado com sucesso ✓');
});;


  