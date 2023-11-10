import React, { useRef, useState } from 'react';
import './signUp.css'
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useLocationContext } from '../../context/Location_context';



const SIgnUp = () => {
    const {baseUrl} =useLocationContext()
    const navigate = useNavigate()
    const {signUp} =useAuth()
    const nameValue = useRef()
    const emailValue = useRef()
    const passValue = useRef()
    const [emailINfo ,setEmailInfo] =useState()
    const [verifyPageLink,setVerifyPageLink] =useState()
    const [passInfo,setPassInfo]=useState()
   
    const phoneValue = useRef()
    const handleEmail =async()=>{
        const email = emailValue.current.value
        // console.log("hanlde email works")
        setEmailInfo('')
        setVerifyPageLink('')
        try{
            const res =await fetch(`${baseUrl}/api/auth/user/emailcheck/${email}`)
            // const res =await fetch(`http://localhost:5000/emailcheck/${email}`)
            const result =await res.json()
            // console.log(result,"email infe")
            if((result.email?.length>0) && (result.email[0]?.status =="active")){
                setEmailInfo("This email is already registered .Please try another one ")

            }
            if((result.email?.length>0) && !(result.email[0]?.status =="active")){
                setEmailInfo("This email is already registered .Please verify your account ")
                setVerifyPageLink('/verifyemail')

            }

        }catch(error){

        }
      
        

    }
    const handlepass = ()=>{
        setPassInfo('')
        const password = passValue.current.value
        if(password.length<6){
            setPassInfo("password length must be atleast 6 ")
        }
        if(password.toLowerCase().includes('password')){
            setPassInfo("Password must not be contained password ")
        }


    }




    const handleSingUp =async(e)=>{
        e.preventDefault()
        const name = nameValue.current.value.trim()
        const email = emailValue.current.value.trim()
        const password = passValue.current.value.trim()
        // console.log(name,password,email,"name email, passwrod")
  
        const phone = phoneValue.current.value
        const user = {
            name,
            email,
            password,
            phone,
        }
      const result = await signUp(user)
    //   console.log(result,"signup resutl")
      if(result){
        navigate('/verifyemail')

      }
      
    }
    return (
        <div className='signUpContainer '>
            <div className='signUp'>
            <h1>Please Sign Up</h1>
                <form action=""onSubmit={handleSingUp}>
                    <label className='text-white' htmlFor="name">Name</label>
                    <input ref={nameValue} type="text" name="" id="name" placeholder='name' required />
                    <label className='text-white' htmlFor="email">Email</label>
                    <input ref={emailValue} type="text" name="" id="email" placeholder='email'onChange={handleEmail} required />
                    <span style={{color:"red"}}>{emailINfo}</span>
                    {verifyPageLink?<Link to={verifyPageLink} style={{border:"solid black 1px ", padding:"3px 5px"}}>Verfiy Email</Link>:''}
                    <br />
                    <label className='text-white' htmlFor="phone">Phone Number</label>
                    <input ref={phoneValue} type="text" id='phone' placeholder='phone number' required/>
                    <label className='text-white' htmlFor="password">Password</label>
                    <input ref={passValue} type="password" name=""  placeholder='password' onChange={handlepass} required />
                    <span style={{color:"red"}}>{passInfo}</span>
                    {/* <label htmlFor="reTypePss">Retype Password</label>
                    <input ref={reTypePassValue} type="password" name="" id="" placeholder='Retype password' /> */}
                    <input type="submit" value="signUp" className='bg-orange-500' />
                    

                </form>
                <h1 className='text-white'>Already have an account?</h1>
                <div><Link to='/login' className='border-b-2 border-solid text-white' >Log in</Link></div>  
                

            </div>

        </div>
    );
};

export default SIgnUp;