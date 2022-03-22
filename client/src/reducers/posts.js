
import {FETCH_ALL,CREATE,UPDATE,DELETE,LIKE, FETCH_BY_SEARCH,START_LOADING,END_LOADING,FETCH_POST,COMMENT} from '../constants/actionTypes';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state={isLoading: true, posts: []},action) =>{
  switch (action.type) {
    case START_LOADING:
     return {...state,isLoading: true}
    case END_LOADING:
      return {...state,isLoading: false}
    case DELETE :
      return{
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload)
      } 

      case FETCH_ALL:
          
          return {
            ...state,
             posts: action.payload.data,
            currentPage: action.payload.currentPage,
            totalNumberOfPages: action.payload.totalNumberOfPages
          };
      case FETCH_BY_SEARCH:
        return {
          ...state,
          posts: action.payload
        };
        case FETCH_POST:
          return {
            ...state,
            post: action.payload
          };
          
          case CREATE:
            
          return {
            ...state, 
            posts: [...state,action.payload]
          };

          case UPDATE:
          case LIKE:
            return {
              ...state, 
              posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post)
            };
          case COMMENT:
            return {
              ...state,
              posts: state.posts.map((post) => {
                if(post._id === action.payload._id){
                  return action.payload;
                }
                return post;
                
              })
            }
           
      default:
          return state;
  }
}