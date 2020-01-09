const handleError = response => {
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response;
};

const toJSON = text => (text.length ? JSON.parse(text) : {});

const toText = response => response.text();

const request = (resource, options = {}) => {
  return fetch(resource, {
    method: "GET",
    ...options
  })
    .then(handleError)
    .then(toText)
    .then(toJSON);
};
/**
 * 
 * @param {string} resource 
 * 
 * @returns {Promise}
 */
const read = resource => {
  return request(resource, {
    method: 'GET',
    credentials: "include",
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
    credentials: "include",
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
    method: "DELETE",
    credentials: "include",
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
    credentials: "include",
    body: JSON.stringify(data)
  });
};

export { read, create, update, remove };