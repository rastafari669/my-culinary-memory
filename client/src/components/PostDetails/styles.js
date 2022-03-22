import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  media: {
    borderRadius: '20px',
    objectFit: 'cover',
    width: '100%',
    height: '100%'
    

  },
  card: {
    display: 'flex',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
  },
  section: {
    borderRadius: '20px',
    margin: '10px',
    flex: 1,
  },
  imageSection: {
    marginLeft: '20px',
    width:'500px',
   height: '300px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      width:'100%',
      
    },
  },
  recommendedPosts: {
    alignItems: 'center',
    width:'100%',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
     
    },
  
  },
  recommendedPost: {
    
   width:'150px',
    transition:'2s',
   
    '&:hover':{
      transform: 'scale(1.1)'
    },
    [theme.breakpoints.down('sm')]: {
      flexBasis:"0"
    },
    
  },
  recommandPic:{
  width:'180px',
  height:'180px',
  [theme.breakpoints.down('sm')]: {
   
    width:'100%',
  },
  },
  loadingPaper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    borderRadius: '15px',
    height: '39vh',
  },
  commentsOuterContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      flex: '1'
    },
  },
  commentsInnerContainer: {
    height: '200px',
    overflowY: 'auto',
    marginRight: '30px',
    width: '350px',
    [theme.breakpoints.down('xs')]: {
      width:'100%',
     
    },
  
  },
  commentBox: {
    width:'70%',
    [theme.breakpoints.down('xs')]: {
      width:'100%',
     
    },
  }
  
}));