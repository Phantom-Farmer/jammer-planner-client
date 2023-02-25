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

export { getSetSongsBySet, deleteSetSong, createSetSong };
