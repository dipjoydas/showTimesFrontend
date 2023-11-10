import React, { useEffect, useRef, useState } from 'react';
import './logIn.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/Auth_context';
import { useLocationContext } from '../../context/Location_context';


const LogIn = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const {baseUrl} =useLocationContext()
    const [errorMessage,setErrorMessage] =useState('')
    const from = location.state?.from?.pathname || '/'
    const {logIn,setUser,user,setLoading} =useAuthContext()
    const emailValue = useRef()
    const passwordValue =useRef()
    const handleLogIn = async(e)=>{
        e.preventDefault()
        const email = emailValue.current.value
        const password = passwordValue.current.value 
        // logIn(email,password)   
        // ---------------------------------------------------------------------------
        try {
            const userInfo = { email, password }
            const res = await fetch(`${baseUrl}/api/auth/user/login`, {
                method: "POST",
                headers: {
                    "content-Type": "application/json"
                },
                body: JSON.stringify(userInfo)
            }
            )
           
            if(res.status == '400'){
             
                const result = await res.json()
                setErrorMessage(result.msg)

            }else {
               
                const result = await res.json()
            setUser(result.user)
            
       
            const token = `Bearer ${result.token}`
            const stringifiedToken = JSON.stringify(token)

            localStorage.setItem("token", stringifiedToken)
            setLoading(false)
            navigate(from,{replace:true})

            }
            
            


            
         
            


        } catch (error) {
            console.log(error)

        }


        // -----------------------------------------------------------------------------
        // navigate(from,{replace:true})
        // navigate('/')
        
    }
    return (
        <div className='logInContainer '>
            <div className='logIn'>
                <h1 className='text-lg'>Please log in</h1>
                <form action=""onSubmit={handleLogIn}>
                <label className='text-white' htmlFor="email">Email</label>
                <input ref={emailValue} type="email" name="" id="email" placeholder='email' />
                <label className='text-white' htmlFor="password">Password</label>
                <input ref={passwordValue} type="password" name="" id="password" placeholder='Password'/>
                <input type="submit" value="log in" className='bg-orange-500' />
                <p>{errorMessage}</p>
                

                </form>
                <h1 className='text-white'>Dont have an account?</h1>
                <div className='text-white'><Link to='/signup'className='border-b-2 border-solid'>Sign up</Link></div>
                <h3 className='text-white'>Forget Password?</h3>
                <Link to={'/forgetpassword'} className='border-b-2 border-solid text-white'>Reset Password</Link>
                
               
               

            </div>

        </div>
    );
};

export default LogIn;