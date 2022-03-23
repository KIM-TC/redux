const { createSlice } = require('@reduxjs/toolkit');
const { logIn } = require('../actions/user');

const initialState = {
  isLoggingIn: false,
  data: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState, 
  reducers: { //동기적인 action는 reduceres에
    logOut(state, action) {
      state.data = null;
    }
  }, //비동기 action은 extraReducers에 
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
})

module.exports = userSlice;
//reducers:동기적 action, 내부적action
//extraReduceres:비동기적 action, 외부적action
//비동기적은 네트워크 요청이 많은데 or setTimeOut  -> thunk사용
//immer 쓰듯이 똑같이 state변경
//action에 대한 data는 무조건 action.payload 통일