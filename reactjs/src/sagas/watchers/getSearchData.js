import { put, takeLatest, call } from "redux-saga/effects";

import { GET_SEARCH_DATA_SAGA } from "../../constants";
import { setSearchData } from "../../actions";
import { getSearchData } from "../../lib/api";

function* workerGetSearchDataSaga(keyword) {
  yield put(setSearchData());
  let searchData = yield call(getSearchData, keyword.keyword);

  searchData = {
    ...searchData,
    loading: false,
  };

  yield put(setSearchData(searchData));
}

export default function* watchGetSearchDataSaga() {
  yield takeLatest(GET_SEARCH_DATA_SAGA, workerGetSearchDataSaga);
}
