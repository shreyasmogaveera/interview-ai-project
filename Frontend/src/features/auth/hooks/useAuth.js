import { useContext,useEffect } from "react";
import { AuthContext } from "../auth.context";
import {login,logout,getme,register} from "../services/auth.api";



export const useAuth = () =>{
    const context = useContext(AuthContext)
    const {user,setUser,loading,setloading} = context;

    const handleLogin = async ({email,password}) =>{
        setloading(true)
        try{
            const data = await login({email,password})
            setUser(data.user)
            console.log(data.user);
        }
        catch(err)
        {

        }
        finally {
            setloading(false)
        }
        
        
    }

    const handleRegister = async ({username,email,password}) =>{
        setloading(true)
        try{
            const data = await register({username,email,password})
        setUser(data.user)
        }
        catch(err)
        {

        }
        finally{
             setloading(false)
        }
        
    }

     const handleLogout = async () =>{
        setloading(true)
        try{
            const data = await logout()
            setUser(null)
        }
        catch(err)
        {

        }
        finally{
            setloading(false)
        }
       
    }

    useEffect(() =>{
          const getAndSetUser = async ()=>{ 
          try{
            const data=await getme()
          
          setUser(data.user)
          }
          catch(err)
          {
            setUser(null)
          }
          finally{
            setloading(false);
          }
          
          }
       getAndSetUser()
    },[])

    return {user,loading,handleLogin,handleRegister,handleLogout}

}

