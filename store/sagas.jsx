import * as Users from '../api/users';
import {takeLatest, takeEvery, all} from 'redux-saga/effects';

function* actionWatcher() {
  yield takeLatest('GET_USER', Users.getUser);
 }

export default function* rootSaga() {
  yield all([actionWatcher()]);
}
