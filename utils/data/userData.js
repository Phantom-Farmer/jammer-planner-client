import axios from 'axios';
import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getUsersByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/users.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const createUser = (userObj) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/register`, {
    method: 'POST',
    body: JSON.stringify(userObj),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

const checkUser = (uid) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/checkuser`, {
    method: 'POST',
    body: JSON.stringify({
      uid,
    }),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

const getSingleUser = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/users/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const deleteSingleUser = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/users/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const updateUser = (userObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/users/${userObj.firebaseKey}.json`, userObj)
    .then(() => getUsersByUid(userObj.uid)).then(resolve)
    .catch(reject);
});

export {
  getUsersByUid,
  createUser,
  checkUser,
  getSingleUser,
  deleteSingleUser,
  updateUser,

};
