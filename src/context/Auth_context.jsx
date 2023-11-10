import { createContext, useContext } from "react";
import useAuth from "../hooks/useAuth";

const AuthContext = createContext()
const AuthProvider = ({children})=>{
    return <AuthContext.Provider value={useAuth()} >{children}</AuthContext.Provider>

}
const useAuthContext = ()=>{
    return useContext(AuthContext)
}
export {AuthProvider,useAuthContext}