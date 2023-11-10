import React, { useEffect, useRef, useState } from 'react';
import { useAuthContext } from '../../context/Auth_context';
import { useNavigate } from 'react-router-dom';
import './verifyEmail.css'
import { useLocationContext } from '../../context/Location_context';


const VerifyEmail = () => {
    const {baseUrl} =useLocationContext()
    const { verifyEmail } = useAuthContext()
    const navigate = useNavigate()
    const otp = useRef()
    const [timer ,settimer]=useState(120)
    useEffect(()=>{
        document.getElementById('resendOptBtn').style.background = 'gray'
        document.getElementById('resendOptBtn').disabled =true

    },[])

    useEffect(()=>{
      
        const interval = setInterval(()=>{
            if(timer){
                settimer(timer-1)
            }else {
                clearInterval(interval)
            }
        },1000) 
        return ()=>clearInterval(interval)
        

    },[timer])
   const handleResendOptButton =()=>{
    setTimeout(()=>{
       
        document.getElementById('resendOptBtn').style.background = 'orange'
        document.getElementById('resendOptBtn').disabled =false
        

    },2000*120)
   }
   handleResendOptButton()
    const handleResendOtp =async()=>{
        document.getElementById('resendOptBtn').disabled =true 
        document.getElementById('resendOptBtn').style.background = 'gray'
        settimer(120)
        handleResendOptButton()
        window.alert("works")
        handleResendOptButton()
        try{
            const email = JSON.parse(localStorage.getItem("email"))
         
            
            const res = await fetch(`${baseUrl}/api/auth/user/resendotp`,{
                method:"POST",
                headers:{
                    "content-Type": "application/json",
                    mode: 'no-cors'
                },
                body:JSON.stringify({email})
            })
            const result =await res.json()
            // console.log(result)

        }catch(error){
            // console.log(error)

        }

    }
    const handleVerify = async (e) => {
        e.preventDefault()
        const otpValue = otp.current.value
        verifyEmail(otpValue)
        if (Boolean(localStorage.getItem("token"))) {
            navigate('/', { replace: true });
        }



    }
    return (
        <div className='verifyEmailContainer'>
            <div className='verifyEmail'>
                <h1>Please verify your email </h1>
                <form action="" onSubmit={handleVerify}>
                    <input ref={otp} type="text" name="" id="" placeholder='opt' />
                    <input type="submit" value="submit" />
                </form>
                <h3>Do not get? resend after {timer} seconds</h3>
                <input onClick={handleResendOtp} type="submit" value="Resend Opt" id='resendOptBtn'  />
                {/* <button onClick={handleResendOtp} id='resendOptBtn'>Resend Otp</button> */}
            </div>

        </div>
    );
};

export default VerifyEmail;