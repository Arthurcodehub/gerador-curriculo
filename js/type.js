// jtypes.js

/**
 * Representa uma experiência profissional.
 *
 * @typedef {Object} Experiencia
 * @property {string} empresa
 * @property {string} cargo
 * @property {string} periodo
 * @property {string} descricao
 */

/**
 * Representa uma formação acadêmica.
 *
 * @typedef {Object} Formacao
 * @property {string} instituicao
 * @property {string} curso
 * @property {string} periodo
 */

/**
 * Representa o estado completo do currículo.
 *
 * @typedef {Object} DadosCurriculo
 * @property {string} nome
 * @property {string} cargo
 * @property {string} email
 * @property {string} telefone
 * @property {string} cidade
 * @property {string} resumo
 * @property {Experiencia[]} experiencias
 * @property {Formacao[]} formacao
 * @property {string[]} habilidades
 */