import  config  from "../config/Config"
import axios from 'axios'
import { useEffect, useState } from "react";

import LeftMenu from '../pages/LeftMenu';
import Settings from '../components/Authentication/Settings'
import useAccount from "../hooks/useAccount";


export default function Backend() {

  const [backendMsg, setBackendMsg] = useState("frontend Message");
  const { isLoggedIn, getAccessToken } = useAccount();
  let accessToken = getAccessToken();
  let jwtToken = "";
  if(accessToken != null){
    jwtToken = accessToken.getJwtToken();
  }
  console.log("Backend, user is logged in:"+isLoggedIn());

  const getBackendMsg= () => {
    axios.get(config.serverUrl + "/api/v1/scheduler", {
        headers: {
            'Authorization': `Bearer ${jwtToken}`,
        }
    }).then((res) => {
      const Data = res.data;
      setBackendMsg(Data);
    }).catch(function (error) {
        console.log(error.toJSON());
        // TODO - unauthorized
    });
  };

  useEffect(() => {
    getBackendMsg();
    console.log("Access token:")
  }, []);

  return (
    <>
      <LeftMenu></LeftMenu>
      <Settings></Settings>
    </>
  );
}
