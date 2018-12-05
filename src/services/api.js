const handleError = response => {
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response;
};

const toJSON = response => response.json();

const httpRequest = (resource, options = {}) => {
  return fetch(resource, {
    method: "GET",
    ...options
  })
  .then(handleError)
  .then(toJSON)
  .catch(error => error)
};

/**
 * 
 * @param {string} resource 
 * 
 * @returns {Promise}
 */
const httpGet = (resource) => {
  return httpRequest(resource, {
    method: 'GET'
  });
};

/**
 * 
 * @param {string} resource 
 * @param {*} data 
 * 
 * @returns {Promise}
 */
const httpPost = (resource, data) => {
  return httpRequest(resource, {
    method: 'POST',
    data: JSON.stringify(data)
  });
};

/**
 * 
 * @param {string} resource 
 * 
 * @returns {Promise}
 */
const httpDelete = (resource) => {
  return httpRequest(resource, {
    method: "DELETE"
  });
};

/**
 * 
 * @param {string} resource 
 * 
 * @return {Promise}
 */
const httpPut = (resource, data) => {
  return httpRequest(resource, {
    method: "PUT",
    data: JSON.stringify(data)
  });
};

export { httpGet, httpPost, httpPut, httpDelete, httpRequest };