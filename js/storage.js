// storage.js — responsável por salvar e recuperar dados do localStorage

const CHAVE_STORAGE = 'curriculo-dados';

/**
 * Salva o objeto de dados no localStorage.
 * Precisa converter pra texto (JSON.stringify) porque localStorage
 * só aceita strings.
 */
function salvarDados(dados) {
  const texto = JSON.stringify(dados);
  localStorage.setItem(CHAVE_STORAGE, texto);
}

/**
 * Recupera os dados salvos, já convertidos de volta pra objeto.
 * Se não existir nada salvo, ou se o conteúdo estiver corrompido
 * (adulterado manualmente, por exemplo), devolve null com segurança.
 */
function carregarDados() {
  const texto = localStorage.getItem(CHAVE_STORAGE);
  if (!texto) return null;

  try {
    return JSON.parse(texto);
  } catch (erro) {
    console.error('Dados salvos corrompidos, ignorando e limpando:', erro);
    localStorage.removeItem(CHAVE_STORAGE);
    return null;
  }
}

/**
 * Apaga os dados salvos.
 */
function limparDadosSalvos() {
  localStorage.removeItem(CHAVE_STORAGE);
}