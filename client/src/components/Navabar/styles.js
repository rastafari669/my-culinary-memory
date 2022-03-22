import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
    [theme.breakpoints.down('sm')]: {
       alignItems:'center',
      flexWrap: 'wrap',
      padding: '10px',
      flexDirection: 'column',
    },
 
  },
  heading: {
    color: 'rgba(153, 7, 48, 0.8)',
    textDecoration: 'none',
    fontWeight: "400",
    
  },
  headingText:{
    color: '#d54d7b', 
    fontFamily: "Great Vibes", 
    fontSize: '40px', 
    fontWeight: 'normal', 
    margin: '10px',
    textAlign: 'center', 
    textShadow: '0 1px 1px #fff'
  },
  image: {
    marginLeft: '15px',
    borderRadius: '25px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('sm')]: {
       marginTop: '20px',
       
    },
    
   
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '400px',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
    textDecoration:'none'
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    width: '60px',
    height: '60px'
  },
}));