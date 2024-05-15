import React, {useState,useContext} from "react";
import {AccountContext} from "./Account";
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
import validator from "validator";
import { useTranslation } from 'react-i18next';
import useAccount from "../../hooks/useAccount";
import { useNavigate } from "react-router-dom";
import FormHelperText from '@mui/material/FormHelperText';

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

export default function SignIn() {

    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    // const [email,setEmail] = useState("")
    const [isEmailError,setIsEmailError] = useState(false)
    const [emailError,setEmailError] = useState("")
    // const [password,setPassword] = useState("")
    const [passwordError,setPasswordError] = useState("")
    const [isPasswordError,setIsPasswordError] = useState(false)
    const [helperText, setHelperText] = useState("") 


    const { isLoggedIn } = useAccount();
    console.log("LoginMui, user is logged in:"+isLoggedIn());
    const {authenticate } = useAccount();

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
      authenticate(emailValue,passwordValue)
      .then(data => {
        console.log("Logged in:", data);
        return navigate("/backend");
      }).catch(err => {
        console.log("Logged error:", err);
        setHelperText(t('loginMui.error.incorrectUsernameOrPassword'))
      });

    }

  const validateEmail = (email: FormDataEntryValue | null) => {
    if (email == null || email == ""){
      setIsEmailError(true)
      setEmailError(t('loginMui.emailCannotBeEmpty'));
      return false
    }
    if(!validator.isEmail(email)){
      setIsEmailError(true)
      setEmailError(t('loginMui.incorrectEmail'));
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
      setPasswordError(t('loginMui.passwordCannotBeEmpty'));
      return false
    }
    if(passwordValue == ""){
      setIsPasswordError(true)
      setPasswordError(t('loginMui.passwordCannotBeEmpty'));
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
            {t('loginMui.signIn')}
          </Typography>
          <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label={t('loginMui.emailAddress')}
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
              label={t('loginMui.password')}
              type="password"
              id="password"
              autoComplete="current-password"
              error={isPasswordError}
              helperText={isPasswordError ? passwordError : "" }
            />
            <FormHelperText>{helperText}</FormHelperText>
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label={t('loginMui.rememberMe')}
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  {t('loginMui.forgotPassword')}
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {t('loginMui.dontHaveAccount')}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
  );
}