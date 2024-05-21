import  config  from "../config/Config"
import axios from 'axios'
import { useEffect, useState } from "react";
import Settings from '../components/Authentication/Settings'
import useAccount from "../hooks/useAuth";

export default function Backend() {

  const [backendMsg, setBackendMsg] = useState("frontend Message");
  const { isLoggedIn, userSession} = useAccount();
  let accessToken = userSession?.getAccessToken();
  let jwtToken = "";
  if(accessToken != null){
    jwtToken = accessToken.getJwtToken();
  }
  console.log("Backend, user is logged in:"+isLoggedIn());

  const getBackendMsg = async () => {
    const response = await axios.get(config.serverUrl + "/api/v1/scheduler", {
        headers: {
            'Authorization': `Bearer ${jwtToken}`,
        }
    }).then((res) => {
      const data = res.data;
      setBackendMsg(data);
    }).catch(function (error) {
        console.log(error.toJSON());
    });
  };

  useEffect(() => {
    let isMounted = true;
    getBackendMsg();
    console.log("Access token:")
  }, []);

  return (
    <>
      <p>{backendMsg}</p>
      <Settings></Settings>
    </>
  );
}
