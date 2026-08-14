//storage.js

const CHAVE_STORAGE = 'curriculo-dados';

/**
 * Salva o objeto de dados no localStorage.
 *
 * Retorna true quando a persistência foi concluída e false quando
 * o navegador não permitiu a operação.
 */
function salvarDados(dados) {
  try {
    const texto = JSON.stringify(dados);
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

    try {
      return JSON.parse(texto);
    } catch (erro) {
      console.warn('Dados salvos corrompidos. Ignorando o conteúdo.', erro);

      try {
        localStorage.removeItem(CHAVE_STORAGE);
      } catch (erroRemocao) {
        console.warn('Não foi possível remover os dados corrompidos.', erroRemocao);
      }
      
      return null;
    }
  } catch (erro) {
    console.warn('Não foi possível acessar os dados locais.', erro);
    return null;
  }
}

/**
 * Apaga os dados salvos.
 *
 * Retorna true quando a remoção foi concluída e false quando
 * o navegador não permitiu a operação.
 */
function limparDadosSalvos() {
  try {
    localStorage.removeItem(CHAVE_STORAGE);
    return true;
  } catch (erro) {
    console.warn('Não foi possível remover os dados locais.', erro);
    return false;
  }
}