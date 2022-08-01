const logIn = (data) => { // async action creator
  return (dispatch,getState) => { // async action -> 함수를 리턴
    dispatch(logInRequest(data));
    try {
      setTimeout(() => { //비동기는 단지 동기작업들의 순서를 약간 조작하는 것
        dispatch(logInSuccess({
          userId: 1,
          nickname: 'seok'
        }));  
      }, 2000);
      // 원래는 setTimeout이 axios.post().then().catch()으로 대체
    } catch (e) {
      dispatch(logInFailure(e));
    }
  };
}
const logInRequest = (data) => { // sync action creator
  return {
    type: 'LOG_IN_REQUEST', //변수로만들어서 재사용성을 높일수있음(reducer랑action모두쓰게)(여기서는 그냥 문자열삽입)
    data,
  }
};

const logInSuccess = (data) => {
  return {
    type: 'LOG_IN_SUCCESS',
    data,
  }
};

const logInFailure = (error) => {
  return {
    type: 'LOG_IN_FAILURE',
    error,
  }
};

const logOut = () => {
  return { // action
    type: 'LOG_OUT',
  };
};

module.exports = {
  logIn,
  logOut,
};
