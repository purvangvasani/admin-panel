/**
 * Builds error object
 * @param {number} code - error code
 * @param {string} message - error text
 */
const buildErrObject = (code = '', message = '') => {
    return {
        success: false,
        code,
        message
    }
  }
  
  module.exports = { buildErrObject }
  