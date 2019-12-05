import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginRequest } from '../actions/authentication';
import { Authentication } from 'components';


class Login extends Component{
  
  handleLogin = (id, pw) => {
    return this.props.loginRequest(id, pw).then( 
      () => {
        if( this.props.status === "SUCCESS"){
          
          let loginData = {
              isLoggedIn: true,
              username: id
          };

          document.cookie = 'key=' + btoa(JSON.stringify(loginData));
         // console.log(document.cookie)
          //마음에 안드는 부분
          Materialize.toast('Welcome, ' + id + '!', 2000);
          this.props.history.push('/');
          return true;
        }
        else {
          //마음에 안드는 부분
          let $toastContent = $('<span style="color: #FFB4BA">Incorrect username or password</span>');
          Materialize.toast($toastContent, 2000);
          return false;
        }
      }
    );
  }
  render (){
    return (
      <div>
        <Authentication mode={true} onLogin={this.handleLogin}></Authentication>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.authentication.login.status
  };
};




const mapDispatchToProps = (dispatch) => {
  return {
    loginRequest: (id, pw) => {
      return dispatch(loginRequest(id, pw));
    }
  }
};
//기존방식
export default connect(mapStateToProps, mapDispatchToProps)(Login);
//설정하는 방식 다른 예제

/*connect 함수를 통해 Login 컨테이너와 Redux 를 연결합니다.
  mapStateToProps 와 mapDispatchToProps 로 
  리덕스 state 와 thunk 함수를 Login 컴포넌트로 들어온
  props 처럼 사용할 수 있음.
*/
//Login = connect(mapStateToProps, mapDispatchToProps)(Login)
//export default Login;

