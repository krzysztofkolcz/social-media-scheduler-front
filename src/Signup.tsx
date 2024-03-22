import React, {useState} from "react";
import UserPool from "./UserPool";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {ISignUpResult} from "amazon-cognito-identity-js";

const Signup = () => {
    // let i: ISignUpResult | undefied;
    const [email,setEmail] = useState("")//test@technicarium.com
    const [password,setPassword] = useState("")//Alamakota2@
    const [signUpResult,setSignUpResult]  = useState<ISignUpResult | undefined>(undefined)
    const onSubmit = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        UserPool.signUp(email, password, [] ,[],(err ,data) => {
            if(err) {
                console.error(err)
            }
            setSignUpResult(data)
            console.log(data)
        })
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <TextField id="outlined-controlled" label="Email" value={email} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setEmail(event.target.value); }} />
                <TextField id="outlined-controlled" label="Password" value={password} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setPassword(event.target.value); }} />
                <Button variant="outlined" type="submit">Signup</Button>
            </form>
        </div>
    )
};

export default Signup;