import * as api from '../api';
import {AUTH} from '../constants/actionTypes';


export const signin = (formData,navigate) => async (dispatch) =>{

  try {
      //log in th user...
       const {data} = await api.signIn(formData);

       dispatch({type: AUTH,data});
      //navigate to
      navigate('/')
  } catch (error) {
      console.log(error);
  }
}

export const signup = (formData,navigate) => async (dispatch) =>{

    try {
        const {data} = await api.signUp(formData);
           console.log(data);
        dispatch({type: AUTH,data});
        navigate('/');
    } catch (error) {
        console.log(error);
        
    }
  }
  
