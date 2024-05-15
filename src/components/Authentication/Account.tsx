import React, { useState, createContext } from "react";
import {AuthenticationDetails, CognitoUserPool, CognitoUser, CognitoUserAttribute, CognitoAccessToken} from "amazon-cognito-identity-js";
import {CognitoUserSession} from "amazon-cognito-identity-js";
import Pool from "./UserPool";

export interface IAccount{
    authenticate: (Username:string, Password:string) => Promise<any>,
    getSession: () => Promise<any> ,
    logout: () => void,
    isLoggedIn: () => boolean,
    getAccessToken: () => CognitoAccessToken | null,
}

const AccountContext = createContext<IAccount>({
    authenticate: async (Username:string, Password:string) => Promise<any>,
    getSession: async () => Promise<any>,
    logout: () => {},
    isLoggedIn: () => false,
    getAccessToken: () => null,
});

const Account = ({children}: { children: React.ReactNode }) => {
    const [logged, setLogged] = useState(false);
    const [userData, setUserData] = useState(null);
    const [accessToken, setAccessToken] = useState<CognitoAccessToken | null>(null);
    const getSession: () => Promise<any> = async () => {
        return await new Promise((resolve,reject) => {
                const user = Pool.getCurrentUser();
                if(user){
                    console.log("getSession User available")
                    user.getSession(async (err:Error|null, session:null | CognitoUserSession) => {
                        if(err){
                            console.log("getSession err:"+err)
                            reject()
                        }else{
                            console.log("getSession ok")
                            // resolve(session)
                            const attributes :{[key:string]:string;}= await new Promise((resolve,reject)=>{
                                user.getUserAttributes((err: Error|undefined,attributes: CognitoUserAttribute[]|undefined) => {
                                    if(err){
                                        console.log("getUserAttributes err:"+err)
                                        reject(err)
                                    }else{
                                        console.log("getUserAttributes ok")
                                        const results:{[key:string]:string;} = {};
                                        if(attributes != undefined){
                                            for(let attribute of attributes){
                                                const {Name,Value}=attribute;
                                                // console.log("Attributes:")
                                                // console.log(Name+":"+Value);
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
                    console.log("onSuccess:", data);
                    setLogged(true)
                    setAccessToken(data.getAccessToken());
                    resolve(data)
                    //   return navigate("/backend");
                },
                onFailure: (err) => {
                    console.error("onFailure:", err);
                    setLogged(false)
                    setAccessToken(null);
                    reject(err)
                },
                newPasswordRequired: (data) => {
                    console.log("newPasswordRequired:", data);
                    setAccessToken(data.getAccessToken());
                    resolve(data)
                }
            });
        })
    }

    const logout = () => {
        const user = Pool.getCurrentUser();
        console.log("Account logout function")
        if(user){
            user.signOut();
            setLogged(false)
            setAccessToken(null);
        }
    }

    const isLoggedIn = () => {
        return logged;
    }

    const getAccessToken = () => {
        return accessToken;
    }

    return (
        <AccountContext.Provider value={{authenticate, getSession, logout, isLoggedIn, getAccessToken }}>
            {children}
        </AccountContext.Provider>
    )
}

export { Account, AccountContext }