import React, {Component} from  'react';

import { Write, BoardList } from 'components';
import {boardPostRequest, boardListRequest } from 'actions/board';
import { connect } from 'react-redux';


class Home extends Component {

  handlePost = (contents) => {
    return this.props.boardPostRequest(contents)
      .then(
        () => {
          if(this.props.postStatus.status === "SUCCESS"){
            Materialize.toast('Success!', 2000);
          }else {
            console.log("postStatus ERR")
          } 
        }
      )
  }

  componentDidMount() {
    this.props.boardListRequest(true, undefined, undefined, undefined);

  }
  render() {
    const write = ( <Write onPost={this.handlePost} />)
    return (
      <div className="wrapper">
        { this.props.isLoggedIn? write : undefined} 
        
        <BoardList  data={this.props.boardData}  
                    currentUser={this.props.currentUser} />

                    
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.authentication.status.isLoggedIn,
    postStatus: state.board.post,

    currentUser: state.authentication.status.currentUser,
    boardData: state.board.list.data,
    listStatus: state.board.list.status,
    isLast: state.board.list.isLast
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    boardPostRequest: (contents) => {
      return dispatch(boardPostRequest(contents));
    },
    
    boardListRequest: (isInitial, listType, id, username) => {
      return dispatch(boardListRequest(isInitial, listType, id, username));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);