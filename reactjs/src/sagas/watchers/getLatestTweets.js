import { put, takeLatest, call } from "redux-saga/effects";

import { GET_LATEST_TWEETS_SAGA } from "../../constants";
import { setLatestTweets } from "../../actions";
import { getLatestTweets } from "../../lib/api";

function* workerGetLatestTweetsSaga() {
  const latestTweets = yield call(getLatestTweets);

  yield put(setLatestTweets(latestTweets));
}

export default function* watchGetLatestTweetsSaga() {
  yield takeLatest(GET_LATEST_TWEETS_SAGA, workerGetLatestTweetsSaga);
}
