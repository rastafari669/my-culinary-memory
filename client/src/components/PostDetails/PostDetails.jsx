import React,{useEffect} from 'react';
import {Paper,Typography,CircularProgress,Divider, Grid} from '@material-ui/core';
import {useDispatch,useSelector} from 'react-redux'
import moment from 'moment';
import {useParams,useNavigate} from 'react-router-dom';
import useStyles from './styles';
import {getPost} from '../../actions/posts';
import CommentSection from './CommentsSection'
import Map from '../Map/Map';
import Media from '../Player/Media';




const PostDetails = () => {

 const {post,posts,isLoading} = useSelector((state) => state.posts);

 const dispatch = useDispatch();
 const navigate = useNavigate();
 const classes = useStyles();
 const {id} = useParams();

 
 

 useEffect(() =>{
   dispatch(getPost(id))
 },[id,dispatch])



 if(!post) return null;

 if(isLoading){
   return <Paper elevation={6} className={classes.loadingPaper}>
    <CircularProgress size="7em"/>
   </Paper>
 }

 const recommendedPosts = posts.filter(({_id}) => _id !== post._id);


 const openPost = (id) =>{
   navigate(`/posts/${id}`)
 }
 
   
  return (
   <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography style={{fontWeight:'bold'}} variant="h3" component="h2">{post.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
          <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
          
          
          
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={post.selectedFile || 'https://cdn4.vectorstock.com/i/1000x1000/05/43/make-memories-that-last-forever-quotes-vector-27730543.jpg'} alt={post.title} />
        </div>

       
      </div>
      <Divider style={{ margin: '20px 0' }} />
          
          
          <CommentSection post={post} />

        
          
          {post?.videoUrl && (
            <>
            <Divider style={{ margin: '20px 0' }} />
            <Media postVid={post.videoUrl}/> 
            </>)}
         
           {(post.lat && post.lng) &&
            <>
            <Divider style={{ margin: '20px 0' }} />
            <h1>Dish comes from:</h1>
              <Map post={post}/>
           </>} 

          <Divider style={{ margin: '20px 0' }} />
      {recommendedPosts.length && (
        <div className={classes.section}>
          <Typography style={{fontWeight: 'bold'}} gutterBottom variant='h5'>You might also like:</Typography>
          <Divider/>

 <Grid container spacing={2} alignItems='stretch' className={classes.recommendedPosts}>

       
              {recommendedPosts.map(({title,message,name,likes,selectedFile,_id}) =>(
                <Grid key={_id} item xs={12} sm={6} md={3} lg={2} >
                <div style={{margin: '10px',cursor:'pointer' }}className={classes.recommendedPost}  onClick={() => openPost(_id)} >
                  <Typography gutterBottom variant='h6'>{title}</Typography>
                  <Typography gutterBottom variant='subtitle2'>{name}</Typography>
                  <Typography gutterBottom variant='subtitle2'>{message}</Typography>
                  <Typography gutterBottom variant='subtitle1'>Likes: {likes.length}</Typography>
                  <img 
                  src={selectedFile} 
                   className={classes.recommandPic}
                  alt={name}
                  style={{borderRadius:'15px'}} />
                </div>
                </Grid>
              ))}
             
              </Grid>
              
        </div>
        
      )}
     
    
      </Paper>
      
  )
}

export default PostDetails