import { put } from 'redux-saga/effects';
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

export function* getServiceById({payload}) {
  const data = yield fetch(`${HOST}/v1/service/${payload}`, {
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