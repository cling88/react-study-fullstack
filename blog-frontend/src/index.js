import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// router
import { BrowserRouter } from 'react-router-dom'
 
// redux
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import rootReducer, { rootSaga } from './redux'
import { tempSetUser, check } from './redux/user'

// 검색엔진 설정
import { HelmetProvider } from 'react-helmet-async'

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
/*
리액트앱이 브라우저에 맨 처음 렌더링 될때 localStorage에서 값을 불러와 
리덕스 스토어 안에 넣어주도록 해야한다. 
*/
function loadUser() {
  try {
    const user = localStorage.getItem('user');
    if(!user) return; // 로그인 상태가 아니라면 아무것도 안함
    store.dispatch(tempSetUser(user));
    store.dispatch(check());
  } catch(e) {
    console.log("localStorage is not working")
  }
}

sagaMiddleware.run(rootSaga)
loadUser(); // 반드시 sagaMiddleware.run(rootSaga) 가 호출된 이후 호춭한다. 

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
