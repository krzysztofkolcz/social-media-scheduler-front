import  config  from "../config/Config"
import axios from 'axios'
import { useEffect, useState } from "react";
import Settings from '../components/Authentication/Settings'
import useAccount from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import { useNavigate, useLocation } from "react-router-dom";

export default function Hello() {

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const [backendMsg, setBackendMsg] = useState("frontend Message");
  const { isLoggedIn, userSession} = useAccount();
  let accessToken = userSession?.getAccessToken();
  let jwtToken = "";
  if(accessToken != null){
    jwtToken = accessToken.getJwtToken();
  }
  console.log("Backend, user is logged in:"+isLoggedIn());

    // headers: {
        // 'Authorization': `Bearer ${jwtToken}`,
    // }

  useEffect(() => {
    let isMounted = true;
    const getBackendMsg = async () => {
        try {
            const response = await axiosPrivate.get('/api/v1/scheduler', {

            });
            console.log(response.data);
            isMounted && setBackendMsg(response.data);
        } catch (err) {
            console.error(err);
            navigate('/login', {state:{from:location}, replace:true})

        }
    }
    getBackendMsg();
  }, []);

  return (
    <>
      <p>{backendMsg}</p>
    </>
  );
}

