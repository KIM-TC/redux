//액션생성함수
const logIn = (data) => { 
  return (dispatch, getState) => { // async action
    dispatch(logInRequest(data));
    try {
      setTimeout(() => {
        dispatch(logInSuccess({
          userId: 1,
          nickname: 'zerocho'
        }));
      }, 2000);
    } catch (e) {
      dispatch(logInFailure(e));
    }
  };
};

const logInRequest = (data) => {
  return {
    type: 'LOG_IN_REQUEST',
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
