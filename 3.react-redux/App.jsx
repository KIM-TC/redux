import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
const { logIn, logOut } = require('./actions/user');

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const posts = useSelector((state) => state.posts);

  const onClick = useCallback(() => { //사실 여기서 비동기처리를 해도되는데 ,코드가독성과 재상용성 떄문에 action파일에서 정의
    dispatch(
      logIn({  //비동기action함수 dispatch (비동기action은 devtool에 안걸림),비동기action도 동기action을 시차를두고 눈속임ㄴ
        id: "seok",
        password: "비밀번호",
      })
    );
  }, []);

  const onLogout = useCallback(() => {//동기 action dispatch
    dispatch(logOut()); 
  }, []);
      

  return (
    <div>
      {user.isLoggingIn ? ( 
        <div>로그인 중</div>
      ) : user.data ? (
        <div>{user.data.nickname}</div>
      ) : (
        "로그인 해주세요."
      )}
      {!user.data ? (
        <button onClick={onClick}>로그인</button>
      ) : (
        <button onClick={onLogout}>로그아웃</button>
      )}
    </div>
  );
};

export default App;
