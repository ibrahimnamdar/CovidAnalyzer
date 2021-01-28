import {
  SET_USERS,
  SET_TOKEN,
  SET_USERNAME,
  SET_TWEET_SCORES,
  SET_FREQUENT_ENTITIES,
  SET_LATEST_TWEETS,
  SET_MOST_USED_WORDS,
} from "../constants";

const initialState = {
  users: [],
  token: "",
  username: "",
  tweetScores: {},
  frequentEntities: {},
  latestTweets: {},
  mostUsedWords: {},
};

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
    case SET_FREQUENT_ENTITIES:
      return {
        ...state,
        frequentEntities: action.frequentEntities,
      };
    case SET_LATEST_TWEETS:
      return {
        ...state,
        latestTweets: action.latestTweets,
      };
    case SET_LATEST_TWEETS:
      return {
        ...state,
        latestTweets: action.latestTweets,
      };
    case SET_MOST_USED_WORDS:
      return {
        ...state,
        mostUsedWords: action.mostUsedWords,
      };
    default:
      return state;
  }
}
