const { createStore } = require('redux');

const reducer = (prevState, action) => {//리듀서:액션을 받아서 새로운 state를 만들어주는함수(이전상태,액션)
  switch (action.type) {                
    case 'CHANGE_COMP_A':
      return {
        ...prevState, //바뀌지않는건 유지하면서,바뀌는부분만 적용
        compA: action.data,
      };
    case 'CHANGE_COMP_B':
      return {
        ...prevState,
        compB: action.data,
      };
    case 'CHANGE_COMP_C':
      return {
        ...prevState,
        compC: action.data,
      };
    default: //defalut 필수: 없는 action을 dispatch할경우(오타) return할 값이 있어야됨
      return prevState;
  }
};
const initialState = {
  compA: 'a',
  compB: 12,
  compC: null,
};
const store = createStore(reducer, initialState);  //스토어생성 (리듀서,초기state)

console.log('1st', store.getState());  //compA:'a'



//이런식으로 액션을 생성하면 b,c,d,e등등 여러가지에 대응하는 액션을 못만듬 -> 따라서 액션생성함수 사용(액션을 동적으로 생성)
// store.dispatch({
//   type: 'CHANGE_COMP_A',
//   data: 'b',
// });

const changeCompA = (data) => { //액션생성함수: 액션은 함수가 아니라 객체임
  return { 
    type: 'CHANGE_COMP_A', //액션이름
    data, //컴포넌트 a-> ?로 바꾸는 액션
  };
};

store.dispatch(changeCompA('b'));  //둘이 동일
// store.dispatch({  
//   type: 'CHANGE_COMP_A', 
//   b, 
// }); 


console.log('2nd', store.getState());//compA:'b'
