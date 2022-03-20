const logIn = (data) => { // async action creator
  return (dispatch, getState) => { // async action
    dispatch(logInRequest(data));
    try {
      setTimeout(() => {
        dispatch(logInSuccess({
          userId: 1,
          nickname: 'zerocho'
        }));
      }, 2000);
      // 원래는 setTimeout이 axios.post().then().catch()으로 대체
    } catch (e) {
      dispatch(logInFailure(e));
    }
  };
}
const logInRequest = (data) => {
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
