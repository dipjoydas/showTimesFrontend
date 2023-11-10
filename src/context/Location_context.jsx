import { createContext, useContext } from "react";
import useLocation from "../hooks/useLocation";
// import { useLocation } from "react-router-dom";

const LocationContext =createContext()
const LocationProvider =({children})=>{
    return <LocationContext.Provider value={useLocation()}>{children}</LocationContext.Provider>
}
const useLocationContext =()=>{
    return useContext(LocationContext)
}
export {LocationProvider,useLocationContext}