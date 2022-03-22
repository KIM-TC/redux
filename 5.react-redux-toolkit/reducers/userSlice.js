const { createSlice } = require('@reduxjs/toolkit');
const { logIn } = require('../actions/user');

const initialState = {
  isLoggingIn: false,
  data: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut(state, action) {
      state.data = null;
    }
  },
  extraReducers: (builder) => builder
    .addCase(logIn.pending, (state, action) => { //thunk: pending,fulfilled,rejected로 나뉨
      state.data = null;
      state.isLoggingIn = true;
    })
    .addCase(logIn.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoggingIn = false;
    })
    .addCase(logIn.rejected, (state, action) => {
      state.error = action.payload;
    })
})

module.exports = userSlice;
//reducers:동기적 action, 내부적action
//extraReduceres:비동기적 action, 외부적action
//비동기적은 네트워크 요청이 많은데 or setTimeOut  -> thunk사용