import { Children, createContext,useState } from "react";
import { useEffect } from "react";
import { getme } from "./services/auth.api";



export const AuthContext = createContext()


export const AuthProvider = ({children}) =>{
    const [user,setUser] = useState(null)
    const [loading,setloading] = useState(true)

    

    





return (
    <AuthContext.Provider value={{user,setUser,loading,setloading}}>
        {children}
    </AuthContext.Provider>
)
}