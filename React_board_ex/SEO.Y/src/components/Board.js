import React, {Component} from 'react';
import PropTypes from 'prop-types';
 
import { withStyles } from '@material-ui/core/styles';

import { red, blue } from '@material-ui/core/colors';
import {
  Card,
  CardHeader, 
  CardContent,
  CardActions,

  Grid,
  IconButton,
  Button,


  Menu,
  MenuItem ,
} from '@material-ui/core'





import Vpn_key from '@material-ui/icons/vpnkey';
import StarIcon from '@material-ui/icons/Star';
import MoreVertIcon  from '@material-ui/icons/MoreVert';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';



const boardStyle = theme => ({

  root: {
    flexGrow: 1,
    marginTop: 100
  },
  button: {
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[500],
    '&:hover': {
      backgroundColor: blue[700],
    },
    marginTop: 30
  },
  card: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,

  },

})




class Board extends Component {
/*
  componentDidUpdate() {
    // WHEN COMPONENT UPDATES, INITIALIZE DROPDOWN
    // (TRIGGERED WHEN LOGGED IN)
    $('#dropdown-button-'+this.props.data._id).dropdown({
        belowOrigin: true // Displays dropdown below the button
    });
  }

  componentDidMount() {
    // WHEN COMPONENT MOUNTS, INITIALIZE DROPDOWN
    // (TRIGGERED WHEN REFRESHED)
    $('#dropdown-button-'+this.props.data._id).dropdown({
        belowOrigin: true // Displays dropdown below the button
    });

  }

*/

  render() {

    const classes = this.props;

    const options = [
      'Edit',
      'Delete',

    ];
    const ITEM_HEIGHT = 48;

    const handleClick = event => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };


    const dropDownMenu = (
      <div>
    
        <PopupState variant="popover" popupId="demo-popup-menu">
          {popupState => (
            <React.Fragment>
              <IconButton variant="contained" color="primary" {...bindTrigger(popupState)}>
                <MoreVertIcon /> 
              </IconButton>
              <Menu {...bindMenu(popupState)}>
                <MenuItem onClick={popupState.close}>Edit</MenuItem>
                <MenuItem onClick={popupState.close}>Delete</MenuItem>
              </Menu>
            </React.Fragment>
          )}
        </PopupState>
      </div>

    );

    const boardView = (

      <Card className={classes.card}>

        <CardHeader
        title={this.props.data.writer}
        action={ this.props.ownership 
          ? dropDownMenu
          : undefined
        }
        />

  

  
        <CardContent>

          {this.props.data.contents}
          
          <div> 
            <IconButton  aria-label="settings"> <StarIcon /> </IconButton>
            <span>0</span>
          </div>
          
        </CardContent>

      </Card>

    );
    return (
      <Grid container spacing={6} justify="center" >
        <Grid item xs={12} >
          { boardView }
        </Grid>
      </Grid>
  


    );
  }
}


Board.propTypes = {
  data: PropTypes.object,
  ownership: PropTypes.bool
};

Board.defaultProps ={
  data: {
    _id: 'id1234567890',
    writer: 'Writer',
    contents: 'Contents',
    is_edited: false,
    date: {
        edited: new Date(),
        created: new Date()
    },
    starred: []
  },
  ownership: true
}
export default withStyles(boardStyle)(Board);
