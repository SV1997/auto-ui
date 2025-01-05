import {getAuth, onAuthStateChanged} from 'firebase/auth'
import {app} from '../firebase/firebaseConfig'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
const auth = getAuth(app)
import { ReactNode } from 'react';

function AuthLayout({children}: {children: ReactNode}){
try {
    const status= useSelector((state:any)=>state.auth.status)
    const navigate = useNavigate()
    useEffect(() =>{
    {const unsubscribe = onAuthStateChanged(auth, (user) => {
        console.log(user);
        
        if(!status&&!user) {
            navigate('/login')
            return () => {
                unsubscribe()
            }
        }
    else if(status && user){
            navigate('/workshops')
    }
    return () => {
        unsubscribe()
    }
}
)}
},[status,navigate])
} catch (error) {
    console.log(error);
    
}

return <>{children}</>
}

export default AuthLayout