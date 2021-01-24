import {
  SET_USERS,
  SET_TOKEN,
  SET_USERNAME,
  SET_TWEET_SCORES,
} from "../constants";

const initialState = { users: [], token: "", username: "", tweetScores: {} };

export default function setBrowserInfo(state = initialState, action) {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.users,
      };
    case SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    case SET_USERNAME:
      return {
        ...state,
        username: action.username,
      };
    case SET_TWEET_SCORES:
      return {
        ...state,
        tweetScores: action.tweetScores,
      };
    default:
      return state;
  }
}
