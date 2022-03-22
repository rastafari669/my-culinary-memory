import * as api from '../api';
import {FETCH_ALL,CREATE,UPDATE,DELETE,LIKE,FETCH_BY_SEARCH,START_LOADING,END_LOADING,FETCH_POST,COMMENT} from '../constants/actionTypes'

//Actions Creators

//GET ALL POSTS
export const getPosts = (page) => async (dispatch) =>{


    try {
        dispatch({type: START_LOADING});

        const {data} = await api.fetchPosts(page);
        
        dispatch({type: END_LOADING})
            dispatch({type: FETCH_ALL,payload: data})
    } catch (error) {
        console.log(error);
    }
   

     
}

//GET  POST
export const getPost = (id) => async (dispatch) =>{


    try {
        dispatch({type: START_LOADING});

        const {data} = await api.fetchPost(id);
        
        dispatch({type: END_LOADING})

            dispatch({type: FETCH_POST,payload: data})
    } catch (error) {
        console.log(error);
    }
   

     
}




//SEARCH POST
export const getPostsBySearch = (searchQuery) => async (dispatch) =>{


    try {
        dispatch({type: START_LOADING})
        const {data : {data}} = await api.fetchPostsBySearch(searchQuery);
        dispatch({type: END_LOADING})
        dispatch({type: FETCH_BY_SEARCH,payload: data})
    } catch (error) {
        console.log(error);
    }
   
}


//CREATE A NEW POST
export const createPost = (post,navigate) => async (dispatch) =>{


    try {
        dispatch({type: START_LOADING})
        const {data} = await api.createNewPost(post);
        navigate(`/posts/${data._id}`)
        dispatch({type: END_LOADING})
            dispatch({type: CREATE, payload: data})
    } catch (error) {
        console.log(error);
    }
   

     
}

//UPDATE A POST
export const updatePost = (id,post) => async (dispatch) =>{
    
    try {
     const {data} =  await api.updatePost(id,post);  
     dispatch({type: UPDATE, payload: data});
    } catch (error) {
        console.log(error);
    }
}


//DELETE POST

export const deletePost = (id) => async (dispatch) =>{
    try {
        await api.deletePost(id);

        dispatch({type: DELETE,payload: id})
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (id) => async (dispatch) =>{
    try {
        const {data} =  await api.likePost(id); 
         
        dispatch({type: LIKE, payload: data});
    } catch (error) {
        console.log(error);
    }
}


export const commentPost = (value, id) => async (dispatch) =>{
    try {
      const {data} =  await api.comment(value,id);
      dispatch({type: COMMENT,payload:data});

      return data.comments;
    } catch (error) {
        console.log(error);
    }
}




