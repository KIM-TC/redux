const { createStore, applyMiddleware } = require('redux');
const reducer = require('./reducers');
const { addPost } = require('./actions/post');
const { logIn, logOut } = require('./actions/user');

const initialState = {
  user: {
    isLoggingIn: true,
    data: null,
  },
  posts: [],
};

//dispatch 와 reducer사이에 동작하는게 미들웨어다.
//매개변수3개가들어가는 함수, 밑에처럼 사이사이에 함수를 실행할 필요가 없는경우
const firstMiddleware = (store) => (dispatch) => (action) => { //미들웨어 예시1
  console.log('first-middleware-로깅 시작', action);
  dispatch(action); //dispatch + console기능이 추가된 미들웨어임
  console.log('first-middleware-로깅 끝');
};
// const firstMiddleware(store){
//   store()
//   return function(next){
//     next()
//     return function(action){
//       action()
//     }
//   }
// }

const thunkMiddleware = (store) => (dispatch) => (action) => {//미들웨어 예시2
  if (typeof action === 'function') { //함수면 -> 비동기로 처리
    return action(store.dispatch, store.getState); //함수실행
  }
  return dispatch(action); //객체면->동기처리
};

const enhancer = applyMiddleware(//미들웨어들을 적용해주는 함수,devtool같은것도 연결해줌
  firstMiddleware,
  thunkMiddleware,
);

const store = createStore(reducer, initialState, enhancer);

console.log('1st', store.getState());

// --------------------------------------

store.dispatch(logIn({ //로그인요청(비동기처리->thunk작동)
  id: 1,
  name: 'seok',
  admin: true,
}));
// console.log('2nd', store.getState());

// store.dispatch(addPost({ //게시글추가
//   userId: 1,
//   id: 1,
//   content: '안녕하세요. 리덕스',
// }));
// console.log('3rd', store.getState());

// store.dispatch(addPost({//게시글추가
//   userId: 1,
//   id: 2,
//   content: '두번째 리덕스',
// }));
// console.log('4th', store.getState());

// store.dispatch(logOut());//로그아웃요청
// console.log('5th', store.getState());
