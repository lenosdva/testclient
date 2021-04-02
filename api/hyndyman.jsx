import { put } from 'redux-saga/effects';
import { get } from "lodash"
import axios from "axios"

const { NEXT_PUBLIC_API_HOST } = process.env
const HOST = NEXT_PUBLIC_API_HOST

export function* registerHandyman({ payload }) {
  const token = JSON.parse(localStorage.getItem('token'))
  const data = yield fetch(`${HOST}/v1/users/becomeSeller`, {
    method: 'POST',
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
  yield put({ type: 'HYNDYMAN', data });
}

export function* uploadDocument({ payload }) {
  const token = JSON.parse(localStorage.getItem('token'))
  const data = yield axios.post(`${HOST}/v1/users/addDocument`, payload,{
    headers: { 
      'Content-Type': 'multipart/form-data',
      'Authorization': 'Bearer ' + get(token, 'accessToken', '')
    }
  })
    .then((res) => {
      return res
    })
    .catch((error) => {
      throw error;
    });
  yield put({ type: 'UPLOADED', data });
}

export function* getGig({ payload }) {
  const data = yield fetch(`${HOST}/v1/gigs/${payload}`, {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
     }
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
  yield put({ type: 'GOT_GIG', data });
}

export function* addGig({ payload }) {
  const token = JSON.parse(localStorage.getItem('token'))
  const data =  yield axios.post(`${HOST}/v1/gigs/add`, payload,{
    headers: { 
      'Content-Type': 'multipart/form-data',
      'Authorization': 'Bearer ' + get(token, 'accessToken', '')
     },
  })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw error;
    });
  yield put({ type: 'ADDED_GIG', data });
}
// GET SERVICES
export function* getServices() {
  const token = JSON.parse(localStorage.getItem('token'))
  const data = yield fetch(`${HOST}/v1/gigs`, {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + get(token, 'accessToken', '')
     }
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
  yield put({ type: 'GOT_SERVICES', data });
}
export function* getDelete({payload}) {
  const token = JSON.parse(localStorage.getItem('token'))
  const data = yield fetch(`${HOST}/v1/gigs/delete`, {
    method: 'POST',
    body:JSON.stringify(payload),
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + get(token, 'accessToken', '')
     }
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      getServices()
      return data;
    })
    .catch((error) => {
      throw error;
    });
  yield put({ type: 'DELETED_REQUEST', data });
}

export function* getUpdate({payload}) {
  const token = JSON.parse(localStorage.getItem('token'))
  const data = yield  yield axios.post(`${HOST}/v1/gigs/update`, payload, {
    headers: { 
      'Content-Type': 'multipart/form-data',
      'Authorization': 'Bearer ' + get(token, 'accessToken', '')
     }
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
  yield put({ type: 'UPDATED_REQUEST', data });
}

export function* getPause({payload}) {
  const token = JSON.parse(localStorage.getItem('token'))
  const data = yield fetch(`${HOST}/v1/gigs/pause`, {
    method: 'POST',
    body:JSON.stringify(payload),
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + get(token, 'accessToken', '')
     }
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      getServices()
      return data;
    })
    .catch((error) => {
      throw error;
    });
  yield put({ type: 'PAUSED_REQUEST', data });
}

export function* getContinue() {
  const token = JSON.parse(localStorage.getItem('token'))
  const data = yield fetch(`$POST/v1/gigs/continue`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + get(token, 'accessToken', '')
     }
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
  yield put({ type: 'CONTIUED_REQUEST', data });
}


