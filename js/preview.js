// preview.js — traduz o objeto de dados em HTML visível na tela

const previewCurriculo = document.getElementById('preview-curriculo');

// Transforma texto perigoso em texto seguro (protege contra XSS)
function escapaHTML(texto) {
  const div = document.createElement('div');
  div.textContent = texto;
  return div.innerHTML;
}

// Monta o HTML do topo do currículo: nome, cargo, contatos
function renderizarCabecalho(dados) {
  const contatos = [dados.email, dados.telefone, dados.cidade]
    .filter((valor) => valor)       // remove os que estão vazios
    .map(escapaHTML)                // escapa cada um
    .join(' · ');                   // junta com um separador visual

  return `
    <header class="cv-cabecalho">
      <h1 class="cv-nome">${escapaHTML(dados.nome) || 'Seu nome aqui'}</h1>
      ${dados.cargo ? `<p class="cv-cargo">${escapaHTML(dados.cargo)}</p>` : ''}
      ${contatos ? `<p class="cv-contatos">${contatos}</p>` : ''}
    </header>
  `;
}

// Função "genérica" reaproveitada por várias seções — evita repetir código
function renderizarSecao(titulo, conteudoHTML) {
  if (!conteudoHTML) return '';
  return `
    <section class="cv-secao">
      <h2 class="cv-secao-titulo">${titulo}</h2>
      ${conteudoHTML}
    </section>
  `;
}

function renderizarResumo(dados) {
  if (!dados.resumo) return '';
  return renderizarSecao('Resumo', `<p class="cv-texto">${escapaHTML(dados.resumo)}</p>`);
}

function renderizarExperiencias(dados) {
  const itensValidos = dados.experiencias.filter((exp) => exp.empresa || exp.cargo);
  if (itensValidos.length === 0) return '';

  const itensHTML = itensValidos.map((exp) => `
    <article class="cv-item">
      <div class="cv-item-topo">
        <strong class="cv-item-titulo">${escapaHTML(exp.cargo || 'Cargo')}</strong>
        ${exp.periodo ? `<span class="cv-item-periodo">${escapaHTML(exp.periodo)}</span>` : ''}
      </div>
      ${exp.empresa ? `<p class="cv-item-subtitulo">${escapaHTML(exp.empresa)}</p>` : ''}
      ${exp.descricao ? `<p class="cv-texto">${escapaHTML(exp.descricao)}</p>` : ''}
    </article>
  `).join('');

  return renderizarSecao('Experiência Profissional', itensHTML);
}

function renderizarFormacao(dados) {
  const itensValidos = dados.formacao.filter((f) => f.instituicao || f.curso);
  if (itensValidos.length === 0) return '';

  const itensHTML = itensValidos.map((f) => `
    <article class="cv-item">
      <div class="cv-item-topo">
        <strong class="cv-item-titulo">${escapaHTML(f.curso || 'Curso')}</strong>
        ${f.periodo ? `<span class="cv-item-periodo">${escapaHTML(f.periodo)}</span>` : ''}
      </div>
      ${f.instituicao ? `<p class="cv-item-subtitulo">${escapaHTML(f.instituicao)}</p>` : ''}
    </article>
  `).join('');

  return renderizarSecao('Formação Acadêmica', itensHTML);
}

function renderizarHabilidades(dados) {
  if (dados.habilidades.length === 0) return '';
  const tagsHTML = dados.habilidades
    .map((h) => `<span class="cv-tag">${escapaHTML(h)}</span>`)
    .join('');
  return renderizarSecao('Habilidades', `<div class="cv-tags">${tagsHTML}</div>`);
}

// Junta todas as seções numa string de HTML só
function montarHTMLCurriculo(dados) {
  return `
    ${renderizarCabecalho(dados)}
    ${renderizarResumo(dados)}
    ${renderizarExperiencias(dados)}
    ${renderizarFormacao(dados)}
    ${renderizarHabilidades(dados)}
  `;
}

// Função chamada de fora (pelo app.js) — decide o que mostrar na tela
function atualizarPreview(dados) {
  const temAlgumDado = dados.nome || dados.email || dados.resumo ||
    dados.experiencias.some((e) => e.empresa || e.cargo) ||
    dados.formacao.some((f) => f.instituicao || f.curso) ||
    dados.habilidades.length > 0;

  if (!temAlgumDado) {
    previewCurriculo.innerHTML = '<p class="preview-vazio">Seu currículo aparecerá aqui conforme você preenche o formulário.</p>';
    return;
  }

  previewCurriculo.innerHTML = montarHTMLCurriculo(dados);
}