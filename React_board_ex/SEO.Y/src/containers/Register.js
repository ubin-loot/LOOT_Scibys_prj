import React, { Component } from 'react';
import { Authentication } from 'components'
import { connect } from 'react-redux';
import { registerRequest } from '../actions/authentication';


class Register extends Component {
  handleRegister = (id, pw) => {
    return this.props.registerRequest(id, pw)
    .then(
      () => {
        //맘에 안드는 부분
        if(this.props.status === "SUCCESS"){
          Materialize.toast('Success! Please log in.', 2000);
          this.props.history.push('/login');
          return true; 
        }
        else {
          let errorMessage = [
            'Invalid Username',
            'Password is too short',
            'Username already exists'
          ];
            //해결 해야될 부분
          let $toastContent = $('<span style="color: #FFB4BA">' + errorMessage[this.props.errorCode - 1] + '</span>');
            Materialize.toast($toastContent, 2000);
            return false;
        }
      }
    )
  }
  render(){
    return (
      <div>
        <Authentication mode={false} onRegister={this.handleRegister}></Authentication>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
 
  return {
    status: state.authentication.register.status,
    errorCode: state.authentication.register.error
  };
};


const mapDispatchToProps = (dispatch) => {
 
  return {
      registerRequest: (id, pw) => {
          return dispatch(registerRequest(id, pw));
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
