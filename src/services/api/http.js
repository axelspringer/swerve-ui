const handleError = response => {
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response;
};

const toJSON = response => response.json();

const request = (resource, options = {}) => {
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
const read = resource => {
  return request(resource, {
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
const create = (resource, data) => {
  return request(resource, {
    method: 'POST',
    body: JSON.stringify(data)
  });
};

/**
 * 
 * @param {string} resource 
 * 
 * @returns {Promise}
 */
const remove = resource => {
  return request(resource, {
    method: "DELETE"
  });
};

/**
 * 
 * @param {string} resource 
 * 
 * @return {Promise}
 */
const update = (resource, data) => {
  return request(resource, {
    method: "PUT",
    body: JSON.stringify(data)
  });
};

export { read, create, update, remove };