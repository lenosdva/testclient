import * as Users from '../api/users';
import {takeLatest, takeEvery, all} from 'redux-saga/effects';

function* userActionWatcher() {
  yield takeLatest('SIGNUP_REQUEST', Users.registerByMobile);
 }

export default function* rootSaga() {
  yield all([userActionWatcher()]);
}
