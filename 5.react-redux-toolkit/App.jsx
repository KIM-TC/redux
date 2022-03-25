import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

const { logIn } = require("./actions/user"); //비동기 action만 actions로 부터 불러옴
const { addPost } = require("./actions/post");
const userSlice = require("./reducers/userSlice");

const App = () => {
  const user = useSelector((state) => state.user);
  const { list } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  const onClick = useCallback(() => {
    dispatch(
      logIn({
        id: "seok",
        password: "비밀번호",
      })
    );
  }, []);

  const onLogout = useCallback(() => {
    dispatch(userSlice.actions.logOut()); //slice안에 있는 action의 logout(툴킷이 알아서 action을 만들어줌)
  }, []);

  const onAddPost = useCallback(() => {
    dispatch(addPost()); 
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
      <button onClick={onAddPost}>게시글 작성</button>
    </div>
  );
};

export default App;
