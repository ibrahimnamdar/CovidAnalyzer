import { all, fork } from "redux-saga/effects";

import watchGetUsersSaga from "./watchers/getUsers";
import watchGetTokenSaga from "./watchers/getToken";
import watchRegisterUserSaga from "./watchers/registerUser";
import watchGetTweetScoresSaga from "./watchers/getTweetScores";
import watchGetFrequentEntitiesSaga from "./watchers/getFrequentEntities";

export default function* root() {
  yield all([
    fork(watchGetUsersSaga),
    fork(watchGetTokenSaga),
    fork(watchRegisterUserSaga),
    fork(watchGetTweetScoresSaga),
    fork(watchGetFrequentEntitiesSaga),
  ]);
}
