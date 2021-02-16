import { put } from 'redux-saga/effects';
import { get } from "lodash"
const { NEXT_PUBLIC_API_HOST } = process.env
const HOST = NEXT_PUBLIC_API_HOST

export function* search({payload}) {
  const data = yield fetch(`${HOST}/v1/service/search/${payload}`, {
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
  yield put({type: 'SEARCH_RESULT', data});
}

export function* getAllService({payload}) {
  const data = yield fetch(`${HOST}/v1/service/`, {
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
  yield put({type: 'GOT_SERVICE', data});
}

export function* MovingOutServices({payload}) {
  const data = yield fetch(`${HOST}/v1/gigs/getByService`, {
    method: 'POST',
    body: JSON.stringify(payload),
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
  yield put({type: 'GOT_MOVING_OUT', data});
}

export function* getServiceDetails({payload}) {
  const data = yield fetch(`${HOST}/v1/gigs/${payload}`, {
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
  yield put({type: 'GOT_SERVICE_DETAILS', data});
}

