import React, { useEffect, useState } from 'react';
import { useLocationContext } from '../../context/Location_context';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlay, faClock, faCalendar, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { AnimatePresence, motion } from "framer-motion"
import './payment.css'
import { useLocation, useParams } from 'react-router-dom';
import Header from '../header/Header';

const Authentication = JSON.parse(localStorage.getItem("token"))
const stripePromise = loadStripe('pk_test_51NTI9OA1Y0nx3FySg7QsDmBQ6sK2Njdn84NR2QdAeynZoB2E1EafPZzUhjKAdUIFdy95vFzLyktQXHWxAEjsudCn007ck0LSTq')

const Payment = ({ movieImg }) => {

    const { id } = useParams()

    console.log(id, 'movie image id')

    const { selectedseats, shows, selectedShowIndex, theaterLocation,baseUrl } = useLocationContext()
    // const [storedTicketsId,setStoredTicketsId] =useState()
    const [storedTempoTickets, setStoredTempoTickets] = useState()
    useEffect(()=>{
        setTimeout(()=>{
            window.location.reload()
            
        },1000*100)
    },[])
    useEffect(() => {
        console.log(selectedseats, shows, 'selected seats')
        if (selectedseats.length) {


            (async () => {
                try {
                    const res = await fetch(`${baseUrl}/api/auth/booking/tempoticket/${selectedseats[0].id}`, {
                        method: "POST",
                        headers: {
                            "content-Type": "application/json",
                            "Authentication": Authentication

                        },
                        body: JSON.stringify(selectedseats)

                    })

                    const result = await res.json()
                    console.log(result.result, 'result from payment page')
                    setStoredTempoTickets(result.result)

                } catch (e) {

                }
            })()

        }
    }, [])

    let totalTicketPrice = 0
    selectedseats.map((seat) => {
        totalTicketPrice += Number(seat.ticketPrice)
    })
    
    return (
        <div className='flex items-center justify-center min-h-screen gap-3  flex-wrap md:flex-nowrap'>
            <Header></Header>
            {/* page transition part start  */}
            
            <motion.div
             initial={{ x: '0'}}
        animate={{ x: '100vw'}}
        // exit={{ y: '0'}}
        transition={{ duration: .6,  ease: "easeInOut",   delay: 0 }} 
             className='w-full min-h-screen bg-black fixed top-0 left-0  z-[999]  '></motion.div>
            {
                selectedseats.length ? <div className='min-h-[50vh]  relative w-full md:w-1/2   bg-cover bg-no-repeat  text-white' style={{ backgroundImage: `url(${baseUrl}/api/image/get/${id})` }}>
                    <div className='w-full h-[100%] absolute   top-0' style={{ background: `radial-gradient(50% 80%,transparent 40%,rgba(0, 0, 0, 0.801))  ` }}>

                    </div>

                    <div className='w-full relative py-3 px-2'>
                        <h1 className='text-2xl font-semibold'>{selectedseats[0]?.movieName}</h1>
                    </div>
                    <div className='flex gap-3 relative px-2 w-full justify-evenly'>

                        <h3><FontAwesomeIcon icon={faClock} /> {shows[selectedShowIndex].showTime}</h3>
                        <h3><FontAwesomeIcon icon={faCalendar} /> {shows[selectedShowIndex].date.split('T')[0]}</h3>
                        <h3 className='capitalize'><FontAwesomeIcon icon={faLocationDot} /> {theaterLocation}</h3>

                    </div>
                    <div>
                        <table className='w-full text-center table my-2 relative'>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Row</th>
                                    <th>Seat</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedseats?.map((seat, index) => <tr key={index}>
                                    <td>{seat.row}{seat.column}</td>
                                    <td>{seat.row}</td>
                                    <td>{seat.column}</td>
                                    <td>{seat.ticketPrice}</td>
                                </tr>)}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan={2}>Total</td>
                                    <td colSpan={2}><span className='text-orange-500'> $</span>{totalTicketPrice}</td>
                                </tr>
                            </tfoot>

                        </table>
                    </div>

                </div> : ''
            }



            <div className='paymentContainer text-white w-full md:w-1/2'>
                <div className='payment  '>
                    {/* <h1>Please pay for {id}</h1> */}
                    <p className='capitalize'>pay within 2 minutes otherwise order will be deleted</p>
                    {
                        selectedseats.length && <Elements stripe={stripePromise} >
                            <CheckoutForm selectedseats={selectedseats} totalTicketPrice={totalTicketPrice} storedTempoTickets={storedTempoTickets}></CheckoutForm>
                        </Elements>
                    }
                </div>


            </div>

        </div>
    );
};

export default Payment;