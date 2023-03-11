import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getSetSongsBySet = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/set_song?set=${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const deleteSetSong = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/set_song/${id}`, {
    method: 'DELETE',
  })
    .then(resolve)
    .catch(reject);
});

const createSetSong = (setSong) => new Promise((resolve, reject) => {
  const setSongObj = {
    set_id: Number(setSong.setId),
    song_id: Number(setSong.songId),
    order: setSong.order,
  };
  fetch(`${dbUrl}/set_song`, {
    method: 'POST',
    body: JSON.stringify(setSongObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const updateSetSong = (sObj, id) => new Promise((resolve, reject) => {
  const setSongObj = {
    set: Number(sObj.set),
    song: Number(sObj.song),
    order: Number(sObj.order),
  };
  fetch(`${dbUrl}/setSong/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(setSongObj),
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

export {
  getSetSongsBySet, deleteSetSong, createSetSong, updateSetSong,
};
