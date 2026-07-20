// form.js — responsável por capturar dados do formulário e gerenciar
// os itens dinâmicos (experiência e formação)

// Contador usado só pra gerar IDs únicos nos itens dinâmicos
let contadorExperiencia = 0;
let contadorFormacao = 0;

// Referências aos elementos principais do DOM
const form = document.getElementById('form-curriculo');
const listaExperiencias = document.getElementById('lista-experiencias');
const listaFormacao = document.getElementById('lista-formacao');
const btnAddExperiencia = document.getElementById('btn-add-experiencia');
const btnAddFormacao = document.getElementById('btn-add-formacao');

function criarItemExperiencia(id) {
  const div = document.createElement('div');
  div.className = 'item-dinamico';
  div.dataset.id = id;

  div.innerHTML = `
    <div class="item-dinamico-header">
      <span class="item-dinamico-titulo">Experiência</span>
      <button type="button" class="btn-remover" data-remover="experiencia" data-id="${id}" aria-label="Remover esta experiência">
        Remover
      </button>
    </div>

    <div class="campo">
      <label for="empresa-${id}">Empresa</label>
      <input type="text" id="empresa-${id}" name="empresa-${id}" data-campo="empresa">
    </div>

    <div class="campo">
      <label for="cargo-exp-${id}">Cargo</label>
      <input type="text" id="cargo-exp-${id}" name="cargo-exp-${id}" data-campo="cargo">
    </div>

    <div class="campo">
      <label for="periodo-exp-${id}">Período</label>
      <input type="text" id="periodo-exp-${id}" name="periodo-exp-${id}" data-campo="periodo" placeholder="Ex: Jan 2023 - Atual">
    </div>

    <div class="campo">
      <label for="descricao-exp-${id}">Descrição das atividades</label>
      <textarea id="descricao-exp-${id}" name="descricao-exp-${id}" data-campo="descricao" rows="3"></textarea>
    </div>
  `;

  return div;
}

/**
 * Cria o HTML de um item de formação acadêmica.
 */
function criarItemFormacao(id) {
  const div = document.createElement('div');
  div.className = 'item-dinamico';
  div.dataset.id = id;

  div.innerHTML = `
    <div class="item-dinamico-header">
      <span class="item-dinamico-titulo">Formação</span>
      <button type="button" class="btn-remover" data-remover="formacao" data-id="${id}" aria-label="Remover esta formação">
        Remover
      </button>
    </div>

    <div class="campo">
      <label for="instituicao-${id}">Instituição</label>
      <input type="text" id="instituicao-${id}" name="instituicao-${id}" data-campo="instituicao">
    </div>

    <div class="campo">
      <label for="curso-${id}">Curso</label>
      <input type="text" id="curso-${id}" name="curso-${id}" data-campo="curso">
    </div>

    <div class="campo">
      <label for="periodo-form-${id}">Período</label>
      <input type="text" id="periodo-form-${id}" name="periodo-form-${id}" data-campo="periodo" placeholder="Ex: 2020 - 2024">
    </div>
  `;

  return div;
}

/**
 * Adiciona um novo item de experiência na tela.
 */
function adicionarExperiencia() {
  contadorExperiencia++;
  const item = criarItemExperiencia(contadorExperiencia);
  listaExperiencias.appendChild(item);
  disparaAtualizacao();
}

/**
 * Adiciona um novo item de formação na tela.
 */
function adicionarFormacao() {
  contadorFormacao++;
  const item = criarItemFormacao(contadorFormacao);
  listaFormacao.appendChild(item);
  disparaAtualizacao();
}

/**
 * Percorre todos os itens dinâmicos de um container (experiência ou formação)
 * e monta um array de objetos com os dados de cada um.
 */
function coletarItensDinamicos(container) {
  const itens = container.querySelectorAll('.item-dinamico');
  const resultado = [];

  itens.forEach((item) => {
    const campos = item.querySelectorAll('[data-campo]');
    const objeto = {};

    campos.forEach((campo) => {
      objeto[campo.dataset.campo] = campo.value.trim();
    });

    resultado.push(objeto);
  });

  return resultado;
}

/**
 * Monta o objeto completo com TODOS os dados do currículo.
 * Essa é a função central da etapa 3 — o preview (etapa 4) vai
 * receber exatamente esse formato.
 */
function coletarDadosFormulario() {
  return {
    nome: document.getElementById('nome').value.trim(),
    cargo: document.getElementById('cargo').value.trim(),
    email: document.getElementById('email').value.trim(),
    telefone: document.getElementById('telefone').value.trim(),
    cidade: document.getElementById('cidade').value.trim(),
    resumo: document.getElementById('resumo').value.trim(),
    experiencias: coletarItensDinamicos(listaExperiencias),
    formacao: coletarItensDinamicos(listaFormacao),
    habilidades: document.getElementById('habilidades').value
      .split(',')
      .map((h) => h.trim())
      .filter((h) => h.length > 0), // remove strings vazias (ex: vírgula sobrando)
  };
}

function disparaAtualizacao() {
  const dados = coletarDadosFormulario();
  const evento = new CustomEvent('dadosAtualizados', { detail: dados });
  document.dispatchEvent(evento);
}

function removerItem(tipo, id) {
  const container = tipo === 'experiencia' ? listaExperiencias : listaFormacao;
  const item = container.querySelector(`[data-id="${id}"]`);
  if (item) {
    item.remove();
    disparaAtualizacao();
  }
}

// --- EVENT LISTENERS ---

// Botões de adicionar
btnAddExperiencia.addEventListener('click', adicionarExperiencia);
btnAddFormacao.addEventListener('click', adicionarFormacao);

// Event delegation: um único listener no form inteiro escuta
// digitação em QUALQUER input/textarea, mesmo os criados depois
form.addEventListener('input', disparaAtualizacao);

// Event delegation pros botões "Remover" dos itens dinâmicos,
// que também são criados depois e não existiam quando a página carregou
form.addEventListener('click', (evento) => {
  const botao = evento.target.closest('[data-remover]');
  if (botao) {
    removerItem(botao.dataset.remover, botao.dataset.id);
  }
});

/**
 * Preenche o formulário inteiro a partir de um objeto de dados salvo.
 * É o "inverso" de coletarDadosFormulario().
 */
function preencherFormulario(dados) {
  document.getElementById('nome').value = dados.nome || '';
  document.getElementById('cargo').value = dados.cargo || '';
  document.getElementById('email').value = dados.email || '';
  document.getElementById('telefone').value = dados.telefone || '';
  document.getElementById('cidade').value = dados.cidade || '';
  document.getElementById('resumo').value = dados.resumo || '';
  document.getElementById('habilidades').value = (dados.habilidades || []).join(', ');

  // Limpa os itens dinâmicos padrão antes de recriar com os dados salvos
  listaExperiencias.innerHTML = '';
  listaFormacao.innerHTML = '';
  contadorExperiencia = 0;
  contadorFormacao = 0;

  (dados.experiencias || []).forEach((exp) => {
    contadorExperiencia++;
    const item = criarItemExperiencia(contadorExperiencia);
    listaExperiencias.appendChild(item);

    // Preenche os campos desse item específico que acabamos de criar
    item.querySelector('[data-campo="empresa"]').value = exp.empresa || '';
    item.querySelector('[data-campo="cargo"]').value = exp.cargo || '';
    item.querySelector('[data-campo="periodo"]').value = exp.periodo || '';
    item.querySelector('[data-campo="descricao"]').value = exp.descricao || '';
  });

  (dados.formacao || []).forEach((f) => {
    contadorFormacao++;
    const item = criarItemFormacao(contadorFormacao);
    listaFormacao.appendChild(item);

    item.querySelector('[data-campo="instituicao"]').value = f.instituicao || '';
    item.querySelector('[data-campo="curso"]').value = f.curso || '';
    item.querySelector('[data-campo="periodo"]').value = f.periodo || '';
  });

  // Se não havia nenhuma experiência/formação salva, garante ao menos 1 item vazio
  if ((dados.experiencias || []).length === 0) adicionarExperiencia();
  if ((dados.formacao || []).length === 0) adicionarFormacao();
}