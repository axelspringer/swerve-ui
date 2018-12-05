/**
 * 
 * @param {string} key 
 */
const getItem = (key) => {
  return localStorage.getItem(key);
};

/**
 * 
 * @param {string} key 
 * @param {*} value 
 */
const setItem = (key, value) => {
  return localStorage.setItem(key, value);
};

const removeItem = (key) => {
  return localStorage.removeItem(key);
};

export { getItem, setItem, removeItem };