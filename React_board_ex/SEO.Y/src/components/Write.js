import React, { Component } from 'react';
import PropTypes from 'prop-types';

/*
 * material UI
 */
import { withStyles } from '@material-ui/core/styles';

import {
  Card,
  CardContent,
  CardActions,
  TextField,
  Grid,
  Button
} from '@material-ui/core'

import { red, blue } from '@material-ui/core/colors';


const writeStyle = theme => ({

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



class Write extends Component {

  state = {
    contents: ''
  }

  handleChange = (e) => {
    this.setState({
      contents: e.target.value
    });
  }

  handlePost = () => {
    let contents = this.state.contents;
    
    this.props.onPost(contents).then(
      () => {
        this.setState({
          contents: ""
        });
      }
    );
  }


  render () {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={3} justify="center" >
          <Grid item xs={6} >
            <Card className={classes.card} >
              <CardContent>
                <TextField fullWidth  placeholder="Write down your memo" 
                      onChange={this.handleChange} 
                      value={this.state.contents}>
          
                </TextField> 
              </CardContent>
              <CardActions>
                <Button size="small" className={classes.button} onClick={this.handlePost}> POST </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Write.propTypes = {
  onPost: PropTypes.func
};

Write.defaultProps = {
  onPost: (contents) => { console.error("post function not defined") }
}



export default withStyles(writeStyle)(Write);