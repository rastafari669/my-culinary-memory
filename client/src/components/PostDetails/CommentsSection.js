import React, {useState} from 'react';
import {Typography,TextField,Button} from '@material-ui/core';
import {useDispatch} from 'react-redux';
import {commentPost} from '../../actions/posts'

import useStyles from './styles';
import { useEffect } from 'react';


const CommentSection = ({post}) =>{

   
    
    const classes = useStyles();
    const dispatch = useDispatch();
    const [comments,setComments] = useState([]);
    const [comment,setComment] = useState('');
    const user = JSON.parse(localStorage.getItem('profile'));
    // const commentRef = useRef()

    useEffect(() =>{
      setComments(post?.comments)
    },[post])

    const handleClick =  async () =>{
        const finalComment = `${user.result.name}: ${comment}`;
      const newComments = await dispatch(commentPost(finalComment,post._id));

      setComments(newComments);
      setComment('');

    //   commentRef.current.scrollIntoView({behavior: 'smooth'})
    }
    return(
    <div>
        <div className={classes.commentsOuterContainer}>
            <div className={classes.commentsInnerContainer}>
                <Typography 
                gutterBottom 
                variant='h6' 
                style={{fontWeight:'bold'}}>Comments</Typography>
                {comments.length ? comments.map((comment,index) =>(
                    <Typography key={index} gutterBottom variant='subtitle1'
                    >
                        <strong>{comment.split(": ")[0]}</strong>
                       <strong style={{color: 'gray'}}>{comment.split(":")[1]}</strong> 

                    </Typography>
                )) : (
                    <>
                    <p>
                        No comments yet...

                    </p>
                    </>
                )}
               
            </div>
            
            
            {user?.result?.name ? (
                <div className={classes.commentBox} >
            <Typography gutterBottom variant='h6' style={{fontWeight:'bold'}}>Write a comment</Typography>
            <TextField
            fullWidth
            
            rows={4}
            variant='outlined'
            label="Comment"
            multiline
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            />
            <Button
            style={{marginTop: '10px'}}
            fullWidth
            disabled={!comment}
            variant='contained'
            onClick={handleClick}
            color='primary'
            >Comment</Button>
            </div>
            ) :(
          
              <>
              <h2 className={classes.commentBox} >Sign In to write your comments!</h2>
              </>
            )
            }
            </div>
            
        </div>
      
  
    )
}

export default CommentSection;