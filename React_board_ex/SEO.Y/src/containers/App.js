import React, { Component } from 'react';

import { Header }  from 'components';
import { connect } from 'react-redux';
import { getStatusRequest, logoutRequest  } from '../actions/authentication';
//전체적인 코드의 내용은 모두 컴포넌트가 처음 렌더링 된 이후에 작동

class App extends Component {
  componentDidMount() {

    function getCookie(name)  {
      var value = "; " + document.cookie; //"...; key=abcdefg; date=2018-06-25; ...";
      var parts = value.split("; ", name + "="); // (2) ["...", "abcdefg; date=2018-06-25; ..."]s

      if(parts.length == 2)
        return parts.pop().split(";").shift();
            
    }

    // get loginData from cookie
    let loginData = getCookie('key');
    

    if(typeof loginData === "undefined") return;

    // decode base64 & parse json 
    loginData = JSON.parse(atob(loginData));

    if(!loginData.isLoggedIn) return;


    // page refreshed & has a session in cookie,
    // check whether this cookie is valid or not
    this.props.getStatusRequest().then(
      () => {
        // if session is not valid
        if(!this.props.status.valid) {
          // logout the session
          loginData = {
            isLoggedIn: false,
            username: ''
          };

          document.cookie = 'key=' + btoa(JSON.stringify(loginData));

          let $toastContent = $('<span style="color: #FFB4BA">Your session is expired, please log in again</span>');
          Materialize.toast($toastContent, 4000);
        }
      }
    );

  }

  handleLogout = () => {
    this.props.logoutRequest().then(
      () => {
        Materialize.toast('Good Bye!', 2000);
 
        // EMPTIES THE SESSION
        let loginData = {
            isLoggedIn: false,
            username: ''
        };

        document.cookie = 'key=' + btoa(JSON.stringify(loginData));
      }
    );
  }

  render() {
    let re = /(login|register)/;
    let isAuth = re.test(this.props.location.pathname);
    
    return (
      <div>
        {isAuth ? undefined 
                : <Header onLogout={this.handleLogout} 
                                  isLoggedIn={this.props.status.isLoggedIn} />}
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    status: state.authentication.status
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getStatusRequest: () => {
      return dispatch(getStatusRequest());
    },
    logoutRequest: () => {
      return dispatch(logoutRequest());
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
