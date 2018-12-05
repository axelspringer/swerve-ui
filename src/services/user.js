import { removeToken } from "./token";
import { httpPost } from "./api";

/**
 * @param {string} username 
 * @param {string} password 
 */
const login = async (username, password) => {
  try {
    const response = await httpPost("https://some.api.endpoint", {
      username,
      password
    });

    

    return response.data.access_token;
  } catch (error) {
    //throw new Error(error)
  }
};

const logout = () => {
  removeToken();
};

export { login, logout };