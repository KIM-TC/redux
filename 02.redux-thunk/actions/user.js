
//비동기 액션(함수) creator
const logIn = (data) => { 
  return (dispatch, getState) => { // async action -> 동기액션크리에이터와 다르게 함수를 리턴
    dispatch(logInRequest(data)); //로그인요청
    try {
      setTimeout(() => {
        dispatch(logInSuccess({ //로그인성공 // 비동기작업 환경에서 동기작업을 함
          userId: 1,
          nickname: 'seok'
        }));
      }, 2000);
    } catch (e) {
      dispatch(logInFailure(e));//로그인실패
    }
  };
};
//동기 액션크리에이터
const logInRequest = (data) => {
  return {
    type: 'LOG_IN_REQUEST',
    data,
  }
};
//동기 액션크리에이터
const logInSuccess = (data) => {
  return {
    type: 'LOG_IN_SUCCESS',
    data,
  }
};
//동기 액션크리에이터
const logInFailure = (error) => {
  return {
    type: 'LOG_IN_FAILURE',
    error,
  }
};
//동기 액션크리에이터
const logOut = () => {
  return { // action
    type: 'LOG_OUT',
  };
};

module.exports = {
  logIn,
  logOut,
};
