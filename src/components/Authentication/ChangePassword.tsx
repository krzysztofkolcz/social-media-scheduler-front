import React, {useState} from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {validatePassword}  from '../../common/Util'
import { useTranslation } from 'react-i18next';
import useAccount from "../../hooks/useAccount";
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Status from './Status'

export default () => {

    const { t, i18n } = useTranslation();
    const [password,setPassword] = useState("")
    const [passwordError,setPasswordError] = useState("")
    const [isPasswordError,setIsPasswordError] = useState(false)

    const [newPassword,setNewPassword] = useState("")
    const [newPasswordError,setNewPasswordError] = useState("")
    const [isNewPasswordError,setIsNewPasswordError] = useState(false)

    const [confirmPassword,setConfirmPassword] = useState("")
    const [confirmPasswordError,setConfirmPasswordError] = useState("")
    const [isConfirmPasswordError,setIsConfirmPasswordError] = useState(false)
    const { getSession, logout } = useAccount();


    getSession().then(()=>{

    });
    const onSubmit = (event : React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const data = new FormData(event.currentTarget);
      let password = data.get('password');
      let newPassword = data.get('newPassword');
      let confirmPassword = data.get('confirmPassword');
      let [validNewPassword, errorMsg] = validatePassword(newPassword);
      if(!validNewPassword){
        setIsNewPasswordError(true)
        setNewPasswordError(errorMsg);
        console.log("Pass invalid:");
        return;
      }
      if(newPassword !== confirmPassword){
        setIsNewPasswordError(true)
        setNewPasswordError(t('changePassword.passwordsDontMatch'));
        console.log("password !== confirmPassword");
        return;
      }

      getSession().then(({user})=>{
        console.log("User:"+user);
        console.log("changePassword attempt");
        user.changePassword(password,newPassword, (err:Error, result:string) => {
          if(err){
            console.log("Change password error:"+err);
          }else{
            console.log("Change password result:"+result);
          }
        });
      })
    }

    return (
      <>
        <Status />
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            ></Box>
            <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
                <div>
                  <TextField 
                      id="password" 
                      label={t('changePassword.password')}
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      autoComplete="password"
                      autoFocus
                      error={isPasswordError}
                      helperText={isPasswordError ? passwordError : "" }
                  
                  />
                  <TextField 
                      id="newPassword" 
                      label={t('changePassword.newPassword')}
                      margin="normal"
                      required
                      fullWidth
                      name="newPassword"
                      autoComplete="newPassword"
                      autoFocus
                      error={isNewPasswordError}
                      helperText={isNewPasswordError ? newPasswordError : "" }
                  
                  />
                  <TextField 
                      id="confirmPassword" 
                      label={t('changePassword.confirmPassword')}
                      margin="normal"
                      required
                      fullWidth
                      name="confirmPassword"
                      autoComplete="confirmPassword"
                      autoFocus
                      error={isConfirmPasswordError}
                      helperText={isConfirmPasswordError ? confirmPasswordError : "" }
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    {t('changePassword.changePassword')}
                  </Button>
                </div>
            </Box>
          </Container>
      </>
    )

}