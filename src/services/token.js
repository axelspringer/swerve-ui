import { getItem, removeItem, setItem } from "./storage";

const TOKEN_STORAGE_KEY = "swerve_access_token";
const ENDPOINT_STORAGE_KEY = "swerve_endpoint";

/**
 * 
 * @param {string} token 
 */
const setLoginData = (data) => {
  setItem(TOKEN_STORAGE_KEY, data.token);
  setItem(ENDPOINT_STORAGE_KEY, data.endpoint)
};

/**
 * @returns {string}
 */
const getToken = () => {
  return getItem(TOKEN_STORAGE_KEY);
};

const getEndpoint = () => {
  return getItem(ENDPOINT_STORAGE_KEY);
};

const clearLoginData = () => {
  removeItem(TOKEN_STORAGE_KEY);
};

/**
 * @returns {boolean}
 */
const isValid = () => {
  return !!getToken() && !!getEndpoint();
};

export { TOKEN_STORAGE_KEY, getToken, getEndpoint, clearLoginData, setLoginData, isValid };