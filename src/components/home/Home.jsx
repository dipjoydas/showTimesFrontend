import React, { useEffect, useState } from 'react';
import Slider from './HomeSlider/Slider';
import AllMovies from './AllMovies/AllMovies';
import CommingSoon from './CommingSoon/CommingSoon';
import { useLocationContext } from '../../context/Location_context';
import Header from '../header/Header';
import { motion } from "framer-motion"


const Home = () => {
    const {theaterLocation,setTheaterLocation,baseUrl} =useLocationContext()
    const [locations,setLocations] =useState([])
    const loadLocation =async()=>{
        const res =await fetch(`${baseUrl}/api/auth/admin/getlocation`)
        const result =await res.json()
        console.log(result)
        setLocations(result)
    }
    useEffect(()=>{
        loadLocation()
    },[])
  
    return (
        <div 
      
        >
            <div className='sliderContainer'>
                {/* <Header></Header> */}
                <Slider></Slider>
                <AllMovies></AllMovies>
                {/* <CommingSoon></CommingSoon> */}
                {/* <select id="role" onChange={(e)=>setTheaterLocation(e.target.value)} className='block border-2 border-solid border-blue-500'>
                    {
                        locations?.map((location,index)=> <option key={index} value={location.location}>{location.location}</option>)
                    }

                </select> */}
                
            </div>
        </div>
    );
};

export default Home;