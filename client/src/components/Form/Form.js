/* eslint-disable react/style-prop-object */
import React, { useState,useEffect } from 'react';
import useStyles from './styles';
import {TextField,Button,Typography,Paper} from '@material-ui/core'
import FileBase from 'react-file-base64';
import {useDispatch, useSelector} from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';
import {useNavigate} from 'react-router-dom'
import Joi from 'joi';


function Form({currentId,setCurrentId}) {

  const classes = useStyles();

 const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const user = JSON.parse(localStorage.getItem('profile'))


   
  
const [errors,setErrors] = useState()

  const [postData,setPostData] = useState({
    
    title: '',
    message: '',
    tags: '',
    selectedFile: '',
    videoUrl: '',
    lat: '',
    lng: ''
  });

  
  const schema = {
    title: Joi.string().required(),
    message: Joi.string().required(),
    lat: Joi.number().min(-90).max(90).allow(''),
    lng: Joi.number().min(-180).max(180).allow('')
   
  };


 
  

  useEffect(() => {
    if(post) setPostData(post);
    
    if(!postData?.selectedFile){
      setPostData({...postData,
      selectedFile: 'https://cdn4.vectorstock.com/i/1000x1000/05/43/make-memories-that-last-forever-quotes-vector-27730543.jpg'})
    }
    
   }, [post,postData.selectedFile])



   const validateForm = () =>{
     const {lng,lat,title,message} = {...postData}
    
    const { error } = Joi.object({ ...schema }).validate({lat,lng,title,message}, {
        abortEarly: false,
      });
  
      if (!error) {
        return null;
      }
  
      const errors = {};
      for (const detail of error.details) {
        errors[detail.path[0]] = detail.message;
      }
   
      return errors;
  }

  const handleSubmit = (e) =>{
   
    e.preventDefault();

   const valid = validateForm();


   if(valid){
   setErrors({...errors,errors:valid})
   }

      if(currentId && !valid){
        dispatch(updatePost(currentId, {...postData,name: user?.result?.name}));
        clear();
      }else if(!valid){
        
          dispatch(createPost({...postData,name: user?.result?.name},navigate));
          clear();
       }

     
    }



  if(!user?.result?.name){
    return(
     <Paper className={classes.paper}>
        <Typography variant='h6' align='center'>
          Please Sign In to create your own memories and like other's memories
        </Typography>
     </Paper>
    )
  }

  const clear = () =>{
    setCurrentId(0);
    setPostData({ 
    title: '',
    message: '',
    tags: '',
    selectedFile: '',
    videoUrl: '',
    lat: '',
    lng: ''
  })
  }
  
  return (
   <Paper className={classes.paper} elevation={6}>
     <form 
     autoComplete="off" 
     noValidate 
     className={`${classes.root} ${classes.form}`}
     onSubmit={handleSubmit}>
     <Typography variant='h6'>{currentId ? 'Editing' : 'Creating'} a Memory</Typography>
   

    

     <TextField 
     name='title' 
     variant='outlined' 
     label='Title' 
     fullWidth
     value={postData.title}
     onChange={(e) => setPostData({...postData, title: e.target.value})}/>
     {errors && (<p style={{color:'red',margin: '0'}}>{errors?.errors?.title}</p>)}


     <TextField 
     name='message' 
     variant='outlined' 
     label='Message' 
     rows={2}
     fullWidth
     multiline
     value={postData.message}
     onChange={(e) => setPostData({...postData, message: e.target.value})}/>
     {errors && (<p style={{color:'red',margin:'0'}}>{errors?.errors?.message}</p>)}

     <TextField 
     name='tags' 
     variant='outlined' 
     label='Tags' 
     fullWidth
     value={postData.tags}
     onChange={(e) => setPostData({...postData, tags: e.target.value.split(',')})}/>

     <TextField 
     name='videoUrl' 
     variant='outlined' 
     label='Video URL' 
     fullWidth
     value={postData.videoUrl}
     onChange={(e) => setPostData({...postData, videoUrl: e.target.value})}/>

     <TextField 
     name='latitude' 
     variant='outlined' 
     label='Location Latitude' 
     fullWidth
     value={postData.lat}
     onChange={(e) => setPostData({...postData, lat: e.target.value})}/>
     {errors && (<p style={{color:'red',margin:'0'}}>{errors?.errors?.lat}</p>)}

     <TextField 
     name='longitude' 
     variant='outlined' 
     label='Location Longitude' 
     fullWidth
     value={postData.lng}
     onChange={(e) => setPostData({...postData, lng: e.target.value})}/>
     {errors && (<p style={{color:'red',margin:'0'}}>{errors?.errors?.lng}</p>)}

     <div className={classes.fileInput}>
       <FileBase 
       type="file"
       multiple={false}
       onDone={({base64}) => setPostData({...postData,selectedFile: base64})}
       />
       <Button 
       className={classes.buttonSubmit}
       variant="contained"
       color='primary'
       size='large'
       type='submit'
       fullWidth

       >Submit</Button>

       <Button 
       
       variant="contained"
       color='secondary'
       size='small'
       type='button'
       fullWidth
        onClick={clear}
       >Clear</Button>
     </div>

     
     </form>
   </Paper>
  )
}

export default Form
