import { put, takeLatest, call } from "redux-saga/effects";

import { REGISTER_USER_SAGA } from "../../constants";
import { setToken, setUsername } from "../../actions";
import { registerUser } from "../../lib/api";

function* workerRegisterUserSaga(data) {
  const response = yield call(registerUser, data.data);

  if (response.token) {
    localStorage.setItem("token", response.token);
    localStorage.setItem("username", data.data.username);
  }

  yield put(setToken(response.token));
  yield put(setUsername(data.data.username));

  window.location.href = "/dashboard";
}

export default function* watchRegisterUserSaga() {
  yield takeLatest(REGISTER_USER_SAGA, workerRegisterUserSaga);
}
