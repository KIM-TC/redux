//액션생성함수
const addPost = (data) => {
  return {
    type: 'ADD_POST',
    data,
  }
};

module.exports = {
  addPost,
};
