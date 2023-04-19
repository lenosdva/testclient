import { put } from 'redux-saga/effects';
import { get } from "lodash"
import axios from "axios"
import qs from 'qs'

const { NEXT_PUBLIC_API_HOST } = process.env
const HOST = NEXT_PUBLIC_API_HOST
const NEW_HOST = "https://strapi.deinhausmann.com"

export function* registerHandyman({ payload }) {
  const token = JSON.parse(localStorage.getItem('token'))
  const data = yield fetch(`${NEW_HOST}/handyman-applications`,{
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
  yield put({ type: 'HYNDYMAN', data });
}

export function* getHandyman({ payload }) {
  const token = JSON.parse(localStorage.getItem('token'))
  const id = payload.id
  console.log("HANDY ID", id)
  delete payload.id
  const data = yield fetch(`${NEW_HOST}/handyman-applications/${id}`, {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': 'Bearer ' + token
    },
    //body: JSON.stringify(payload)
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
  yield put({ type: 'GOT_HYNDYMAN', data });
}

export function* checkFirm({ payload }) {
  const token = JSON.parse(localStorage.getItem('token'))
  const firm = payload
  const data = yield fetch(`${NEW_HOST}/handyman-applications`, {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': 'Bearer ' + token
    },
    //body: JSON.stringify(payload)
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log("ALL FIRMS: ", data)
      let firmExists = false;
      for(let i=0; i < data.length; i++) {
        if(data[i].companyName == firm) {
          firmExists = true
        }
      }
      return firmExists;      
    })
    .catch((error) => {
      throw error;
    });
  yield put({ type: 'GOT_FIRM', data });
}

export function* updateHandyman({ payload }) {
  const token = JSON.parse(localStorage.getItem('token'))
  const id = payload.id
  delete payload.id
  const data = yield yield fetch(`${NEW_HOST}/handyman-applications/${id}`, 
  {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
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
  yield put({ type: 'UPDATED_HYNDYMAN', data });
}

export function* deleteHandyman({ payload }) {
  const token = JSON.parse(localStorage.getItem('token'))
  const id = payload.id
  delete payload.id
  const data = yield yield fetch(`${NEW_HOST}/handyman-applications/${id}`, 
  {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
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
  yield put({ type: 'RESET_HYNDYMAN', data });
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
  const token = JSON.parse(localStorage.getItem('token'))
  const id = payload.id
  delete payload.id
  const data = yield fetch(`${NEW_HOST}/gigs/${id}`, {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': 'Bearer ' + token
    },
    //body: JSON.stringify(payload)
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


export function* getUserGigs({ payload }) {
  const token = JSON.parse(localStorage.getItem('token'))
  const id = payload.id
  delete payload.id  
  const data = yield fetch(`${NEW_HOST}/gigs?user=${id}`, {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': 'Bearer ' + token
    },
    //body: JSON.stringify(payload)
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
  yield put({ type: 'GOT_USER_GIGS', data });
}


export function* addGig({ payload }) {
  const token = JSON.parse(localStorage.getItem('token'))
  const data =  yield fetch(`${NEW_HOST}/gigs`, {
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
  yield put({ type: 'ADDED_GIG', data });
}

export function* updateGig({ payload }) {
  const token = JSON.parse(localStorage.getItem('token'))
  const id = payload.id
  delete payload.id
  const data = yield yield fetch(`${NEW_HOST}/gigs/${id}`, 
  {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
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
  yield put({ type: 'UPDATED_GIG', data });
}

export function* deleteGig({ payload }) {
  const token = JSON.parse(localStorage.getItem('token'))
  const id = payload.id
  delete payload.id
  const data = yield yield fetch(`${NEW_HOST}/gigs/${id}`, 
  {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
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
  yield put({ type: 'DELETED_GIG', data });
}
// GET SERVICES
export function* getServices() {
  const token = JSON.parse(localStorage.getItem('token'))
  const data = yield fetch(`${NEW_HOST}/gigs`, {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
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

export function* getGigs({ payload }) {
  const token = JSON.parse(localStorage.getItem('token'))
  const data = yield fetch(`${NEW_HOST}/gigs/me`, {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': 'Bearer ' + token
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
  yield put({ type: 'GOT_GIGS', data });
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
  const data = yield axios.post(`${HOST}/v1/gigs/update`, payload, {
    headers: { 
      'Content-Type': 'multipart/form-data',
      'Authorization': 'Bearer ' + get(token, 'accessToken', '')
     }
  })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw error;
    });
  yield put({ type: 'UPLOADED_REQUEST', data });
}

export function* fileUpload({payload}) {
  const token = JSON.parse(localStorage.getItem('token'))
  const files = payload.files
  const data = yield axios.post(`${NEW_HOST}/upload`, files, {
    headers: { 
      'Content-Type': 'multipart/form-data',
      'Authorization': 'Bearer ' + token,

     }
  })
    .then((data) => {
      const sdata = data
      if(get(payload, 'key', false)){
        sdata.data[0].key = payload.key
      }
      return sdata;
    })
    .catch((error) => {
      throw error;
    });
  yield put({ type: 'FILE_UPLOADED', data });
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


