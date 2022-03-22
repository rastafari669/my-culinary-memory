import React,{useState} from 'react';
import {Avatar,Button,Paper,Grid,Typography,Container} from '@material-ui/core';
import useStyles from './styles';
import LockOutlineIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';
import {GoogleLogin} from 'react-google-login'
import Icon from './Icon';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {signin,signup} from '../../actions/auth';
import FileBase from 'react-file-base64';
import avatar from '../../images/avatar.png';
import Joi from 'joi';

 
const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    selectedFile: avatar
}

function Auth() {
    const classes = useStyles();
    const navigate = useNavigate();
    const [formData,setFormData] = useState(initialState);
    const [errors,setErrors] = useState({});
   
    const [showPassword,setShowPassword] = useState(false);

    const [isSignUp,setIsSignUp] = useState(false);    
     
    const dispatch = useDispatch()


    const schema = {
        email: Joi.string()
          .required()
          .email({ tlds: { allow: false } }),
        password: Joi.string().required().min(6),
        confirmPassword: Joi.string().required().min(6),
        firstName: Joi.string().required().min(2),
        lastName: Joi.string().required().min(2),
        // selectedFile: Joi.string().min(11).max(1024).label("Image").allow("")
      };

      const validateForm = () =>{
        const { error } = Joi.object({ ...schema }).validate(formData, {
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
        
       const valid = validateForm()
       

        if(valid){
            setErrors({...errors,errors:valid})
        }
         if(isSignUp && (!valid.email && !valid.confirmPassword && !valid.firstName && !valid.lastName && !valid.password)){
           
            dispatch(signup(formData,navigate))
         }else if(!valid.email && !valid.password){
            dispatch(signin(formData,navigate))
         }
    }

    const handleChange = (e) =>{
       
    
       setFormData({...formData,[e.target.name]: e.target.value})
    }

    const handleShowPassword = () =>{
        setShowPassword((prevShowPassword) => !prevShowPassword);
       
    }

    const switchMode = () =>{
        setIsSignUp((prevIsSignUp) => ! prevIsSignUp);
        setShowPassword(false)
        setErrors({})
    }

    const googleFailure = async (error) =>{
        
      console.log('Google Sign In was unsuccessful!. Try Again Later');
    }

    const googleSuccess = async (res) =>{
      const result = res?.profileObj; 
      const token = res?.tokenId;

      try {
          dispatch({type:'AUTH',data: {result,token}})
          navigate('/');
      } catch (error) {
          
      }
    }

  return (
 <Container component="main" maxWidth="xs">

  <Paper className={classes.paper} elevation={3}>
    <Avatar className={classes.avatar}>
        <LockOutlineIcon/>
    </Avatar>
    <Typography variant='h5'>{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
    <form autoComplete="off" noValidate  className={classes.form} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
           {
               isSignUp && (
                   <>
                 <Input 
                 name="firstName" 
                 label="First Name" 
                 handleChange={handleChange}
                 half
                 error={errors?.errors?.firstName}
                 />
                {/* {errors ? <div>{errors?.errors?.firstName}</div>: null} */}
                 <Input 
                 name="lastName" 
                 label="Last Name" 
                 handleChange={handleChange}
                 half
                 error={errors?.errors?.lastName}
                 />
                
                
                   </>
                  
               )
           }
           <Input 
           name="email" 
           label="Email Address" 
           handleChange={handleChange}
           type="email"
           error={errors?.errors?.email}/>
           <Input 
           name="password" 
           label="Password" 
           handleChange={handleChange}
           type={showPassword ? 'text' : 'password'}
           handleShowPassword={handleShowPassword}
           error={errors?.errors?.password}/>
           {isSignUp && <Input name="confirmPassword"
           label="Repeat Password"
           handleChange={handleChange}
           type="password"
           error={errors?.errors?.confirmPassword}/>
           }
           {isSignUp && <div style={{margin:'10px'}}><FileBase 
           
           type="file"
           multiple={false}
           onDone={({base64}) => setFormData({...formData,selectedFile: base64})}
           
               /></div>
           }
           
        </Grid>
        <GoogleLogin
        clientId='673822743383-55k06717j35lm5doubm05rogdc998p4f.apps.googleusercontent.com'
        render={(renderProps) => (
            <Button 
            className={classes.googleButton}
            color='primary'
            fullWidth
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            startIcon={<Icon/>}
            variant='contained'>
            Google Sign In
            </Button>
        )}
        onSuccess={googleSuccess}
        onFailure={googleFailure}
        cookiePolicy="single_host_origin"
        />
        <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
            {isSignUp ? 'Sign Up' : 'Sign In'}
        </Button>
    
        <Grid container justifyContent='flex-end'>
            <Grid item>
                <Button onClick={switchMode}>
                    {isSignUp ? 'Already have an account ? Sign In' : `Don't have an account ? Sign Up`}
                </Button>
            </Grid>
        </Grid>
    </form>
  </Paper>
 </Container>
  )
}

export default Auth