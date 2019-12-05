import * as types from 'actions/ActionTypes';

const initialState = {
  post: {
    status: 'INIT',
    error: -1
  },
  list: {
    status: 'INIT',
    data: [],
    isLast: false
  },
  edit: {
    status: 'INIT',
    error: false,
  },
  remove: {
    status: 'INIT',
    error: -1
  },
  star: {
    status: 'INIT',
    error: -1
  }
};

export default function board(state = initialState, action) {
  //action 에 대한 디버깅 해보기 확인
  switch(action.type) {
    case types.BOARD_POST: 
      return {
        ...state, 
        post: {
          ...state.post,
          status: 'WAITING',
          error: -1
        }
      };
    case types.BOARD_POST_SUCCESS:
      return {
        ...state,
        post: {
          ...state.post,
          status: 'SUCCESS'
        }
      };
    case types.BOARD_POST_FAILURE:
      return {
        ...state,
        post: {
          ...state.post,
          status: 'FAILURE',
          error: action.error
        }
      }
    case types.BOARD_LIST:
      return {
        ...state,
        list: {
          ...state.list,
          status: 'WAITING'
        }
      };
    case types.BOARD_LIST_SUCCESS:
      if(action.isInitial){
        return {
          ...state,
          list: {
            ...state.list,
            status: 'SUCCESS',
            data: action.data,
            isLast: action.data.length < 6
          }
        }
      }
      else {
        if(action.listType === 'new'){ //배열의 앞부분
          return {
            ...state,
            list: {
              ...state.list,
              status: 'SUCCESS',
              data: [...action.data, ...state.list.data]
            }
          }
        }
        else { //배열의 뒷 부분
          return {
            ...state, 
            list: {
              ...state.list,
              status: 'SUCCESS',
              data: [...state.list.data, ...action.data],
              isLast: action.data.length < 6
            }
          };
        }
        
      }
    case types.BOARD_LIST_FAILURE:
      return {
        ...state,
        list: {
          ...state.list,
          status: 'FAILEURE'
        }
      };
    
    default:
      return state;
  }
}