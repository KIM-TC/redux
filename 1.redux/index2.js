const { createStore } = require('redux');

const reducer = (prevState, action) => { //리듀서:액션을 받아서 새로운 state를 만들어주는함수(이전상태,액션) //액션과 리듀서는 짝임
  switch (action.type) {
    case 'LOG_IN':
      return {
        ...prevState, //바뀌지않는건 유지하면서,바뀌는부분만 적용
        user: action.data,
        isLoggingIn:true
      };
    case 'LOG_OUT':
      return {
        ...prevState,
        user: null,
        isLoggingIn:false
      };
    case 'ADD_POST':
      return {
        ...prevState,
        posts: [...prevState.posts, action.data],
      };
    default:
      return prevState;
  }
};

const initialState = {
  user: null,
  isLoggingIn: false,
  posts: [],
  comments: [],
  favorites: [],
  history: [],
  likes: [],
  followers: [],
};
const store = createStore(reducer, initialState); //스토어생성 (리듀서,초기state)
console.log('1st', store.getState());



//action생성

const logIn = (data) => {
  return { 
    type: 'LOG_IN',
    data,
  };
};

const logOut = () => {
  return { 
    type: 'LOG_OUT',
  };
};

const addPost = (data) => {
  return {
    type: 'ADD_POST',
    data,
  }
};

//dispatch 위에부분은 미리정의 , 아랫부분은 필요에따라 쓰기

store.dispatch({
  type: 'LOG_IN_REQUEST',
});

store.dispatch(logIn({
  id: 1,
  name: 'jung',
  admin: true,
}));
console.log('2nd', store.getState());

store.dispatch(addPost({
  userId: 1,
  id: 1,
  content: '안녕하세요. 리덕스',
}));
console.log('3rd', store.getState());

store.dispatch(addPost({
  userId: 1,
  id: 2,
  content: '두번째 리덕스',
}));
console.log('4th', store.getState());

store.dispatch(logOut());
console.log('5th', store.getState());
