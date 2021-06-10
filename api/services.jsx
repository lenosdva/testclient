import { put } from 'redux-saga/effects';
import { get } from "lodash"
import * as Users from "./users"
const { NEXT_PUBLIC_API_HOST } = process.env
const HOST = NEXT_PUBLIC_API_HOST
const NEW_HOST = "https://dein-admin.herokuapp.com"

export function* search({ payload }) {
  const data = yield fetch(`${NEW_HOST}/search?search=${payload}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
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
  yield put({ type: 'SEARCH_RESULT', data });
}

export function* getAllService({ payload }) {
  console.log("APAI calledddddd")
  const data = yield fetch(`${NEW_HOST}/serivces`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      // data.mobile = payload.mobile
      return data;
    })
    .catch((error) => {
      throw error;
    });
  yield put({ type: 'GOT_SERVICE', data });
}

export function* MovingOutServices({ payload }) {
  const data = yield fetch(`${NEW_HOST}/serivces/${payload}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
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
  yield put({ type: 'GOT_MOVING_OUT', data });
}

export function* getServiceDetails({ payload }) {
  const data = yield fetch(`${NEW_HOST}/gigs/${payload}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
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
  yield put({ type: 'GOT_SERVICE_DETAILS', data });
}

export function* getMoreService({ payload }) {
  const data = yield fetch(`${HOST}/v1/gigs/getByHandyman`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' },
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
  yield put({ type: 'GOT_MORE_SERVICE', data });
}

export function* postServiceForm({ payload }) {
  const token = JSON.parse(localStorage.getItem('token'))
  const data = yield fetch(`${NEW_HOST}/rooms/me`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
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
  yield put({ type: 'POST_INQUERY', data });
}

export function* addWishList({ payload }) {
  const token = JSON.parse(localStorage.getItem('token'))
  const data = yield fetch(`${HOST}/v1/users/addWishlist`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + get(token, 'accessToken', '')
    },
  })
    .then((res) => {
      Users.getUser()
      return res.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      Users.getUser()
      throw error;
    });
  yield put({ type: 'SET_WISHLIST', data });
}

export function* removeWishList({ payload }) {
  const token = JSON.parse(localStorage.getItem('token'))
  const data = yield fetch(`${HOST}/v1/users/removeWishlist`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + get(token, 'accessToken', '')
    },
  })
    .then((res) => {
      Users.getUser()
      return res.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      Users.getUser()
      throw error;
    });
  yield put({ type: 'SET_WISHLIST', data });
}

export function* getNotification({ payload }) {
  // const token = JSON.parse(localStorage.getItem('token'))
  const data = yield fetch(`${HOST}/v1/users/getNotifications`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': 'Bearer ' + get(token, 'accessToken', '')
    },
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
  yield put({ type: 'GOT_NOTIFICATION', data });
}

export function* getEarnings({payload}) {
  const token = JSON.parse(localStorage.getItem('token'))
  const data = yield fetch(`${HOST}/v1/users/getEarnings`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + get(token, 'accessToken', '')
  },
  })
    .then((res) => {
      Users.getUser()
      return res.json();
    })
    .then((data) => {
    
      return data;
    })
    .catch((error) => {
      Users.getUser()
      throw error;
    });
  yield put({ type: 'GOT_EARNING', data });
}
