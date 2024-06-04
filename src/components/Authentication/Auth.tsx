import React, { useState, createContext } from "react";
import {AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoAccessToken, CognitoRefreshToken  } from "amazon-cognito-identity-js";
import {CognitoUserSession} from "amazon-cognito-identity-js";
import Pool from "./UserPool";
import { loadState, saveState } from "../../helper/sessionStorage";

export interface IAuth{
    authenticate: (Username:string, Password:string) => Promise<any>,
    getSession: () => Promise<any> ,
    logout: () => void,
    refresh: () => Promise<any>,
    getAccessToken: () => string | undefined,
    getRefreshToken: () => string | undefined,
    isLoggedIn: () => boolean
}


const AuthContext = createContext<IAuth>({
    authenticate: async (Username:string, Password:string) => Promise<any>,
    getSession: async () => Promise<any>,
    logout: () => {},
    refresh: async () => Promise<any>,
    getAccessToken: () => undefined,
    getRefreshToken: () => undefined,
    isLoggedIn: () => false 
});

const Auth = ({children}: { children: React.ReactNode }) => {
    const [userSession, setUserSession] = useState<CognitoUserSession>();

    const getSession: () => Promise<any> = async () => {
        return await new Promise((resolve,reject) => {
            try{
                const user = Pool.getCurrentUser();
                if(user){
                    console.log("Auth getSession user")
                    user.getSession(async (err:Error|null, session:null | CognitoUserSession) => {
                        if(err){
                            reject(err)
                        }else{
                            const attributes :{[key:string]:string;}= await new Promise((resolve,reject)=>{
                                user.getUserAttributes((err: Error|undefined,attributes: CognitoUserAttribute[]|undefined) => {
                                    if(err){
                                        reject(err)
                                    }else{
                                        const results:{[key:string]:string;} = {};
                                        if(attributes !== undefined){
                                            for(let attribute of attributes){
                                                const {Name,Value}=attribute;
                                                results[Name] = Value;
                                            }
                                        }
                                        resolve(results)
                                    }
                                });
                            });
                            resolve({user, ...session, ...attributes});
                        }
                    });
                }else{
                    reject("No current user")
                }
            }catch(err){
                reject(err)
            }
        })
    }

    const authenticate: (Username:string, Password:string) => Promise<any> = async (Username:string, Password:string) => {
        return await new Promise((resolve,reject) => {
            const user = new CognitoUser({ Username, Pool })
            const authDetails = new AuthenticationDetails({ Username, Password })
            user.authenticateUser(authDetails, {
                onSuccess: (data:CognitoUserSession) => {
                    console.log("Auth authenticate onSuccess:", data);
                    setUserSession(data);
                    saveState("accessToken",data.getAccessToken().getJwtToken()) 
                    saveState("refreshToken",data.getRefreshToken().getToken()) 
                    resolve(data)
                },
                onFailure: (err) => {
                    console.error("Auth authenticate onFailure:", err);
                    setUserSession(undefined);
                    saveState("accessToken",undefined) 
                    saveState("refreshToken",undefined) 
                    reject(err)
                },
                newPasswordRequired: (data) => {
                    console.log("Auth authenticate newPasswordRequired:", data);
                    setUserSession(data);
                    saveState("accessToken",data.getAccessToken().getJwtToken()) 
                    saveState("refreshToken",data.getRefreshToken().getToken()) 
                    resolve(data)
                }
            });
        })
    }

    const logout = () => {
        console.log("Auth logout function")
        try{
            const user = Pool.getCurrentUser();
            if(user){
                user.signOut();
                // setAccessToken(undefined);
            }else{
                // already logged out?
            }
        }catch(err){
            //error by logging out?
            console.log(err);
        }
        setUserSession(undefined);
        saveState("accessToken",undefined) 
        saveState("refreshToken",undefined) 
    }

    const refresh: () => Promise<any> = async () =>  {
        return await new Promise((resolve,reject) => {
            const user = Pool.getCurrentUser();
            console.log('Auth Refresh');
            if(user){
                let refreshToken = getRefreshToken();
                if(refreshToken !== undefined){
                    let rt = refreshToken !== undefined ? refreshToken : "";
                    let cognitoRefreshToken: CognitoRefreshToken= new CognitoRefreshToken({RefreshToken:rt}) ;
                    user.refreshSession(cognitoRefreshToken, (err,session:CognitoUserSession) => {
                        if (err) {//throw err;
                            console.log('Auth Refresh, refreshSession error:'+err);
                            setUserSession(undefined);
                            reject(err);
                        }
                        else{
                            console.log('Auth Refresh, refresh Session:');
                            console.log(session);
                            console.log('Auth Refresh, refresh Session.getAccessToken().getJwtToken():');
                            console.log(session.getAccessToken().getJwtToken());
                            setUserSession(session);
                            resolve(session);
                            saveState("accessToken",session.getAccessToken().getJwtToken());
                            saveState("refreshToken",session.getRefreshToken().getToken());
                        }
                    });
                }else{
                    setUserSession(undefined);
                    saveState("accessToken",undefined);
                    saveState("refreshToken",undefined);
                    reject("Auth Refresh: no refreshToken")
                }
            }else{
                    setUserSession(undefined);
                    saveState("accessToken",undefined);
                    saveState("refreshToken",undefined);
                reject("Auth Refresh: no user")
            }
        });
    }

    const getAccessToken: () => string | undefined = () => {
        return loadState("accessToken", undefined)
    }

    const getRefreshToken: () => string | undefined = () => {
        return loadState("refreshToken", undefined)
    }

    const isLoggedIn: () => boolean = () => {
        return loadState("accessToken", undefined) !== undefined;
    }


    return (
        <AuthContext.Provider value={{ authenticate, getSession, logout, refresh, getAccessToken, getRefreshToken, isLoggedIn}}>
            {children}
        </AuthContext.Provider>
    )
}

export { Auth, AuthContext }
