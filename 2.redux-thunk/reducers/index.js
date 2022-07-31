const { combineReducers } = require('redux'); //require가 common.js
const userReducer = require('./user');  //import export는 syntatic sugar
const postReducer = require('./post');

module.exports = combineReducers({ //쪼개진 reducer를 합쳐줌
  user: userReducer, //여기서 user,posts는 initial state변수명과 일치
  posts: postReducer,
});
