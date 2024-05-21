import React, { useState, useContext, useEffect } from "react";
import Link from '@mui/material/Link';
import useAccount from "../../hooks/useAuth";
import Button from '@mui/material/Button';

const lightColor = 'rgba(255, 255, 255, 0.7)';

const Status = () => {
    const [status, setStatus] = useState(false)
    const { getSession, logout, isLoggedIn } = useAccount();

    useEffect(() => {
        getSession().then((session) =>{
            setStatus(true)
        }).catch(err => {
            setStatus(false)
        })
    }, [])

    return <div>{isLoggedIn() ? (
        <Button
            color="secondary"
            type="submit"
            fullWidth
            sx={{ mt: 3, mb: 2 }}
            onClick={logout}
        >Logout</Button>
    ) : <Link 
        variant="body2"
        sx={{
            textDecoration: 'none',
            color: lightColor,
            '&:hover': {
            color: 'common.white',
            },
        }}
        rel="noopener noreferrer"
        target="_blank"
    href="/login">Log in</Link>}</div> 
    
    ;
};
export default Status