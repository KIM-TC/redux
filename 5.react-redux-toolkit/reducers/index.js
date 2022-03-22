const { combineReducers } = require('redux');
const userSlice = require('./userSlice');
const postSlice = require('./postSlice');

module.exports = combineReducers({
  user: userSlice.reducer,
  post: postSlice.reducer,
});


//reducer -> slice
//slice는 reducer,action,initialState가 다같이 들어있음
//대부분의 action이 특정 reducer에 종속되어 있기떄문에
