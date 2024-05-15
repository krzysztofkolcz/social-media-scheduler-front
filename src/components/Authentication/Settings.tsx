import React, { useEffect, useContext, useState } from "react";
import useAccount from "../../hooks/useAccount";

export default () => {
    const { getSession } = useAccount();
    const [loggedin,setLoggedIn] = useState(false);

    useEffect(() => {
        getSession()
            .then(() => {
                console.log("Logged in")
                setLoggedIn(true);
            })
            .catch(() => {
                console.log("Not logged in")
                setLoggedIn(false);
            })
    }, []);

    return (
        <div>
            {loggedin ? ( <> User logged in </>) :
                (<> User not logged in </>) }
        </div>
    )

}