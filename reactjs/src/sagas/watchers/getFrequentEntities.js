import { put, takeLatest, call } from "redux-saga/effects";

import { GET_FREQUENT_ENTITIES_SAGA } from "../../constants";
import { setFrequentEntities } from "../../actions";
import { getFrequentEntities } from "../../lib/api";

function* workerGetFrequentEntitiesSaga() {
  const frequentEntities = yield call(getFrequentEntities);
  console.log("dsfgsdfgd");
  console.log("sasa" + JSON.stringify(frequentEntities));

  yield put(setFrequentEntities(frequentEntities));
}

export default function* watchGetFrequentEntitiesSaga() {
  yield takeLatest(GET_FREQUENT_ENTITIES_SAGA, workerGetFrequentEntitiesSaga);
}
