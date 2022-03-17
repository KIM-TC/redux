const initialState = []; //posts

const postReducer = (prevState = initialState, action) => { // 새로운 state 만들어주기
  switch (action.type) {
    case 'ADD_POST':
      return [...prevState, action.data];
    default:
      return prevState;
  }
};

module.exports = postReducer; //리듀서를 따로빼서 모듈로 만들어줌
