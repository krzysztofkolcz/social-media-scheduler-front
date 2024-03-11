import React, {useState} from "react";
import UserPool from "./UserPool";

const Signup = () => {
    const [email,setEmail] = useState("test@technicarium.com")
    const [password,setPassword] = useState("Alamakota2@")
    const onSubmit = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        UserPool.signUp(email, password, [] ,[],(err ,data) => {
            if(err) {
                console.error(err)
            }
            console.log(data)

        })
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <label htmlFor="email">Email</label>
                <input value={email} onChange={(event) => setEmail(event.target.value)}></input>
                <label htmlFor="password">Password</label>
                <input value={password} onChange={(event) => setPassword(event.target.value)}></input>
                <button type="submit">Signup</button>
            </form>
        </div>
    )
};

export default Signup;