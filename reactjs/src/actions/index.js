import { GET_USERS_SAGA, SET_USERS, GET_TOKEN_SAGA, SET_TOKEN, SET_USERNAME } from '../constants';

export function setUsers(users) {
  return {
    type: SET_USERS,
    users
  };
}

export function setToken(token) {
  return {
    type: SET_TOKEN,
    token
  };
}

export function setUsername(username) {
  return {
    type: SET_USERNAME,
    username
  };
}

//Sagas
export function getUsersSaga() {
  return {
    type: GET_USERS_SAGA,
  };
}

export function getTokenSaga(data) {
  return {
    type: GET_TOKEN_SAGA,
    data
  };
}