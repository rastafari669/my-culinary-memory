import React,{useState,useEffect} from 'react';
import {AppBar,Avatar,Button,Toolbar,Typography} from '@material-ui/core'
import useStyles from './styles';
import memories from '../../images/memories.png';

import memoriesText from '../../images/memories-Text.png';
import {Link,useNavigate,useLocation} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import decode from 'jwt-decode';

function Navabr() {
    const classes = useStyles();

    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

   

    const logOut = () =>{
      dispatch({type:'LOGOUT'});
      navigate('/');
      setUser(null);
       
    }

    useEffect(() =>{
      const tokenUser = user?.token;
        if(tokenUser){
          const decodedToken = decode(tokenUser)
          
          if(decodedToken.exp * 1000 < new Date().getTime()){
            logOut();
          }
        }
      //JWT
      setUser(JSON.parse(localStorage.getItem('profile')));
    },[location,user?.token])


   

  return (
    <AppBar  className={classes.appBar} 
    
    position='static' color='inherit'>

    <Link to="/" className={classes.brandContainer}>
    <h1 className={classes.headingText}>Culinary</h1>
    
   <img src={memoriesText} alt="icon" height='45px' />
              <img 
              className={classes.image}
              src={memories} 
              alt="memories" 
              height="40px"></img>
    </Link>

    <Toolbar className={classes.toolbar}>
     {user ? (
      <div className={classes.profile}>
          <Avatar 
          className={classes.purple} 
          alt={user.result.name}
          src={user.result.selectedFile }>
        
          </Avatar>
          <Typography 
          className={classes.userName}
          variant="h6"
          >
          {user.result.name}</Typography>
          <Button variant="contained" className={classes.logout} color="secondary" onClick={logOut}>Logout</Button>
      </div>
     ): (
      <Button 
      component={Link} 
      to="/auth" 
      variant='contained'
      color='primary'
      >Sign In</Button>
     )}
    </Toolbar>
            
          </AppBar>
  )
}

export default Navabr