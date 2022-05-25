const { produce } = require('immer'); //리듀서를 좀더 직관적인 형태로 정리하기위해 immer사용

const initialState = {
  isLoggingIn: false,
  data: null,
};

//nextState = produce(prevState, (draft) => {})
//immer => 불변성 유지해주는 라이브러리
const userReducer = (prevState = initialState, action) => { // action을 바탕으로 새로운 state 만들어주기
  return produce(prevState, (draft) => {  // produce = nextState
    switch (action.type) { 
      case 'LOG_IN_REQUEST':
        draft.data = null;
        draft.isLoggingIn = true;
        break;
      case 'LOG_IN_SUCCESS':
        draft.data = action.data;
        draft.isLoggingIn = false;
        break;
      case 'LOG_IN_FAILURE':
        draft.data = null;
        draft.isLoggingIn = false;
        break;
      case 'LOG_OUT':
        draft.data = null;
        break;
      default:
        break;
    }
  });
};

module.exports = userReducer;

// const userReducer = (prevState = initialState, action) => { // 새로운 state 만들어주기
//   switch (action.type) {
//     case 'LOG_IN_REQUEST':
//       return {
//         ...prevState,
//         data: null,
//         isLoggingIn: true,
//       };
