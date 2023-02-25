import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getRehearsalsByBand = (id) => new Promise((resolve, reject) => {
  console.warn(id);
  fetch(`${dbUrl}/rehearsal?band=${id}`)
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const createRehearsal = (rObj) => new Promise((resolve, reject) => {
  const rehearsalObj = {
    date: rObj.date,
    time: rObj.time,
    location: rObj.location,
    show: rObj.show,
    message: rObj.message,
    band: Number(rObj.band),
    set: Number(rObj.set),
    author: Number(rObj.author),
  };
  fetch(`${dbUrl}/rehearsal`, {
    method: 'POST',
    body: JSON.stringify(rehearsalObj),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const getSingleRehearsal = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/rehearsal/${id}`)
    .then((response) => response.json())
    .then((data) => {
      resolve({
        id: data.id,
        date: data.date,
        time: data.time,
        location: data.location,
        show: data.show,
        message: data.message,
        band: data.band,
        set: data.set,
        author: data.author,

      });
    })
    .catch((error) => reject(error));
});

const deleteSingleRehearsal = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/rehearsal/${id}`, {
    method: 'DELETE',
  })
    .then(resolve)
    .catch(reject);
});

const updateRehearsal = (rObj, id) => new Promise((resolve, reject) => {
  const rehearsalObj = {
    date: rObj.date,
    time: rObj.time,
    location: rObj.location,
    show: rObj.show,
    message: rObj.message,
    band: Number(rObj.band),
    set: Number(rObj.set),
    author: Number(rObj.author),
  };
  fetch(`${dbUrl}/rehearsal/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(rehearsalObj),
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

export {
  getRehearsalsByBand,
  createRehearsal,
  getSingleRehearsal,
  deleteSingleRehearsal,
  updateRehearsal,

};
