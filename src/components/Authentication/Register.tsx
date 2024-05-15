import React, {useEffect, useState} from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import UserPool from "./UserPool";
import { useNavigate } from "react-router-dom";
import {CognitoUserSession, ISignUpResult} from "amazon-cognito-identity-js";
import { useAppSelector, useAppDispatch } from '../../hooks'
import {AuthenticationDetails, CognitoUserPool, CognitoUser} from "amazon-cognito-identity-js";
import validator from "validator";





function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Technicarium
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO 
// 1. Validate inputs - email, password
// 2. Restore password
// 3. Session timeout
const defaultTheme = createTheme();
const regex = new RegExp("/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=]).{8,}$/");

export default function Register() {

    let navigate = useNavigate();

    const [email,setEmail] = useState("")
    const [isEmailError,setIsEmailError] = useState(false)
    const [emailError,setEmailError] = useState("")

    const [password,setPassword] = useState("")
    const [passwordError,setPasswordError] = useState("")
    const [isPasswordError,setIsPasswordError] = useState(false)

    const [confirmPassword,setConfirmPassword] = useState("")
    const [confirmPasswordError,setConfirmPasswordError] = useState("")
    const [isConfirmPasswordError,setIsConfirmPasswordError] = useState(false)

    useEffect(() => {
      const match = password === confirmPassword
      if(!match){
        setPasswordError("Passwords don't match")
      }
    },[password,confirmPassword])

    const [signUpResult,setSignUpResult]  = useState<ISignUpResult | undefined>(undefined)

    const onSubmit = (event : React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const data = new FormData(event.currentTarget);
      let email = data.get('email');
      let password = data.get('password');
      let validEmail = validateEmail(email);
      let validPassword = validatePassword(password);
      if(!validPassword || !validEmail){
        return;
      }

      let emailValue = email==null?"":email.toString()
      let passwordValue = password==null?"":password.toString()

      const user = new CognitoUser({
          Username: emailValue,
          Pool: UserPool
      })

      const authDetails = new AuthenticationDetails({
          Username: emailValue, 
          Password: passwordValue,
      })

      event.preventDefault()
      UserPool.signUp(emailValue, passwordValue, [] ,[],(err ,data) => {
          if(err) {
              console.error(err)
          }
          setSignUpResult(data)
          console.log(data)
      })
    }

  const validateEmail = (email: FormDataEntryValue | null) => {
    if (email == null || email == ""){
      setIsEmailError(true)
      setEmailError("Email cannot be empty");
      return false
    }
    if(!validator.isEmail(email)){
      setIsEmailError(true)
      setEmailError("Incorrect email address");
      return false
    }
    setIsEmailError(false)
    setEmailError("");
    return true

  }
  const validatePassword = (password: FormDataEntryValue | null) => {

    let passwordValue = password==null?"":password.toString()
    if (password == null ){
      setIsPasswordError(true)
      setPasswordError("Password cannot be empty");
      return false
    }
    if(passwordValue == ""){
      setIsPasswordError(true)
      setPasswordError("Password cannot be empty");
      return false
    }
    if(!regex.test(passwordValue)) {
      setIsPasswordError(true)
      setPasswordError("Password should contains at least 1 number, 1 special character, 1 uppercase and 1 lowercase letter");
      return false
    }
    setIsPasswordError(false)
    setPasswordError("");
    return true
  }

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={isEmailError}
              helperText={isEmailError ? emailError : "" }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={isPasswordError}
              helperText={isPasswordError ? passwordError : "" }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="confirmPassword"
              type="confirmPassword"
              id="confirmPassword"
              autoComplete="current-confirmPassword"
              error={isConfirmPasswordError}
              helperText={isConfirmPasswordError ? confirmPasswordError : "" }
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/login" variant="body2">
                        Already have account? Log in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
  );
}



// const Register = () => {
//     // let i: ISignUpResult | undefied;
//     const [email,setEmail] = useState("")//test@technicarium.com
//     const [password,setPassword] = useState("")//Alamakota2@
//     const [signUpResult,setSignUpResult]  = useState<ISignUpResult | undefined>(undefined)
//     const onSubmit = (event : React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault()
//         UserPool.signUp(email, password, [] ,[],(err ,data) => {
//             if(err) {
//                 console.error(err)
//             }
//             setSignUpResult(data)
//             console.log(data)
//         })
//     }

//     return (
//         <div>
//             <form onSubmit={onSubmit}>
//                 <TextField id="outlined-controlled" label="Email" value={email} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setEmail(event.target.value); }} />
//                 <TextField id="outlined-controlled" label="Password" value={password} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setPassword(event.target.value); }} />
//                 <Button variant="outlined" type="submit">Signup</Button>
//             </form>
//         </div>
//     )
// };

// export default Register;