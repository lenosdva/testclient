import { put } from 'redux-saga/effects';
export function* getUser() {
  const data = yield fetch(`https://api.covid19india.org/v4/min/timeseries.min.json`, {
    method: 'GET',
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
  yield put({type: 'USER', data});
}