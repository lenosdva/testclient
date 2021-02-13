import * as Users from '../api/users';
import * as Services from '../api/services';
import {takeLatest, takeEvery, all} from 'redux-saga/effects';

function* userActionWatcher() {
  yield takeLatest('SIGNUP_REQUEST', Users.registerByMobile);
  yield takeLatest('SIGNUP_EMAIL_REQUEST', Users.registerByEmail);
  yield takeLatest('LOGIN_REQUEST', Users.loginByMobile);
  yield takeLatest('LOGIN_EMAIL_REQUEST', Users.loginByEmail);
  yield takeLatest('VERIFY_OTP', Users.verifyOtp);
  yield takeLatest('RESEND_OTP', Users.resendOtp);
 }

 function* servicesActionWatcher() {
  yield takeLatest('SEARCH_REQUEST', Services.search);
  yield takeLatest('SEARCH_BY_ID', Services.getServiceById);
  
 }

export default function* rootSaga() {
  yield all([
    userActionWatcher(),
    servicesActionWatcher()
  ]);
}
