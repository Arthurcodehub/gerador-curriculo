//storage.js

const CHAVE_STORAGE = 'curriculo-dados';

const LIMITE_EXPERIENCIAS = 50;
const LIMITE_FORMACAO = 50;
const LIMITE_HABILIDADES = 50;

const CAMPOS_PESSOAIS = [
  'nome',
  'cargo',
  'email',
  'telefone',
  'cidade',
  'resumo',
];

const CAMPOS_EXPERIENCIA = [
  'empresa',
  'cargo',
  'periodo',
  'descricao',
];

const CAMPOS_FORMACAO = [
  'instituicao',
  'curso',
  'periodo',
];

function ehObjeto(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function normalizarString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function normalizarObjeto(value, campos) {
  if (!ehObjeto(value)) return null;

  const resultado = {};

  campos.forEach((campo) => {
    resultado[campo] = normalizarString(value[campo]);
  });

  return resultado;
}

function normalizarItens(value, limite, campos) {
  if (!Array.isArray(value)) return [];

  return value
    .slice(0, limite)
    .map((item) => normalizarObjeto(item, campos))
    .filter(Boolean);
}

function normalizarHabilidades(value) {
  if (!Array.isArray(value)) return [];

  return value
    .slice(0, LIMITE_HABILIDADES)
    .map(normalizarString)
    .filter((habilidade) => habilidade.length > 0);
}

function normalizarDados(value) {
  if (!ehObjeto(value)) return null;

  const dados = {};

  CAMPOS_PESSOAIS.forEach((campo) => {
    dados[campo] = normalizarString(value[campo]);
  });

  dados.experiencias = normalizarItens(
    value.experiencias,
    LIMITE_EXPERIENCIAS,
    CAMPOS_EXPERIENCIA,
  );

  dados.formacao = normalizarItens(
    value.formacao,
    LIMITE_FORMACAO,
    CAMPOS_FORMACAO,
  );

  dados.habilidades = normalizarHabilidades(value.habilidades);

  return dados;
}

function salvarDados(dados) {
  try {
    const dadosNormalizados = normalizarDados(dados);

    if (!dadosNormalizados) {
      console.warn('Dados inválidos. A persistência foi ignorada.');
      return false;
    }

    const texto = JSON.stringify(dadosNormalizados);
    localStorage.setItem(CHAVE_STORAGE, texto);
    return true;
  } catch (erro) {
    console.warn('Não foi possível salvar os dados localmente.', erro);
    return false;
  }
}

function carregarDados() {
  try {
    const texto = localStorage.getItem(CHAVE_STORAGE);

    if (!texto) return null;

    let dados;

    try {
      dados = JSON.parse(texto);
    } catch (erro) {
      console.warn('Dados salvos corrompidos. Ignorando o conteúdo.', erro);
      return null;
    }

    const dadosNormalizados = normalizarDados(dados);

    if (!dadosNormalizados) {
      console.warn('Dados salvos possuem estrutura inválida. Ignorando o conteúdo.');
      return null;
    }

    return dadosNormalizados;
  } catch (erro) {
    console.warn('Não foi possível acessar os dados locais.', erro);
    return null;
  }
}

function limparDadosSalvos() {
  try {
    localStorage.removeItem(CHAVE_STORAGE);
    return true;
  } catch (erro) {
    console.warn('Não foi possível remover os dados locais.', erro);
    return false;
  }
}