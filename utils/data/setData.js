import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getSetsByBand = (id) => new Promise((resolve, reject) => {
  console.warn(id);
  fetch(`${dbUrl}/set?band=${id}`)
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const createSet = (setObj) => new Promise((resolve, reject) => {
  const setlistObj = {
    title: setObj.title,
    songs: setObj.songs,
    note: setObj.note,
    band: Number(setObj.band),
    author: Number(setObj.author),
  };
  fetch(`${dbUrl}/set`, {
    method: 'POST',
    body: JSON.stringify(setlistObj),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const getSingleSet = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/set/${id}`)
    .then((response) => response.json())
    .then((data) => {
      resolve({
        id: data.id,
        title: data.title,
        note: data.note,
        band: data.band,
        author: data.author,
        songs: data.songs,

      });
    })
    .catch((error) => reject(error));
});

const deleteSingleSet = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/set/${id}`, {
    method: 'DELETE',
  })
    .then(resolve)
    .catch(reject);
});

const updateSet = (setObj, id) => new Promise((resolve, reject) => {
  const setlistObj = {
    title: setObj.title,
    songs: setObj.songs,
    note: setObj.note,
    band: Number(setObj.band),
    author: Number(setObj.author),
  };
  fetch(`${dbUrl}/set/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(setlistObj),
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

export {
  getSetsByBand,
  createSet,
  getSingleSet,
  deleteSingleSet,
  updateSet,

};
