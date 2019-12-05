import React, {Component} from 'react';
import {Board} from 'components';
import PropTypes from 'prop-types' 

import { withStyles } from '@material-ui/core/styles';

import { red, blue } from '@material-ui/core/colors';

import AccountCircle from '@material-ui/icons/AccountCircle';
import Lock from '@material-ui/icons/lock';
import More_vert from '@material-ui/icons/MoreVert';

import {
  Card,
  CardContent,
  CardActions,
  TextField,
  Grid,
  Button
} from '@material-ui/core'




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




class BoardList extends Component{

  render() {
    const classes = this.props;
    const mapToComponents = data => {
      return data.map((board, i) => {
        return (
    
       
          <Board  data={board}
                  ownership={ board.writer === this.props.currentUser }
                  key={board._id}
                  index={i}
          />

      
    
        );

      })

    }
    return (
      <Grid container spacing={3} justify="center" >
        <Grid item xs={6} >
            { mapToComponents(this.props.data) }
        </Grid>
      </Grid>
    );
  }

}


BoardList.propTypes= {
  data: PropTypes.array,
  currentUser: PropTypes.string
};

BoardList.defaultProps = {
  data: [],
  currentUser: ''
};

export default withStyles(boardStyle)(BoardList);