import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getSongsByBand = (id) => new Promise((resolve, reject) => {
  console.warn(id);
  fetch(`${dbUrl}/song?band=${id}`)
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const createSong = (sObj) => new Promise((resolve, reject) => {
  const songObj = {
    title: sObj.title,
    key: sObj.key,
    signature: sObj.signature,
    vibe: sObj.vibe,
    lyric: sObj.lyric,
    band: Number(sObj.band),
    author: Number(sObj.author),
  };
  fetch(`${dbUrl}/song`, {
    method: 'POST',
    body: JSON.stringify(songObj),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const getSingleSong = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/song/${id}`)
    .then((response) => response.json())
    .then((data) => {
      resolve({
        id: data.id,
        title: data.title,
        key: data.key,
        signature: data.signature,
        vibe: data.vibe,
        lyric: data.lyric,
        band: data.band,
        author: data.author,

      });
    })
    .catch((error) => reject(error));
});

const deleteSingleSong = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/song/${id}`, {
    method: 'DELETE',
  })
    .then(resolve)
    .catch(reject);
});

const updateSong = (sObj, id) => new Promise((resolve, reject) => {
  const songObj = {
    title: sObj.title,
    key: sObj.key,
    signature: sObj.signature,
    vibe: sObj.vibe,
    lyric: sObj.lyric,
    band: Number(sObj.band),
    author: Number(sObj.author),
  };
  fetch(`${dbUrl}/song/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(songObj),
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

export {
  getSongsByBand,
  createSong,
  getSingleSong,
  deleteSingleSong,
  updateSong,

};
