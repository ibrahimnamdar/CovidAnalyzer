import { put, takeLatest, call } from "redux-saga/effects";

import { GET_TWEET_SCORES_SAGA } from "../../constants";
import { setTweetScores } from "../../actions";
import { getTweetScores } from "../../lib/api";

function* workerGetTweetScoresSaga() {
  const tweetScores = yield call(getTweetScores);

  yield put(setTweetScores(tweetScores));
}

export default function* watchGetTweetScoresSaga() {
  yield takeLatest(GET_TWEET_SCORES_SAGA, workerGetTweetScoresSaga);
}
