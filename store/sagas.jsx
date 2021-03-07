import * as Users from '../api/users';
import * as Services from '../api/services';
import * as Hyndyman from '../api/hyndyman';
import {takeLatest, takeEvery, all} from 'redux-saga/effects';

function* userActionWatcher() {
  yield takeLatest('SIGNUP_REQUEST', Users.registerByMobile);
  yield takeLatest('SIGNUP_EMAIL_REQUEST', Users.registerByEmail);
  yield takeLatest('LOGIN_REQUEST', Users.loginByMobile);
  yield takeLatest('LOGIN_EMAIL_REQUEST', Users.loginByEmail);
  yield takeLatest('VERIFY_OTP', Users.verifyOtp);
  yield takeLatest('RESEND_OTP', Users.resendOtp);
  yield takeLatest('GET_USER', Users.getUser);
  yield takeLatest('GET_ORDER', Users.getOrders);
  yield takeLatest('GET_INBOX', Users.getInbox);
  yield takeLatest('GET_CHAT', Users.getChat);
 }

 function* servicesActionWatcher() {
  yield takeLatest('SEARCH_REQUEST', Services.search);
  yield takeLatest('SEARCH_BY_ID', Services.getAllService);
  yield takeLatest('SEARCH_BY_ID', Services.MovingOutServices);
  yield takeLatest('SERVICE_DETAILS', Services.getServiceDetails);
  yield takeLatest('MORE_SERVICE', Services.getMoreService);
  yield takeLatest('FORM_REQUEST', Services.postServiceForm);
  yield takeLatest('ADD_WISH', Services.addWishList);
  yield takeLatest('REMOVE_WISH', Services.removeWishList);
  yield takeLatest('GET_SERVICE', Services.getAllService);
  
 }

 function* handymanActionWatcher() {
  yield takeLatest('UPLOAD', Hyndyman.uploadDocument);
  yield takeLatest('BECOME_HYNDYMAN', Hyndyman.registerHandyman);
  yield takeLatest('GET_GIG', Hyndyman.getGig);
  yield takeLatest('ADD_GIG', Hyndyman.addGig);
  
 }

export default function* rootSaga() {
  yield all([
    userActionWatcher(),
    servicesActionWatcher(),
    handymanActionWatcher()
  ]);
}
