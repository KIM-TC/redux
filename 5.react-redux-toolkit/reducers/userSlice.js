const { createSlice } = require('@reduxjs/toolkit');
const { logIn } = require('../actions/user');

const initialState = {
  isLoggingIn: false,
  data: null,
  prices:[1,2,3,4,5,6,7]
};

const userSlice = createSlice({
  name: 'user',
  initialState, 
  reducers: { //동기적인 action는 reduceres에
    logOut(state, action) {
      state.data = null;
    }
  }, //비동기 action은 extraReducers에 ->toolkit에 내장된 thunk사용 (비동기액션은 slice에 묶인게 아니라 다른곳에서도 쓸수있기때문에 액션폴더에 정의)
  extraReducers: (builder) => builder //thunk action: pending,fulfilled,rejected로 나뉨
    .addCase(logIn.pending, (state, action) => {  //비동기 호출전
      state.data = null; //immer쓰듯이 똑같이 적용
      state.isLoggingIn = true;
    })
    .addCase(logIn.fulfilled, (state, action) => { //비동기 호출성공
      state.data = action.payload; //action.payload.email , action.payload.password 이런식으로 payload로 통일됨
      state.isLoggingIn = false;
    })
    .addCase(logIn.rejected, (state, action) => { //비동기 호출실패
      state.error = action.payload;
    })
    .addMatcher((action)=>{ //여러 action간에 공통적인거 matcher사용해서 처리
      return action.type.includes('./pending') //이부분이 true이면
    },(state, action) => {
      state.isLoading=true
    })
    .addDefaultCase((state, action) => { //defualt일경우작성

    })
})

module.exports = userSlice;
//reducers:동기적 action, 내부적action
//extraReduceres:비동기적 action, 외부적action
//비동기적은 네트워크 요청이 많은데 or setTimeOut  -> thunk사용
//immer 쓰듯이 똑같이 state변경
//action에 대한 data는 무조건 action.payload 통일


//기존 user reducers
// const { produce } = require('immer'); //리듀서를 좀더 직관적인 형태로 정리하기위해 immer사용

// const initialState = {
//   isLoggingIn: false,
//   data: null,
// };

//nextState = produce(prevState, (draft) => {})
//immer => 불변성 유지해주는 라이브러리
// const userReducer = (prevState = initialState, action) => { // action을 바탕으로 새로운 state 만들어주기
//   return produce(prevState, (draft) => {  // produce = nextState
//     switch (action.type) { 
//       case 'LOG_IN_REQUEST':
//         draft.data = null;
//         draft.isLoggingIn = true;
//         break;
//       case 'LOG_IN_SUCCESS':
//         draft.data = action.data;
//         draft.isLoggingIn = false;
//         break;
//       case 'LOG_IN_FAILURE':
//         draft.data = null;
//         draft.isLoggingIn = false;
//         break;
//       case 'LOG_OUT':
//         draft.data = null;
//         break;
//       default:
//         break;
//     }
//   });
// };

// module.exports = userReducer;