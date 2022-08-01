import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
const { logIn } = require("./actions/user"); //비동기 action만 actions로 부터 불러옴
const { addPost } = require("./actions/post");
const userSlice = require("./reducers/userSlice");

const priceSelctor = (state)=>state.user.prices

const sumPriceSelector = createSelector( //메모이제이션 기법  price가 변하면 함수 다시 계산해서 totalPrice에 담김 ->createSelector은 여러컴포넌트에서 공유하면x
  priceSelctor,
  (prices)=>prices.reduce((a,c)=>a+c,0)
)

const App = () => {
  const user = useSelector((state) => state.user); //지양하는방법 -> 불필요한 랜더링이 너무 일어남
  //const { list } = useSelector((state) => state.post); //가져오는 데이터가 많으면 이런식으로 객체로 선언 -> 자기판단대로
  const isLogginIn = useSelector((state) => state.user.isLogginIn); //지향하는방법
  const dispatch = useDispatch();

  const totalPrice = useSelector(sumPriceSelector)



  const [loadings, setLoadings] = useState({}); //배열이나 객체 아무거나 상관없음 -> loding reducer,error reducer처럼 따로 만들어도됨
  const [erros, setErros] = useState({});
  const [dones, setDones] = useState({});

  //비동기 액션이 너무 많으면 안좋은점 => error,done,loding세트가 자꾸늘어남 -
  //같은 요청을 자꾸보내는경우 하나의 state가 요청을 모두 처리해야됨 > 해결책 배열로 const[loadings,setLoadings] = useState([])


  // const onClick = useCallback(() => {
  //   dispatch(
  //     logIn({
  //       id: "seok",
  //       password: "비밀번호",
  //     })
  //   );
  // }, []);

  const onClick = useCallback(() => {//로그인같은 한 컴포넌트에만 쓰는 api는 따로 redux에서 처리안해도 됨 //대신 done,error,loading등 전부 구현
    const id = new Date().valueOf()
    setLoadings((prev)=>({
      ...prev,
      [id]:{type:'LOGIN_LOADING'} //랜덤한 아이디:{type:'LOGIN_LOADING} -> 요청별로 성공,실패를 다르게 처리가능 
    }))
    try{
      const response = await axios.post('/login')
      setDones((prev)=>({
        ...prev,
        [id]:{type:'LOGIN_DONE'} 
      }))
    }
    catch(err){
      setErros(err)
    }
    finally{
      setLoadings((pev)=>{
        const newObj = JSON.parse(JSON.stringify(prev))
        delete newObj[id] //로그인성공하면 로딩중 객체에서 해당id제거
        return newObj
      })
    }
  }, []);

  const onLogout = useCallback(() => {  //action
    dispatch(userSlice.actions.logOut()); //slice안에 있는 action의 logout(툴킷이 알아서 action을 만들어줌)
  }, []);

  // const onLogout = useCallback(() => {//기존 동기 dispatch -> logout은 action에서 가져옴
  //   dispatch(logOut()); 
  // }, []);


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

 