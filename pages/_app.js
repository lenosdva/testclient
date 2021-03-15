import { useEffect, useState } from "react"
import "@fortawesome/fontawesome-free/js/all.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/index.scss";
import { createStore, applyMiddleware } from 'redux';
import { Provider as StoreProvider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import appReducer from '../store';
import rootSaga from '../store/sagas';
import { appWithTranslation } from '../constent/i18n/i18n'
import { get } from "lodash"
const { NEXT_PUBLIC_WEB_SOCKET } = process.env
const HOST = NEXT_PUBLIC_WEB_SOCKET

const sagaMiddleware = createSagaMiddleware();
const store = createStore(appReducer, applyMiddleware(sagaMiddleware, logger));
sagaMiddleware.run(rootSaga);

function MyApp({ Component, pageProps }) {
  const [ws, setWs] = useState({})
  useEffect(() => {
    setWebSoket()
  }, [])

  function setWebSoket(){
    const token = JSON.parse(localStorage.getItem('token'))
    if (token !== null && token) {
      const webS = new WebSocket(HOST, get(token, 'accessToken', ''))
      setWs(webS)
    }
  }

  return (
    <StoreProvider  store={store}>
      <Component ws={ws} setWebSoket={setWebSoket} {...pageProps} />
    </StoreProvider>
  )
}

export default appWithTranslation(MyApp);
