import { put } from 'redux-saga/effects';
import { get } from "lodash"
import axios from "axios"
const { NEXT_PUBLIC_API_HOST } = process.env
const HOST = NEXT_PUBLIC_API_HOST

export function* registerByMobile({ payload }) {
  const data = yield fetch(`${HOST}/v1/auth/registerByMobile`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
    .then((res) => {
      // getUser()
      return res.json();
    })
    .then((data) => {
      data.mobile = payload.mobile
      return data;
    })
    .catch((error) => {
      throw error;
    });
  yield put({ type: 'REGISTERWITHMOBILE', data });
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

export function* registerByFacebook({ payload }) {
  const data = yield fetch(`${HOST}/v1/auth/facebook`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
    .then((res) => {
      getUser()
      return res.json();
    })
    .then((data) => {
      data.socialLogin = true
      return data;
    })
    .catch((error) => {
      throw error;
    });
  yield put({ type: 'REGISTERWITHEMAIL', data });
}

export function* registerByGoogle({ payload }) {
  const data = yield fetch(`${HOST}/v1/auth/google`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
    .then((res) => {
      getUser()
      return res.json();
    })
    .then((data) => {
      data.socialLogin = true
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

export function* getUserInfo({ payload }) {
  const token = JSON.parse(localStorage.getItem('token'))
  const data = yield fetch(`${HOST}/v1/users/`, {
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
  yield put({ type: 'GOT_USER_INFO', data });
}

export function* updateUser({ payload }) {
  console.log("updateUserupdateUser")
  const token = JSON.parse(localStorage.getItem('token'))
  const data = yield axios.post(`${HOST}/v1/users/update`, 
    payload,
    {
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
  yield put({ type: 'UPDATED_USER', data });
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
      return data;
    })
    .catch((error) => {
      throw error;
    });
  yield put({ type: 'GOT_ORDER', data });
}

export function* getInbox({ payload }) {
  const token = JSON.parse(localStorage.getItem('token'))
  const data = yield fetch(`${HOST}/v1/users/getKnownUsers`, {
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
      return data;
    })
    .catch((error) => {
      throw error;
    });
  yield put({ type: 'GOT_INBOX', data });
}
export function* addPayment({ payload }) {
  const token = JSON.parse(localStorage.getItem('token'))
  const data = yield fetch(`${HOST}/v1/users/addPaymentMethod`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': 'Bearer ' + get(token, 'accessToken', '')
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
  yield put({ type: 'ADDED_PAYMENT', data });
}


export function* getChat({ payload }) {
  const token = JSON.parse(localStorage.getItem('token'))
  const data = yield fetch(`${HOST}/v1/users/getChatsBetween`, {
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
      const message = {
        id: payload.userId,
        message: data
      }
      return message;
    })
    .catch((error) => {
      throw error;
    });
  yield put({ type: 'GOT_CHAT', data });
}

export function* payment({ payload }) {
  const token = JSON.parse(localStorage.getItem('token'))
  const data = yield fetch(`${HOST}/v1/payments/addCards `, {
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
  yield put({ type: 'DID_PAYMENT', data });
}


export function* getCard({ payload }) {
  const token = JSON.parse(localStorage.getItem('token'))
  const data = yield fetch(`${HOST}/v1/payments/getCards`, {
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
  yield put({ type: 'GOT_CARD', data });
}

export function* checkout({ payload }) {
  const token = JSON.parse(localStorage.getItem('token'))
  const data = yield fetch(`${HOST}/v1/payments/chargeCustomer`, {
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
  yield put({ type: 'PAYMENT', data });
}
export function* forgetPassword({ payload }) {
  const token = JSON.parse(localStorage.getItem('token'))
  const data = yield fetch(`${HOST}/v1/users/forgotPassword
  `, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': 'Bearer ' + get(token, 'accessToken', '')
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
  yield put({ type: 'FORGOT_PASSWORD', data });
}
export function* resetPassword({ payload }) {
  const token = JSON.parse(localStorage.getItem('token'))
  const data = yield fetch(`${HOST}/v1/users/resetPassword`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': 'Bearer ' + get(token, 'accessToken', '')
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
  yield put({ type: 'RESETED_PASSWORD', data });
}
export function* mobileSignData({ payload }) {
  const data = yield fetch(`${HOST}/v1/auth/registerByMobile`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
    .then((res) => {
      // getUser()
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
