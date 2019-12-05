import {
    BOARD_POST,
    BOARD_POST_SUCCESS,
    BOARD_POST_FAILURE,
    BOARD_LIST,
    BOARD_LIST_SUCCESS,
    BOARD_LIST_FAILURE,
        
  } from './ActionTypes';

import axios from 'axios';

/* BOARD POST */
/*
    WRITE board: POST /api/board
    BODY SAMPLE: { contents: "sample "}
    ERROR CODES
        1: NOT LOGGED IN
        2: CONTENTS IS NOT STRING
        3: EMPTY CONTENTS
*/
export function boardPostRequest(contents){
  return (dispatch) => {
    dispatch(boardPost());

    return axios.post('/api/board/', { contents })
    .then((response) => {
      dispatch(boardPostSuccess());
    })
    .catch((error) => {
      dispatch(boardPostFailure(error.reponse.data.code));
    })
  };
}

export function boardPost() {
  return {
    type: BOARD_POST
  };
}

export function boardPostSuccess(){
  return {
    type: BOARD_POST_SUCCESS
  };
}

export function boardPostFailure(error){
  return {
    type: BOARD_POST_FAILURE,
    error
  };
}



/*
    Parameter:
        - isInitial: whether it is for initial loading
        - listType:  OPTIONAL; loading 'old' board or 'new' board
        - id:        OPTIONAL; board id (one at the bottom or one at the top) (listType 파라메터의 기준)
        - username:  OPTIONAL; find boards of following user
*/
export function boardListRequest(isInitial, listType, id, username){
  return (dispatch) => {

    dispatch(boardList());

    let url = '/api/board' ;

    return axios.get(url) 
      .then ((response) => {
        dispatch(boardListSuccess(response.data, isInitial, listType));
      })
      .catch((error) => {
        dispatch(boardListFailure());
      });
  };
}


export function boardList() {
  return {
    type: BOARD_LIST
  }
}
/*
 type, data, isInital, listType 값이 인자로 들어와서 액션 객체의 해당 필드의 값이 된다.
*/
export function boardListSuccess(data, isInitial, listType) {
  return {
    type: BOARD_LIST_SUCCESS,
    data,
    isInitial,
    listType
  }
}

export function boardListFailure() {
  return {
    type: BOARD_LIST_FAILURE,
  }
}