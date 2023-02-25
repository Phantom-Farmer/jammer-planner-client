import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getBandsByUserId = (id) => new Promise((resolve, reject) => {
  console.warn(id);
  fetch(`${dbUrl}/band?author=${id}`)
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const createBand = (bObj) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/band`, {
    method: 'POST',
    body: JSON.stringify(bObj),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const getSingleBand = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/band/${id}`)
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const deleteSingleBand = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/band/${id}`, {
    method: 'DELETE',
  })
    .then(resolve)
    .catch(reject);
});

const updateBand = (data, id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/band/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

/* const getBandSongs = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/band?song_id=${id}`)
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
}); */

export {
  getBandsByUserId,
  createBand,
  getSingleBand,
  deleteSingleBand,
  updateBand,

};
