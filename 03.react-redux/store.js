const { createStore, compose, applyMiddleware } = require('redux');
const { composeWithDevTools } = require('redux-devtools-extension');

const reducer = require('./reducers');
const { addPost } = require('./actions/post');
const { logIn, logOut } = require('./actions/user');

const initialState = {
  user: {
    isLoggingIn: false,
    data: null,
  },
  posts: [],
};

const firstMiddleware = (store) => (dispatch) => (action) => {
  console.log('로깅', action);
  dispatch(action);
};

const thunkMiddleware = (store) => (dispatch) => (action) => {
  if (typeof action === 'function') { // 비동기 -> 비동기라는것을 구별하기위해 객체 대신 함수를 넣음
    return action(store.dispatch, store.getState); //함수 실행
  }
  return dispatch(action); // 동기
};

const enhancer = process.env.NODE_ENV === 'production'
  ? compose(
    applyMiddleware(
      firstMiddleware,
      thunkMiddleware,
    )
 )
  : composeWithDevTools( //개발용일때만 devtool적용 ->배포용적용시 데이터노출
    applyMiddleware(
      firstMiddleware,
      thunkMiddleware,
    ),
  );

const store = createStore(reducer, initialState, enhancer);

module.exports = store;
