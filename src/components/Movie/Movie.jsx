import React, { useEffect, useReducer, useRef, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useLocationContext } from '../../context/Location_context';
import { AnimatePresence, motion } from "framer-motion"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlay ,faClock,faCalendar,faLocationDot} from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../header/Header';
import Trailer from '../common/Trailer/Trailer';
import './movie.css'


// let demo =[1,1,1]
// new code 

const isFoundUnlocked = []
const Movie = () => {
    const { id } = useParams()
    const [movie, setMovie] = useState()
    const navigate = useNavigate()
    const [selectedTime, setSelectedTime] = useState()







    const [selectedDate, setSelectedDate] = useState(0)
    // const [selectedseats,setSelectedSeats] =useState([])
    const [ticketPrice, setTicketPrice] = useState()
    const { theaterLocation, setTheaterLocation, shows, setShows, selectedShowIndex, setSelectedShowIndex, selectedseats, dispatch,baseUrl } = useLocationContext()
    console.log(shows,'shows data')
    useEffect(() => {
        const loadData = async () => {
            const res = await fetch(`${baseUrl}/api/movie/get/${id}`)
            const result = await res.json()
           
            setMovie({ ...result.movie })
            // setShows(result.shows)
            const showsContainer = result.shows
            const categorizedShowsByDate = []
            // shows.map((show,index)=>{

            // })


        }
        loadData()
    }, [])
    useEffect(() => {
        console.log(movie, 'movie data')
    }, [movie])
    useEffect(() => {
        const loadData = async () => {
            const res = await fetch(`${baseUrl}/api/shows/get/${id}/${selectedDate}`)
            const result = await res.json()
            console.log(result,'shows')
            
            setShows(result)

        }
        loadData()
    }, [selectedDate])
    const handleDate =()=>{
        const seatsContainer =document.getElementsByClassName('seatsContainer')[0]
        seatsContainer.style.display ='none'
       
       

    }
    const handleSeatMap = (index) => {
        // window.alert(index,'handle seat map hit')
        const seatsContainer =document.getElementsByClassName('seatsContainer')[0]
        seatsContainer.style.display ='block'
        console.log(seatsContainer,'seatcontainer')
        dispatch({
            type: 'RESET_SEAT',
            
        });
        setSelectedShowIndex(index)
        
        const seats = document.getElementsByClassName('seats')
        const seatTypes = document.getElementsByClassName('seatTypes')
        const screen =document.getElementsByClassName('screen')
        for(let i of screen){
            i.style.display ='none'
        }
        for (let i of seats) {
            i.style.display = 'none'
        }
        for (let i of seatTypes) {
            i.style.display = 'none'
        }
       

        seats[index].style.display = 'grid'
        seatTypes[index].style.display = 'flex'
        screen[index].style.display = 'block'
        seats[index].style.gridTemplateColumns = ` repeat(${shows[index].screen.maxColumn},29px)`
        seats[index].style.gridTemplateRows = ` repeat(${shows[index].screen.maxRow},29px)`
        // shows[index]

    }



    const bookSeat = async (e) => {

        const element = e.target
        const ticketPrice = document.querySelector('input[name="seatTypes"]:checked').dataset.price;
        if (element.textContent.trim() === "") {

        } else {
            const locked = element.dataset.locked
            const booked = element.dataset.booked
            const id = element.dataset._id
            const row = element.dataset.row
            const column = element.dataset.column
            const index = element.dataset.index
            const seatsType = element.dataset.seatstype
            if (locked == 'true') {
                toast("This seat is processed by others");
                // window.alert('this seat is processed by others')
                return
            }
            if (booked == 'true') {
                toast("This is seat is booked")
                // window.alert('this seat is booked')
                return
            }
            if (locked != 'true' && booked != 'true') {
                const Authentication = JSON.parse(localStorage.getItem("token"))
                try {
                    const res = await fetch(`${baseUrl}/api/auth/booking/lockseat`, {
                        method: "POST",
                        headers: {
                            "content-Type": "application/json",
                            "Authentication": Authentication

                        },
                        body: JSON.stringify({ id, row, column, index })

                    })
                    // console.log('fetch')

                    const result = await res.json()

                    //    add to selected seats
                    if (result.result == 'seat selected') {
                        toast("Seat selected")
                        // window.alert('seat selected')
                        element.style.background ='orange'
                        const selectedSeatContainer = { id, row, column, index, ticketPrice, location: theaterLocation, showTime: shows[selectedShowIndex].showTime,showDate: shows[selectedShowIndex].date, movieName: movie.movieName,movieImgId:movie.img }
                        // console.log(selectedseats, 'selected seats')
                        dispatch({
                            type: 'ADD_SEAT',
                            payload: selectedSeatContainer
                        });


                    } else if (result.result == 'seat selection cancel') {
                        // window.alert(result.result)
                        toast('Seat selection cancel')
                        // let selectedSeatsContainer =selectedseats
                        element.style.background ='white'

                        const selectedSeatContainer = { id, row, column, index, ticketPrice, location: theaterLocation, showTime: shows[selectedShowIndex].showTime,showDate: shows[selectedShowIndex].date, movieName: movie.movieName, movieImgId:movie.img }
                        dispatch({
                            type: 'REMOVE_SEAT',
                            payload: selectedSeatContainer
                        });


                    } else if (result.result == 'processed by other user') {
                        // window.alert(result.result)
                        toast('Processed by other user')

                    }


                } catch (e) {
                    console.log(e, 'error')

                }

            }
        }


    }








   


    const handleSeatTypes = (e) => {
        const element = e.target

        const seat = document.getElementsByClassName('seat')
   
        for (let i of seat) {
            if (i.textContent.trim() != "") {
                console.log(i.style.background,'seat background color')
                // i.style.background = 'gray'
                if(i.style.background !='orange'){
                    i.style.background = 'gray'

                }
            
                i.removeEventListener('click', bookSeat)

            }
        }
        const seats = document.querySelectorAll(`.seat.${element.value}`)
        // console.log(element.value)
        // console.log(seats,'seats')
        for (let i of seats) {
            const locked = i.dataset.locked
            const booked =i.dataset.booked 
          
            if (locked == 'true'|| booked =='true') {
             
                // i.style.background = 'gray '
                if(i.style.background !='orange'){
                    i.style.background = 'gray'

                }
               
             
            }else{
                // console.log(locked,'locked from false')
                // i.style.background = 'white'
                if(i.style.background !='orange'){
                    i.style.background = 'white'

                }

            }
            for(let i of selectedseats){
                // seat[i.index].style.background = 'orange'
            }
           
            // i.style.border = '3px solid green '


            i.addEventListener('click', bookSeat)
        }
        // return ()=>{
        //     for (let i of seat) {

        //             i.removeEventListener('click',bookSeat)


        //     }

        // }


    }


    let totalTicketPrice = 0
    selectedseats?.map((seat) => {
        totalTicketPrice += Number(seat.ticketPrice)
    })

    const handlePaymentNavigate = async () => {




        const Authentication = JSON.parse(localStorage.getItem("token"))
        for (let seat of selectedseats) {

            // selectedseats.map(async(seat,index)=>{
            const res = await fetch(`${baseUrl}/api/auth/booking/checkislocked/${seat.id}/${seat.index}`, {
                method: "GET",
                headers: {
                    "content-Type": "application/json",
                    "Authentication": Authentication

                }
            })
            const result = await res.json()
            if (result.result == 'locked') {

            } else if (result.result == 'unlocked') {
                const selectedSeatContainer = seat
                // setIsFoundUnlocked(true)
                isFoundUnlocked.push('true')
                dispatch({
                    type: 'REMOVE_SEAT',
                    payload: selectedSeatContainer
                });



            }

            // })






        }


        if (isFoundUnlocked.length) {
            // window.alert('please try again ')
            toast('Please try again')
            //     // now reset selected seats 

            //     // now set selected seats locked key value to  false 
            // //    ------------------------------------------------------------------------------------------------------------------------------------
            //                               // no need to use this router  at any more so delete from backed 
            // //    ------------------------------------------------------------------------------------------------------------------------------------

            //         // const res =await fetch(`${baseUrl}/api/auth/booking/unlock/${selectedseats[0].id}`,{
            //         //     method: "POST",
            //         //     headers: {
            //         //         "content-Type": "application/json",
            //         //         "Authentication": Authentication

            //         //     },
            //         //     body: JSON.stringify(selectedseats)

            //         // })
            //         // const result =await res.json()
            //         // setSelectedSeats([])



        } else {

            // now lock every seats for  2 minutes lockforpayment
            const res = await fetch(`${baseUrl}/api/auth/booking/lockforpayment/${selectedseats[0].id}`, {
                method: "POST",
                headers: {
                    "content-Type": "application/json",
                    "Authentication": Authentication

                },
                body: JSON.stringify(selectedseats)

            })

            const from = `/payment/${movie?.img}`
            // movie?.img
            // return <Navigate to='/payment' state={{from:location}} replace></Navigate>
            navigate(from, { replace: true })
        }
    }
    // const dateArray =[]
    const [dateArray, setDateArry] = useState([])
    useEffect(() => {
        const dateArrayContainer = []
        for (let i = 0; i <= 6; i++) {
            const today = new Date()
            var nextDay = new Date();
            nextDay.setDate(today.getDate() + i);
            dateArrayContainer.push(nextDay)


        }
        setDateArry([...dateArrayContainer])

    }, [])


    useEffect(() => {
        console.log(dateArray, 'date array')
    }, [dateArray])


    return (

        <motion.div

        >
            <ToastContainer />
            {/* page transition part start  */}
            <motion.div
             initial={{ y: '-100vh'}}
        animate={{ y: '-100vh'}}
        exit={{ y: '0'}}
        transition={{ duration: .6,  ease: "easeInOut",   delay: 0 }} 
             className='w-full min-h-screen bg-black fixed top-0 left-0  z-[999]  '></motion.div>




            <div className={`movieInfoContainer min-h-screen w-full bg-no-repeat bg-cover flex flex-col items-center  flex-wrap `} >
                <div className='min-h-[50px]'>

                </div>
                <img className='w-full h-full absolute top-0 z-0' src={`${baseUrl}/api/image/get/${movie?.img} `} alt="" />
                <div className='w-full h-[100%] absolute  top-0' style={{ background: `radial-gradient(50% 80%,transparent 40%,rgba(0, 0, 0, 0.801))  ` }}>

                </div>

                <Header></Header>


                <div className='flex  px-2 justify-between items-center flex-wrap flex-grow'>
                    <div className='relative z-10 w-full md:w-1/2'>
                        <motion.h1
                            initial={{ y: 100 }}
                            animate={{ y: 0 }}
                            transition={{ duration: 1, ease: "easeInOut" }}
                            className='text-white text-xl md:text-3xl overflow-hidden uppercase  '>{movie?.movieName}</motion.h1>
                        {/* <AnimatePresence initial={false} mode='wait'> */}
                        <motion.table
                            //  key='movieTable'
                            className='px-2'
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            //   exit={{ opacity: 0, x: -100, transition: { duration: 0.5 } }}
                            transition={{ duration: 1, ease: "easeInOut", delay: 1 }}
                        >
                            <tbody>
                                <tr>
                                    <td className='text-white px-2 font-medium text-base '>Genre</td>
                                    <td className='text-white px-2 text-base'>{movie?.categories}</td>

                                </tr>
                                <tr>
                                    <td className='text-white px-2 font-medium text-base'>Cast</td>
                                    <td className='text-white px-2 text-base'>{movie?.cast}</td>

                                </tr>
                                <tr>
                                    <td className='text-white px-2 font-medium text-base'>Duration</td>
                                    <td className='text-white px-2 text-base'>{movie?.hour}:{movie?.minutes}</td>

                                </tr>
                                <tr>
                                    <td className='text-white px-2 font-medium text-base'>Director</td>
                                    <td className='text-white px-2 text-base'>{movie?.directorName}</td>

                                </tr>
                                <tr>
                                    <td className='text-white px-2 font-medium text-base'>Music Director</td>
                                    <td className='text-white px-2 text-base'>{movie?.musicDirectorName}</td>

                                </tr>
                                <tr>
                                    <td className='text-white px-2 font-medium text-base'>Producer</td>
                                    <td className='text-white px-2 text-base'>{movie?.producerName}</td>

                                </tr>
                            </tbody>
                        </motion.table>



                    </div>
                    <motion.div
                        initial={{ x: 100,opacity:0 }}
                        animate={{ x: 0,opacity:1 }}
                        transition={{ duration: 1, ease: "easeInOut", delay: .7 }}
                        className='relative z-10 w-full md:w-1/2 '

                    >
                        <h3 className='text-white text-xl md:text-3xl font-medium'>Story Lines</h3>
                        <p className='text-white'>{movie?.description}</p>
                    </motion.div>
                </div>

                <div className='z-50 px-2 py-1 text-white w-full '>
                    <Trailer url={movie?.videoLink} text='Watch Trailer'></Trailer>
                </div>


            </div>







            {/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
            <div className='dateContainer '>
                {
                    // [...Array(7).keys()].map((number, index) => <div key={index} className={`p-3 text-xl m-1 rounded-lg cursor-pointer ${number == selectedDate ? 'bg-orange-600 text-black' : 'bg-white text-black'}`} onClick={() => setSelectedDate(number)}>{new Date().setDate((new Date().getDate() + index)).getDate()}</div>)
                }
                <h1 className='text-2xl font-semibold text-white my-2 px-2'>Choose Date</h1>


                <div className='flex flex-wrap'>
                    {
                        dateArray?.map((date, index) => <div key={index} className={`p-3 text-xl m-1 rounded-lg cursor-pointer ${index == selectedDate ? 'bg-orange-600 text-black' : 'bg-white text-black'}`} onClick={() =>{handleDate(); setSelectedDate(index)}}>{date.getDate()}</div>)
                    }
                </div>

            </div>
            <div className='flex  gap-1 my-1 timeContainer'>
                {

                    shows?.map((show, index) => <div key={index} className={`time border-white border-2 border-solid  rounded-xl px-2 cursor-pointer ${index == selectedTime ? 'bg-orange-600 text-black border-transparent' : 'bg-transparent text-white'} `} onClick={() => { handleSeatMap(index); setSelectedTime(index) }}>{show.showTime}</div>)


                }

            </div>




            <div className='flex gap-3 md:gap-5 items-center justify-center  flex-wrap '>


                <div className='seatsContainer max-w-full hidden'>
                    <h3 className='text-white capitalize text-lg'>Seats type</h3>
                    {
                        shows.map((show, index) => <div key={index} className=''>

                            <div className='seatTypes flex-wrap gap-2 md:gap-3 hidden py-3'>
                            
                                {show.screen.seatTypes.map((types, index) => <div key={index} className='flex'>
                                    <input type="radio" className='seatTpesInputField' name="seatTypes" id="" data-price={types?.price} value={types.type} onClick={(e) => { handleSeatTypes(e) }} /> <span className='text-white capitalize'>{types?.type}<span className='text-orange-500'>${types?.price}</span> </span>
                                </div>)}


                            </div>
                            {show.screen.seats ? <div className='screen relative text-white  w-full   mt-5 text-center hidden'style={{borderRadius:'20%',borderTop:'3px solid white'}}>
                                screen

                                
                            </div> : ''}

                            <div className='seats w-full overflow-x-auto  gap-3 hidden'>
                                {show.screen.seats?.map((seat, index) => <div key={index} className={`w-5 h-5 text-center text-sm rounded-sm  ${seat.selected ? `${seat.locked ||seat.booked? 'bg-gray-400' : 'bg-white'} cursor-pointer seat` : 'seat'}  ${seat.seatsType}`}
                                    data-locked={seat.locked}
                                    data-index={index}
                                    data-booked={seat.booked}
                                    data-row={seat.row}
                                    data-column={seat.column}
                                    data-seatstype={seat.seatsType}
                                    data-_id={show._id}
                                    
                                > {seat.selected ? `${seat.row}${seat.column} ` : ''} </div>)}
                            </div>


                        </div>)
                    }
                    {
                        shows.map((show, index) => <div key={index} className=''>

                            <div className='seatTypes gap-3 hidden py-3'>
                                {/* {show.screen.seatTypes.map((types, index) => <div className='text-white' key={index} data-seatTypes={types?.type} onClick={(e) => handleSeatTypes(e)}>{types?.type}{types?.price}</div>)} */}
                                {show.screen.seatTypes.map((types, index) => <div key={index} className='flex'>
                                    <input type="radio" className='seatTpesInputField' name="seatTypes" id="" data-price={types?.price} value={types.type} onClick={(e) => { handleSeatTypes(e) }} /> <span className='text-white capitalize'>{types?.type}<span className='text-orange-500'>${types?.price}</span> </span>
                                </div>)}


                            </div>
                            {show.screen.seats ? <div className='screen relative text-white  w-full  mt-5 text-center hidden'style={{borderRadius:'20%',borderTop:'3px solid white'}}>
                                screen

                                
                            </div> : ''}

                            <div className='seats gap-2  hidden'>
                                {show.screen.seats?.map((seat, index) => <div key={index} className={`w-5 h-5 text-center text-sm rounded-sm ${seat.selected ? `${seat.locked ? 'bg-gray-400' : 'bg-white'}  seat` : 'seat'}  ${seat.seatsType}`}
                                    data-locked={seat.locked}
                                    data-index={index}
                                    data-booked={seat.booked}
                                    data-row={seat.row}
                                    data-column={seat.column}
                                    data-seatstype={seat.seatsType}
                                    data-_id={show._id}
                                > {seat.selected ? `${seat.row}${seat.column} ` : ''} </div>)}
                            </div>


                        </div>)
                    }

                </div>



                {
                    selectedseats?.length ? <div className='backdrop-blur-sm p-4 bg-[#262626] text-white'>
                        <div className='flex gap-3'>
                            <h3><FontAwesomeIcon icon={faClock} /> {shows[selectedShowIndex].showTime}</h3>
                            <h3><FontAwesomeIcon icon={faCalendar} /> {shows[selectedShowIndex].date.split('T')[0]}</h3>
                            <h3 className='capitalize'><FontAwesomeIcon icon={faLocationDot} /> {theaterLocation}</h3>

                        </div>
                        <div>
                            <table className=' w-full text-center table my-2 '>
                                <thead>
                                    <tr className=''>
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

                            <button className='btn px-4 py-1 bg-orange-500 text-white rounded-xl' onClick={handlePaymentNavigate}>Pay</button>
                        </div>

                    </div> : ''
                }

            </div>


        </motion.div>
     
    );
};

export default Movie;