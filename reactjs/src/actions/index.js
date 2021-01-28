import {
  GET_USERS_SAGA,
  SET_USERS,
  GET_TOKEN_SAGA,
  SET_TOKEN,
  SET_USERNAME,
  SET_TWEET_SCORES,
  SET_FREQUENT_ENTITIES,
  SET_LATEST_TWEETS,
  REGISTER_USER_SAGA,
  GET_TWEET_SCORES_SAGA,
  GET_FREQUENT_ENTITIES_SAGA,
  GET_LATEST_TWEETS_SAGA,
  GET_MOST_USED_WORDS_SAGA,
  SET_MOST_USED_WORDS,
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
  return {
    type: SET_TWEET_SCORES,
    tweetScores,
  };
}

export function setFrequentEntities(frequentEntities) {
  return {
    type: SET_FREQUENT_ENTITIES,
    frequentEntities,
  };
}

export function setLatestTweets(latestTweets) {
  return {
    type: SET_LATEST_TWEETS,
    latestTweets,
  };
}

export function setMostUsedWords(mostUsedWords) {
  return {
    type: SET_MOST_USED_WORDS,
    mostUsedWords,
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

export function getFrequentEntitiesSaga() {
  return {
    type: GET_FREQUENT_ENTITIES_SAGA,
  };
}

export function getLatestTweetsSaga() {
  return {
    type: GET_LATEST_TWEETS_SAGA,
  };
}

export function getMostUsedWordsSaga() {
  return {
    type: GET_MOST_USED_WORDS_SAGA,
  };
}
