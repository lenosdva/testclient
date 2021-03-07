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

