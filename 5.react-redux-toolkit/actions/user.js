const { createAsyncThunk } = require('@reduxjs/toolkit');

const delay = (time, value) => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(value);
  }, time);
});

exports.logIn = createAsyncThunk('user/logIn', async (data, thunkAPI) => { //pending,fulfilled,rejected로 나뉨
  // throw new Error("비밀번호가 틀렸습니다") //error발생->rejected발생
  return await delay(500,{ //응답 => fulfilled로 전달
    userId: 1,
    nickname: 'seok'
  });
});

//기존처럼 동기action생성함수를 따로만들지x ->toolkit이 알아서(slice안의 reducer에 정의)
//비동기action만 따로 생성 