/**
 * Builds success object
 * @param {string} message - success text
 */
const buildSuccObject = (message = '') => {
    return {
        success: true,
        msg: message
    }
  }
  
  module.exports = { buildSuccObject }
  