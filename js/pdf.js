// pdf.js — gera o PDF com texto real (sem canvas), desenhando
// cada linha manualmente com base no objeto de dados do formulário

function gerarPDFTextoReal(dados) {
  const { jsPDF } = window.jspdf; // a lib expõe jsPDF dentro de window.jspdf
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });

  // Margens e largura útil (A4 tem 210mm de largura)
  const margemEsquerda = 15;
  const margemDireita = 195;
  const larguraUtil = margemDireita - margemEsquerda;
  const limiteInferior = 280; // onde a página "acaba" antes da margem de baixo
  let cursorY = 20;

  // Cores extraídas das mesmas variáveis CSS do projeto, em RGB
  const corPreta = [15, 23, 42];
  const corCinza = [100, 116, 139];
  const corAzul = [37, 99, 235];

  // Verifica se cabe mais conteúdo na página atual; se não, cria página nova
  function quebraPaginaSeNecessario(alturaEstimativa) {
    if (cursorY + alturaEstimativa > limiteInferior) {
      doc.addPage();
      cursorY = 20;
    }
  }

  // Escreve um texto longo quebrando em várias linhas automaticamente
  function escreverTextoComQuebra(texto, tamanhoFonte, cor, espacamentoLinha) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(tamanhoFonte);
    doc.setTextColor(...cor);
    const linhas = doc.splitTextToSize(texto, larguraUtil);
    quebraPaginaSeNecessario(linhas.length * espacamentoLinha);
    linhas.forEach((linha) => {
      doc.text(linha, margemEsquerda, cursorY);
      cursorY += espacamentoLinha;
    });
  }

  // Desenha o título de uma seção com linha embaixo, igual ao preview
  function escreverTituloSecao(texto) {
    quebraPaginaSeNecessario(10);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(...corCinza);
    doc.text(texto.toUpperCase(), margemEsquerda, cursorY);
    cursorY += 2;
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.2);
    doc.line(margemEsquerda, cursorY, margemDireita, cursorY);
    cursorY += 6;
  }

  // --- CABEÇALHO ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(...corPreta);
  doc.text(dados.nome || 'Seu nome aqui', margemEsquerda, cursorY);
  cursorY += 8;

  if (dados.cargo) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.setTextColor(...corAzul);
    doc.text(dados.cargo, margemEsquerda, cursorY);
    cursorY += 6;
  }

  const contatos = [dados.email, dados.telefone, dados.cidade]
    .filter((valor) => valor)
    .join('   ·   ');

  if (contatos) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...corCinza);
    doc.text(contatos, margemEsquerda, cursorY);
    cursorY += 5;
  }

  cursorY += 2;
  doc.setDrawColor(...corPreta);
  doc.setLineWidth(0.5);
  doc.line(margemEsquerda, cursorY, margemDireita, cursorY);
  cursorY += 8;

  // --- RESUMO ---
  if (dados.resumo) {
    escreverTituloSecao('Resumo');
    escreverTextoComQuebra(dados.resumo, 10, corCinza, 5);
    cursorY += 4;
  }

  // --- EXPERIÊNCIAS ---
  const experienciasValidas = dados.experiencias.filter((exp) => exp.empresa || exp.cargo);

  if (experienciasValidas.length > 0) {
    escreverTituloSecao('Experiência Profissional');

    experienciasValidas.forEach((exp) => {
      quebraPaginaSeNecessario(12);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(...corPreta);
      doc.text(exp.cargo || 'Cargo', margemEsquerda, cursorY);

      // Período alinhado à direita: calcula a largura do texto pra
      // posicionar ele encostado na margem direita, não na esquerda
      if (exp.periodo) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(...corCinza);
        const larguraTexto = doc.getTextWidth(exp.periodo);
        doc.text(exp.periodo, margemDireita - larguraTexto, cursorY);
      }
      cursorY += 5;

      if (exp.empresa) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(...corAzul);
        doc.text(exp.empresa, margemEsquerda, cursorY);
        cursorY += 5;
      }

      if (exp.descricao) {
        escreverTextoComQuebra(exp.descricao, 9.5, corCinza, 4.5);
      }
      cursorY += 4;
    });
  }

  // --- FORMAÇÃO ---
  const formacaoValida = dados.formacao.filter((f) => f.instituicao || f.curso);

  if (formacaoValida.length > 0) {
    escreverTituloSecao('Formação Acadêmica');

    formacaoValida.forEach((f) => {
      quebraPaginaSeNecessario(10);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(...corPreta);
      doc.text(f.curso || 'Curso', margemEsquerda, cursorY);

      if (f.periodo) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(...corCinza);
        const larguraTexto = doc.getTextWidth(f.periodo);
        doc.text(f.periodo, margemDireita - larguraTexto, cursorY);
      }
      cursorY += 5;

      if (f.instituicao) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(...corAzul);
        doc.text(f.instituicao, margemEsquerda, cursorY);
        cursorY += 5;
      }
      cursorY += 4;
    });
  }

  // --- HABILIDADES ---
  if (dados.habilidades.length > 0) {
    escreverTituloSecao('Habilidades');
    escreverTextoComQuebra(dados.habilidades.join('   •   '), 10, corPreta, 5);
  }

  // Nome do arquivo baseado no nome digitado, sem espaços
  const nomeArquivo = (dados.nome || 'curriculo').trim().replace(/\s+/g, '-');
  doc.save(`${nomeArquivo}.pdf`);
}