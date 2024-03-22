import React, {useState} from "react";
import {AuthenticationDetails, CognitoUserPool, CognitoUser} from "amazon-cognito-identity-js";
import UserPool from "./UserPool";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {CognitoUserSession} from "amazon-cognito-identity-js";

const Login = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [signUpResult,setSignUpResult]  = useState<CognitoUserSession | undefined>(undefined)
    const onSubmit = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const user = new CognitoUser({
            Username: email,
            Pool: UserPool
        })

        const authDetails = new AuthenticationDetails({
            Username: email,
            Password: password,
        })

        user.authenticateUser(authDetails, {
            onSuccess: (data) => {
                console.log("onSuccess:", data);
                setSignUpResult(data)
            },
            onFailure: (data) => {
                console.error("onFailure:", data);
            },
            newPasswordRequired: (data) => {
                console.log("newPasswordRequired:", data);
            }
        });
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <TextField id="outlined-controlled" label="Email" value={email} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setEmail(event.target.value); }} />
                <TextField id="outlined-controlled" label="Password" value={password} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setPassword(event.target.value); }} />
                <Button variant="outlined" type="submit">Login</Button>
            </form>
        </div>
    )
};

export default Login;