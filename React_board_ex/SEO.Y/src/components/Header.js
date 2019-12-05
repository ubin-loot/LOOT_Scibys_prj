import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Vpn_key from '@material-ui/icons/vpnkey';
import Lock_open from '@material-ui/icons/LockOpen';
import SearchIcon from '@material-ui/icons/Search';

import { AppBar, Toolbar, Menu, Typography,  IconButton  } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const headerStyle = theme => ({
  root: {
    flexGrow: 1,
  },
  topButtons: {
    color: "#fff"
  },
  title: {
    flexGrow: 1,


  },
  toolbar: {
    minHeight: 128,
    alignItems: 'flex-start',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
})

class Header extends Component {
  render() {

    const { classes } = this.props;

    const loginButton = (
        <div>
          <Link to="/login">
            <IconButton edge="start" className={classes.topButtons} >
                <Vpn_key />
            </IconButton>
          </Link>

      </div>
    );

    const logoutButton = (

      <div>
        <Link to="/login">
          <IconButton edge="start" onClick={this.props.onLogout} className={classes.topButtons} >
              <Lock_open />
          </IconButton>
        </Link>

      </div>
    )

   
    return (
      <div>
        <nav>
          <AppBar position="static" >
            <Toolbar>
              <IconButton edge="start" onClick={this.toggleSearch} className={classes.topButtons} >
                <SearchIcon />
              </IconButton> 
    
                <Typography className={classes.title} variant="h5" noWrap>
                  Bye-mars UI         
                </Typography>
       
                {  this.props.isLoggedIn 
                            ? logoutButton 
                            : loginButton }
            
            </Toolbar>
          </AppBar>
     
        </nav>
      </div>

    )
  }
}
Header.propTypes = {
  isLoggedIn: PropTypes.bool,
  onLogout: PropTypes.func
};

Header.defaultProps = {
  isLoggedIn: false,
  onLogout:() => { console.error("logout function not defined");}
};

export default withStyles(headerStyle)( Header);