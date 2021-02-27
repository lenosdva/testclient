import { put } from 'redux-saga/effects';
import { get } from "lodash"
const { NEXT_PUBLIC_API_HOST } = process.env
const HOST = NEXT_PUBLIC_API_HOST

export function* registerByMobile({ payload }) {
  const data = yield fetch(`${HOST}/v1/auth/registerByMobile`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      data.mobile = payload.mobile
      return data;
    })
    .catch((error) => {
      throw error;
    });
  yield put({ type: 'REGISTER', data });
}

export function* registerByEmail({ payload }) {
  const data = yield fetch(`${HOST}/v1/auth/registerByEmail`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
    .then((res) => {
      getUser()
      return res.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw error;
    });
  yield put({ type: 'REGISTERWITHEMAIL', data });
}

export function* loginByMobile({ payload }) {
  const data = yield fetch(`${HOST}/v1/auth/loginWithMobile`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      data.mobile = payload.mobile
      return data;
    })
    .catch((error) => {
      throw error;
    });
  yield put({ type: 'LOGIN', data });
}

export function* loginByEmail({ payload }) {
  const data = yield fetch(`${HOST}/v1/auth/loginWithEmail`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
    .then((res) => {
      getUser()
      return res.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw error;
    });
  yield put({ type: 'LOGINWITHEMAIL', data });
}

export function* verifyOtp({ payload }) {
  const data = yield fetch(`${HOST}/v1/auth/verifyOtp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
    .then((res) => {
      getUser()
      return res.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw error;
    });
  yield put({ type: 'VERIFYED_OTP', data });
}

export function* resendOtp({ payload }) {
  const data = yield fetch(`${HOST}/v1/auth/resendMobileOtp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw error;
    });
  yield put({ type: 'RESENT_OTP', data });
}

export function* getUser({ payload }) {
  const token = JSON.parse(localStorage.getItem('token'))
  const data = yield fetch(`${HOST}/v1/users/profile`, {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': 'Bearer ' + get(token, 'accessToken', '') 
    },
    body: JSON.stringify(payload)
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw error;
    });
  yield put({ type: 'GOT_USER', data });
}

export function* getOrders({ payload }) {
  const token = JSON.parse(localStorage.getItem('token'))
  const data = yield fetch(`${HOST}/v1/orders`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + get(token, 'accessToken', '')
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      data.mobile = payload.mobile
      return data;
    })
    .catch((error) => {
      throw error;
    });
  yield put({ type: 'GOT_ORDERS', data });
}
