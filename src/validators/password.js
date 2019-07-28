/**
 * @description Config
 * @type {{length: number, hasSpecialSymbol: boolean, hasUppercase: boolean, hasLowercase: boolean}}
 */
export const config = {
  length: 8,
  hasSpecialSymbol: true,
  hasLowercase: true,
  hasUppercase: true
};

/**
 * @description Has lowercase
 * @param password
 * @returns {boolean}
 */
export const hasLowercase = (password) => /[a-z]/.test(password);

/**
 * @description Has uppercase
 * @param password
 * @returns {boolean}
 */
export const hasUppercase = (password) => /[A-Z]/.test(password);

/**
 * @description Has number
 * @param password
 * @returns {boolean}
 */
export const hasNumber = (password) => /\d/.test(password);

/**
 * @description Has special symbol
 * @param password
 * @returns {boolean}
 */
export const hasSpecialSymbol = (password) => /[~`!#$%^&*+=\-[\]\\;,/{}|":<>?]/g.test(password);
