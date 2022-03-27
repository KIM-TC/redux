import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

const { logIn } = require("./actions/user"); //비동기 action만 actions로 부터 불러옴
const { addPost } = require("./actions/post");
const userSlice = require("./reducers/userSlice");

const App = () => {
  const user = useSelector((state) => state.user); //지양하는방법 -> 불필요한 랜더링이 너무 일어남 
  //const { list } = useSelector((state) => state.post); //가져오는 데이터가 많으면 이런식으로 객체로 선언 -> 자기판단대로
  const isLogginIn = useSelector((state) => state.user.isLogginIn);//지향하는방법
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
      {isLogginIn ? (
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
