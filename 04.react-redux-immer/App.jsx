import React, { Component } from 'react';
import { connect } from 'react-redux';
const { logIn, logOut } = require('./actions/user');


//클래스형
class App extends Component {
  onClick = () => {
    this.props.dispatchLogIn({
      id: 'seok',
      password: '비밀번호',
    });
  };

  onLogout = () => {
    this.props.dispatchLogOut();
  };

  render() {
    const { user } = this.props;
    return (
      <div>
        {user.isLoggingIn
          ? <div>로그인 중</div>
          : user.data
            ? <div>{user.data.nickname}</div>
            : '로그인 해주세요.'}
        {!user.data
          ? <button onClick={this.onClick}>로그인</button>
          : <button onClick={this.onLogout}>로그아웃</button>}
      </div>
    );
  }
}

//클래스형 redux사용방법

//state->props // hook과 다르게 user의 데이터가 바뀌면 posts도 같이 계산해서 가져옴 
const mapStateToProps = (state) => ({
  user: state.user, 
  posts: state.posts,
}); 

//dispatch->props
const mapDispatchToProps = (dispatch) => ({
  dispatchLogIn: (data) => dispatch(logIn(data)),
  dispatchLogOut: () => dispatch(logOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
