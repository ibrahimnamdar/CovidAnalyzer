import {
  GET_USERS_SAGA,
  SET_USERS,
  GET_TOKEN_SAGA,
  SET_TOKEN,
  SET_USERNAME,
  SET_TWEET_SCORES,
  REGISTER_USER_SAGA,
  GET_TWEET_SCORES_SAGA,
} from "../constants";

export function setUsers(users) {
  return {
    type: SET_USERS,
    users,
  };
}

export function setToken(token) {
  return {
    type: SET_TOKEN,
    token,
  };
}

export function setTweetScores(tweetScores) {
  console.log("setTweetScores" + tweetScores);
  return {
    type: SET_TWEET_SCORES,
    tweetScores,
  };
}

export function setUsername(username) {
  return {
    type: SET_USERNAME,
    username,
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
    data,
  };
}

export function registerUserSaga(data) {
  return {
    type: REGISTER_USER_SAGA,
    data,
  };
}

export function getTweetScoresSaga() {
  return {
    type: GET_TWEET_SCORES_SAGA,
  };
}
