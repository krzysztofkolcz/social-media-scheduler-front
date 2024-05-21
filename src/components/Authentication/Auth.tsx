import React, { useState, createContext } from "react";
import {AuthenticationDetails, CognitoUserPool, CognitoUser, CognitoUserAttribute, CognitoAccessToken, CognitoRefreshToken} from "amazon-cognito-identity-js";
import {CognitoUserSession} from "amazon-cognito-identity-js";
import Pool from "./UserPool";

export interface IAuth{
    authenticate: (Username:string, Password:string) => Promise<any>,
    getSession: () => Promise<any> ,
    logout: () => void,
    isLoggedIn: () => boolean,
    // getAccessToken: () => CognitoAccessToken | undefined,
    logged: boolean,
    refresh: () => void,
    userSession: CognitoUserSession | undefined,
    // authState: {},
    // setAuthState: () => void,
}


const AuthContext = createContext<IAuth>({
    authenticate: async (Username:string, Password:string) => Promise<any>,
    getSession: async () => Promise<any>,
    logout: () => {},
    isLoggedIn: () => false,
    // getAccessToken: () => undefined,
    refresh: () => {},
    logged: false,
    userSession: undefined,
    // authState: {},
    // setAuthState: () => {}
});

const Auth = ({children}: { children: React.ReactNode }) => {
    const [logged, setLogged] = useState(false);
    const [userSession, setUserSession] = useState<CognitoUserSession>();
    const [accessToken, setAccessToken] = useState<CognitoAccessToken>();
    const [refreshToken, setRefreshToken] = useState<CognitoRefreshToken>();
    // const [authState, setAuthState] = useState({});// { user, pwd, roles, accessToken }

    const getSession: () => Promise<any> = async () => {
        return await new Promise((resolve,reject) => {
                const user = Pool.getCurrentUser();
                if(user){
                    console.log("Auth getSession user")
                    user.getSession(async (err:Error|null, session:null | CognitoUserSession) => {
                        if(err){
                            console.log("getSession err:"+err)
                            reject()
                        }else{
                            console.log("Auth getSession async success")
                            // resolve(session)
                            const attributes :{[key:string]:string;}= await new Promise((resolve,reject)=>{
                                user.getUserAttributes((err: Error|undefined,attributes: CognitoUserAttribute[]|undefined) => {
                                    if(err){
                                        console.log("Auth getSession getUserAttributes err:"+err)
                                        reject(err)
                                    }else{
                                        console.log("Auth getSession getUserAttributes")
                                        const results:{[key:string]:string;} = {};
                                        if(attributes != undefined){
                                            for(let attribute of attributes){
                                                const {Name,Value}=attribute;
                                                // console.log("Attributes:")
                                                console.log(Name+":"+Value);
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
        })
    }

    const authenticate: (Username:string, Password:string) => Promise<any> = async (Username:string, Password:string) => {
        return await new Promise((resolve,reject) => {
            const user = new CognitoUser({ Username, Pool })
            const authDetails = new AuthenticationDetails({ Username, Password })
            user.authenticateUser(authDetails, {
                onSuccess: (data:CognitoUserSession) => {
                    console.log("Auth authenticate onSuccess:", data);
                    setLogged(true)
                    console.log("Auth authenticate onSuccess logged:", logged);
                    // setAccessToken(data.getAccessToken());
                    // setRefreshToken(data.getRefreshToken());
                    setUserSession(data);
                    resolve(data)
                    //   return navigate("/backend");
                },
                onFailure: (err) => {
                    console.error("Auth authenticate onFailure:", err);
                    setLogged(false)
                    // setAccessToken(undefined);
                    // setRefreshToken(undefined);
                    setUserSession(undefined);
                    reject(err)
                },
                newPasswordRequired: (data) => {
                    console.log("Auth authenticate newPasswordRequired:", data);
                    // setAccessToken(data.getAccessToken());
                    // setRefreshToken(data.getRefreshToken());
                    setUserSession(data);
                    resolve(data)
                }
            });
        })
    }

    const logout = () => {
        const user = Pool.getCurrentUser();
        console.log("Auth logout function")
        if(user){
            user.signOut();
            setLogged(false)
            setUserSession(undefined);
            // setAccessToken(undefined);
        }
    }

    const isLoggedIn = () => {
        console.log("Auth authenticate onSuccess logged:", logged);
        return logged;
    }

    // const getAccessToken = () => {
    //     return accessToken;
    // }

    const refresh = () => {
        const user = Pool.getCurrentUser();
        console.log('Auth Refresh');
        if(user){
            let refreshToken = userSession?.getRefreshToken();
            let refreshTokenString = refreshToken?.getToken();
            console.log(`Auth Refresh token: ${refreshTokenString}`);
            if(refreshToken != undefined){
                user.refreshSession(refreshToken, (err,session:CognitoUserSession) => {
                    if (err) {//throw err;
                        console.log('In the err'+err);
                    }
                    else{
                        // var regsmar_apiKey = session.idToken.jwtToken; // will this provide new IdToken?
                        // localStorage.setItem('api_key',regsmar_apiKey);
                        console.log('Auth Refresh, refresh Session:'+session);
                        console.log('Auth Refresh, refresh Session:');
                        console.log(session);
                        console.log('Auth Refresh, refresh Session.getAccessToken().getJwtToken():');
                        console.log(session.getAccessToken().getJwtToken());
                        console.log(`Auth Refresh, refresh Session: ${session}`);
                        setUserSession(session);
                    }
                });
            }
            setLogged(false)
            // setAccessToken(undefined);
        }
    }


    return (
        <AuthContext.Provider value={{userSession, authenticate, getSession, logout, isLoggedIn, logged, refresh }}>
            {children}
        </AuthContext.Provider>
    )
}

export { Auth, AuthContext }
