import { put, takeLatest, call } from "redux-saga/effects";

import { GET_MOST_USED_WORDS_SAGA } from "../../constants";
import { setMostUsedWords } from "../../actions";
import { getMostUsedWords } from "../../lib/api";

function* workerGetMostUsedWordsSaga() {
  const mostUsedWords = yield call(getMostUsedWords);
  yield put(setMostUsedWords(mostUsedWords));
}

export default function* watchGetMostUsedWordsSaga() {
  yield takeLatest(GET_MOST_USED_WORDS_SAGA, workerGetMostUsedWordsSaga);
}
