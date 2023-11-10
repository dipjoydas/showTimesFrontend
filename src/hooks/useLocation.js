import React, { useReducer, useState } from 'react';
const baseUrl = 'http://localhost:5000'
// const baseUrl = 'https://show-times-server.vercel.app'

const selectedSeatsReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_SEAT':{
        let isFind =state.some((seat)=>{ return seat.index == action.payload.index
         })
         if(isFind==true){
            return state
         }else {
            return [...state, action.payload];
      }
    }
        
      case 'REMOVE_SEAT':
        return state.filter(seat => seat.index !== action.payload.index);
      // Handle other actions if needed
      case 'RESET_SEAT': return [];
      default:
        return state;
    }
  };
const useLocation = () => {
    const [theaterLocation,setTheaterLocation] =useState('bogura')
   
    const [selectedShowIndex,setSelectedShowIndex]=useState()
    const [shows, setShows] = useState([])
    const [selectedseats, dispatch] = useReducer(selectedSeatsReducer, []);
    return {
        theaterLocation,
        setTheaterLocation,
        shows,
        setShows,
        selectedShowIndex,
        setSelectedShowIndex,
        selectedseats,
        dispatch,
        baseUrl

        

    }
};

export default useLocation;