import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
    const { refresh, getAccessToken } = useAuth();
    let jwtToken : string;
    let accessToken: string | undefined;

    useEffect(() => {

        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                accessToken = getAccessToken()
                jwtToken = accessToken !== undefined ? accessToken : "";
                if(!config.headers['Authorization']){
                    config.headers['Authorization'] = `Bearer ${jwtToken}`
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if(error?.response?.status === 403 && !prevRequest?.sent){
                    prevRequest.sent = true;
                    refresh();
                    accessToken = getAccessToken()
                    jwtToken = accessToken !== undefined ? accessToken : "";
                    prevRequest.headers['Authorization'] = `Bearer ${jwtToken}`
                    return axiosPrivate(prevRequest)
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    },[getAccessToken, refresh])


    return axiosPrivate;
}

export default useAxiosPrivate;