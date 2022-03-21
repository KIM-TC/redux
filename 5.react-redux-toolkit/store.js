const { configureStore } = require('@reduxjs/toolkit');

const reducer = require('./reducers');

const firstMiddleware = () => (next) => (action) => {
  console.log('로깅', action);
  next(action);
};

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(firstMiddleware),  //기존미들웨어(getDefaultMiddleware) + custom middleware(firstMiddleware)
  devTools:process.env.NODE_ENV !== 'production'
  //preloadedState : ssr할떄 server로부터 initialState를 받을떄만 적어주면됨
  //devTools:false : devtool사용안할거면
});

module.exports = store;

//reducer하나만 연결해주면 devtool,thunk,immer 내장됨


