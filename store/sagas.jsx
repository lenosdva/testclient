import * as Users from '../api/users';
import {takeLatest, takeEvery, all} from 'redux-saga/effects';

function* userActionWatcher() {
  yield takeLatest('SIGNUP_REQUEST', Users.registerByMobile);
  yield takeLatest('SIGNUP_REQUEST', Users.registerByMobile);
  yield takeLatest('VERIFY_OTP', Users.verifyOtp);
 }

export default function* rootSaga() {
  yield all([userActionWatcher()]);
}
