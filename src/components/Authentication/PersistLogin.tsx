import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
// import useRefreshToken from '../hooks/useRefreshToken'; // TODO
import useAuth from "../../hooks/useAuth";
import { verify } from "crypto";
import { loadState, saveState } from "../../helper/sessionStorage";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { refresh, isLoggedIn } = useAuth();

    useEffect(() => {
        const verifyRefreshToken = async () => {
            console.log(`PersistLogin verifyRefreshToken`)
            try{
                console.log(`PersistLogin call useAuth().refresh()`)
                refresh()
                .then(response => {
                    console.log("PersistLogin refresh response:"+response);
                })
                .catch(e => {
                    console.log("PersistLogin refresh error:"+e);
                });
            }
            catch(err){
                console.error(err);
            }finally{
                setIsLoading(false);
            }
        }
        isLoggedIn() ? setIsLoading(false) : verifyRefreshToken()
    }, [])

    useEffect(() => {
        console.log(`PersistLogin isLoading: ${isLoading}`)
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