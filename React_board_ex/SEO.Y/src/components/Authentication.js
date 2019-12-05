import React, { Component } from 'react';
//propTypes 는 리액트가 버전업 되면서 외부 모듈을 설치해 
//import 하여 사용하는 것으로 변경.(2번째 줄)
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/*
 * material UI
 */
import { withStyles } from '@material-ui/core/styles';
import {  
  Card, 
  CardContent,
  Container,
  Typography,
  FormControl,
  Input,
  InputLabel,
  InputAdornment,
  Grid,
  Button 
  
} from '@material-ui/core'
/* 
 * material UI color
 */
import { green, purple, red, blue } from '@material-ui/core/colors';

/* 
 * material UI icon
 */
import AccountCircle from '@material-ui/icons/AccountCircle';
import Lock from '@material-ui/icons/lock';

const authStyle = theme => ({
 
  root: {
    flexGrow: 1,
    marginTop: 150,
    textAlign: 'center'
  },
  button:{
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
    marginTop: 30
  },
  content: {
    backgroundColor: blue[500],
    flex: '1 0 auto',
    color: 'white',
    textAlign: 'center',
  },
  textField: {
    width: 300,
  },
})

class Authentication extends Component {

  state = {
    username: "",
    password: ""
  } 

  handleChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  };

  handleKeyPress = (e) => {
    if(e.charCode == 13){
      if(this.props.mode) {
        this.handleLogin();
      }
      else {
        this.handleRegister();
      }
    }
  }
  handleRegister = () => {
    let id = this.state.username;
    let pw = this.state.password;

    this.props.onRegister(id, pw).then(
      (result) => {
        if(!result) {
          this.setState({
            username: '',
            password: ''
          });
        }
      }
    );
  };

  handleLogin = () => {
    let id = this.state.username;
    let pw = this.state.password;

    this.props.onLogin(id, pw)
      .then(
        (success) => {
          if(!success){
            this.setState({
              password: ''
            });
          }
        }
      )
  }


  render() {

    const { classes } = this.props;

    const inputBoxes = (
      <div>
        <div>
          <FormControl className={classes.textField} >
            <InputLabel>ID</InputLabel>
            <Input
              name="username"
              startAdornment={
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              }
              className="validate"
              onChange={this.handleChange}
              value={this.state.username}
            />
          </FormControl>
        </div>
        <div>
          <FormControl className={classes.textField} >
            <InputLabel>Password</InputLabel>
            <Input
              name="password"
              type='password'
              
              startAdornment={
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              }
              className="validate"
              onChange={this.handleChange}
              value={this.state.password}
              onKeyPress={this.handleKeyPress}
      
            />
          </FormControl>
        </div> 
      </div>
    );

    const loginView = (
      <div>
        <div className="card-content">
          <div className="row">
            {inputBoxes}
              <Button className={classes.button} onClick={this.handleLogin}>SUBMIT</Button >
          </div>
        </div>
 
 
        <div className="footer">
          <div className="card-content">
            <div className="right" >
              New Here? <Link to="/register">Create an account</Link>
            </div>
          </div>
        </div>
      </div>
    )
    const registerView = (
      <CardContent className="card-content">
        <div className="row">
          {inputBoxes}

          <Button className={classes.button} onClick={this.handleRegister}>CREATE</Button >
        </div>
      </CardContent>
    );

    return (
      <div className={classes.root}>

        <Grid 
          container 
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Grid item xs>
            <Link className="logo" to="/"> LOOT TEAM </Link>
          </Grid>
        
          <Grid 
            item
            xs
          >
            <Card className="card">
              <CardContent className={classes.content}>
                <Typography component="h2" variant="h4">
                  {this.props.mode ? "LOGIN" : "REGISTER"}
                </Typography>

              </CardContent>
              
              <CardContent>

                  {this.props.mode ? loginView : registerView }
        
              </CardContent>
            </Card>
          </Grid>

        </Grid>
      </div>

    );
  }
}

Authentication.propTypes = {
  mode: PropTypes.bool,
  onRegister: PropTypes.func,
  onLogin: PropTypes.func
};

Authentication.defaultProps = {
  mode: true,
  onRegister: (id, pw) => { console.error("register function is not defined"); },
  onLogin: (id, pw) => { console.error("login function not defined"); }
};

export default withStyles(authStyle)(Authentication);