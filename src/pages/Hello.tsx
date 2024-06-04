import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import { useNavigate, useLocation } from "react-router-dom";

export default function Hello() {

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const [backendMsg, setBackendMsg] = useState("frontend Message");

  useEffect(() => {
    let isMounted = true;
    const getBackendMsg = async () => {
        try {
            const response = await axiosPrivate.get('/api/v1/scheduler', { });
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

