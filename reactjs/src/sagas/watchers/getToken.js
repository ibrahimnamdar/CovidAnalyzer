import { put, takeLatest, call } from "redux-saga/effects";
import { history } from "../../store";

import { GET_TOKEN_SAGA } from "../../constants";
import { setToken, setUsername } from "../../actions";
import { getToken } from "../../lib/api";

function* workerGetTokenSaga(data) {
  const response = yield call(getToken, data.data);

  if (response.token) {
    localStorage.setItem("token", response.token);
    localStorage.setItem("username", data.data.username);
  }

  yield put(setToken(response.token));
  yield put(setUsername(data.data.username));
  // history.push("/dashboard");
  window.location.href = "/dashboard";
}

export default function* watchGetTokenSaga() {
  yield takeLatest(GET_TOKEN_SAGA, workerGetTokenSaga);
}
