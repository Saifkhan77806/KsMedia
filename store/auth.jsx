import { createContext, useContext, useState, useEffect, useMemo } from "react";
import Api from "../coomponents/Api"

export const AuthContext = createContext();


export const Authprovider = ({children}) =>{
     const [opens,setOpens] = useState(false)
     const opened = () =>{
          setOpens(!opens)
     }

     const storetokenInls = (serverToken) =>{
          setToken(serverToken)

          return localStorage.setItem("token", serverToken)
     }

     const [token,setToken] = useState(localStorage.getItem("token"))
     const [user,setUser] = useState("");
     const [userEmail, setUserEmail] = useState("")
     const LogoutUser = () =>{
          setToken("");
          setUser("");
          setUserEmail("")
          return localStorage.removeItem("token")
     }
     let isLogged = !!token;


     useMemo(() =>{
          const fetchData = async() =>{
          try{
               await Api.get("/secret",{
                    headers:{
                         Authorization: token
                    }
               }).then((res)=>{
                    setUser(res.data?.userName);
                    setUserEmail(res.data?.userEmail);

               }).catch((err)=>{
                    console.log(`error from axios secret ${err}`)
               })
           }catch(err){
                console.log(err)
           }
         }

         fetchData();
     },[token]);



     return <AuthContext.Provider value={{isLogged, storetokenInls, LogoutUser, user, userEmail, opened, opens}}>
            {children}
            </AuthContext.Provider>

}

export const useAuth = () =>{
     const authContextValue = useContext(AuthContext);
     if(!authContextValue){
          throw new Error("UseAuth used Outside of the provider");
     }
     return authContextValue;
}