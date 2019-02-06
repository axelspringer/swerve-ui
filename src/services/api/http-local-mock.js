/**
 * 
 * @param {string} resource 
 * 
 * @returns {Promise}
 */
const read = resource => {
  let data = JSON.parse(localStorage.getItem(resource));

  if (resource === "https://api.swerve.tortuga.cloud/domains") {
    data = Object.keys(localStorage)
      .filter(key => key.startsWith("https://api.swerve.tortuga.cloud/domains"))
      .map(key => JSON.parse(localStorage.getItem(key)));
  }

  return Promise.resolve({
    data
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
  const id = Math.floor(Math.random() * 1000000);
  const payload = {
    ...data,
    id
  };
  const storageKey = resource + '/' + id;

  localStorage.setItem(storageKey, JSON.stringify(payload));
  
  return Promise.resolve({
    data: payload
  });
};

/**
 * 
 * @param {string} resource 
 * 
 * @returns {Promise}
 */
const remove = (resource) => {
  localStorage.removeItem(resource);

  return Promise.resolve({

  });
};

/**
 * 
 * @param {string} resource 
 * 
 * @return {Promise}
 */
const update = (resource, data) => {
  localStorage.setItem(resource, JSON.stringify(data));
  
  return Promise.resolve({
    data
  });
};

export { read, create, update, remove };