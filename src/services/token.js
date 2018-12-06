import { getItem, removeItem, setItem } from "./storage";

const TOKEN_STORAGE_KEY = "swerve_access_token";

/**
 * 
 * @param {string} token 
 */
const setToken = (token) => {
  return setItem(TOKEN_STORAGE_KEY, token);
};

/**
 * @returns {string}
 */
const getToken = () => {
  return getItem(TOKEN_STORAGE_KEY);
};

const clearToken = () => {
  return removeItem(TOKEN_STORAGE_KEY);
};

/**
 * @returns {boolean}
 */
const isValid = () => {
  return !!getToken();
};

export { TOKEN_STORAGE_KEY, getToken, clearToken, setToken, isValid };