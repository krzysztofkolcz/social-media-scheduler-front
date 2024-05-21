import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
// import useRefreshToken from '../hooks/useRefreshToken'; // TODO
import useAuth from "../../hooks/useAuth";
import { verify } from "crypto";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    // const refresh = useRefreshToken();
    const { refresh, userSession } = useAuth();

    useEffect(() => {
        const verifyRefreshToken = async () => {
            console.log(`PersistLogin verifyRefreshToken`)
            try{
                console.log(`PersistLogin call useAuth().refresh()`)
                await refresh();
            }
            catch(err){
                console.error(err);
            }finally{
                setIsLoading(false);
            }
        }

        !userSession?.getAccessToken().getJwtToken() ? verifyRefreshToken() : setIsLoading(false) 
    }, [])

    useEffect(() => {
        console.log(`PersistLogin isLoading: ${isLoading}`)
        console.log(`PersistLogin Access Token, JWT Token: ${userSession?.getAccessToken().getJwtToken()}`)
    }, [isLoading])

    return (
        <>
            {isLoading
                ? <p>Loading...</p>
                : <Outlet/>
            }
        </>
    )
}

export default PersistLogin