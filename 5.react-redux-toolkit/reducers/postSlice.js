const { createSlice } = require('@reduxjs/toolkit');
const { addPost } = require('../actions/post');

const initialState = {
  list: [],
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {}, //동기적 action, 내부적action
  extraReducers: (builder) => builder   //비동기적 action, 외부적action
    .addCase(addPost.pending, (state, action) => {

    })
    .addCase(addPost.fulfilled, (state, action) => {
      state.list.push(action.payload);
    })
    .addCase(addPost.rejected, (state, action) => {

    })
});

module.exports = postSlice;

//기존 post reducers
// const { produce } = require('immer');

// const initialState = [];

// const postReducer = (prevState = initialState, action) => { // 새로운 state 만들어주기
//   return produce(prevState, (draft) => {
//     switch (action.type) {
//       case 'ADD_POST':
//         draft.push(action.data); //[...prevState, action.data];
//         break;
//       default:
//         break; //prevState;
//     }
//   });
// };

// module.exports = postReducer;