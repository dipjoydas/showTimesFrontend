import React, { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlay, faClock, faCalendar, faLocationDot, faCircleDown, faDownload } from '@fortawesome/free-solid-svg-icons'
import Header from '../header/Header';
import QRCode from 'react-qr-code';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useLocationContext } from '../../context/Location_context';

const Tickets = () => {
    const {baseUrl} =useLocationContext()
    const [tickets, setTickets] = useState([])
    useEffect(() => {
        (async () => {
            // const res =await 
            const Authentication = JSON.parse(localStorage.getItem("token"))
            try {
                const res = await fetch(`${baseUrl}/api/auth/booking/tickets/get`, {
                    method: "GET",
                    headers: {
                        "content-Type": "application/json",
                        "Authentication": Authentication

                    }


                })
                const result = await res.json()
                setTickets(result)
                console.log('reuslt from tickets.jsx page ', result, result.tickets)

            } catch (e) {
                console.log(e)
            }
        })()
    }, [])

    const generatePDF = (id, imgId) => {
        const content = document.getElementById(id)
        console.log(content, 'content')
        const pageWidth = 612; // 8.5 inches * 72 points per inch
        const pageHeight = 792;


        // Use html2canvas to capture the content as an image
        html2canvas(content).then(canvas => {
 

            const imgData = canvas.toDataURL('image/png');

            // Create a new jsPDF instance
            const pdf = new jsPDF('p', 'pt', [pageWidth, pageHeight]);
            const imgWidth = pageWidth;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            console.log(pdf, 'pdf file content')
  
            pdf.save('ticket.pdf');
        });
    };


    return (
        <div className='bg-black min-h-screen text-white flex flex-col justify-center items-center'>
            <Header></Header>
            <div className='w-full h-5'>

            </div>

            {/* {tickets?.map((tickets, index) => <details key={index} className='w-96  my-2 max-w-[80vw] backdrop-blur-sm p-4 bg-[#262626]'>
                <summary className='text-2xl'>{tickets?.tickets[0]?.movieName}</summary>
                <div className='flex w-full gap-3 justify-evenly'>
                            <h3><FontAwesomeIcon icon={faClock} /> {tickets?.tickets[0]?.showTime}</h3>
                            <h3><FontAwesomeIcon icon={faCalendar} /> {tickets?.tickets[0]?.showDate.split('T')[0]}</h3>
                            <h3 className='capitalize'><FontAwesomeIcon icon={faLocationDot} /> {tickets?.tickets[0]?.location}</h3>

                        </div>
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
                    {tickets?.tickets?.map((ticket, index) => <tr key={index}>
                                    <td>{ticket.row}{ticket.column}</td>
                                    <td>{ticket.row}</td>
                                    <td>{ticket.column}</td>
                                    <td><span className='text-orange-500'>$</span>{ticket.ticketPrice}</td>
                                </tr>)}


                    </tbody>
                </table>
           

            </details>)} */}






            {tickets?.map((tickets, index) => <details key={index} className='w-96  my-2 max-w-[80vw] backdrop-blur-sm p-4 bg-[#262626]'>
                <summary className='text-2xl'>{tickets?.tickets[0]?.movieName}</summary>
                {
                    tickets?.tickets?.map((ticket, index) => <div key={index} id={ticket.id} className='ticketContainer flex bg-cover bg-no-repeat mt-2 ' style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.4)),url(${baseUrl}/api/image/get/${ticket?.movieImgId}) ` }}>


                        <div className=' w-[70%]' >
                            <h1 className='text-2xl'>{ticket.movieName}</h1>
                            <div className='flex w-full gap-2 justify-evenly'>
                                <h3><FontAwesomeIcon icon={faClock} /> {ticket?.showTime}</h3>
                                <h3><FontAwesomeIcon icon={faCalendar} /> {ticket?.showDate.split('T')[0]}</h3>
                                <h3 className='capitalize'><FontAwesomeIcon icon={faLocationDot} /> {ticket?.location}</h3>

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
                                        <tr>
                                            <td>{ticket.row}{ticket.column}</td>
                                            <td>{ticket.row}</td>
                                            <td>{ticket.column}</td>
                                            <td><span className='text-orange-500'>$</span>{ticket.ticketPrice}</td>
                                        </tr>
                                    </tbody>

                                </table>
                            </div>

                        </div>
                        <div className='w-[30%] relative '>
                            {/* <FontAwesomeIcon icon={faCircleDown} /> */}
                            <FontAwesomeIcon icon={faDownload} className='relative  left-4 cursor-pointer' onClick={() => generatePDF(ticket.id, ticket?.movieImgId)} />
                            <QRCode className='bottom-0 relative  right-0'
                                style={{ height: "70%", maxWidth: "100%", width: "100%" }}
                                value={ticket.id}
                            >

                            </QRCode>


                        </div>
                    </div>)
                }




            </details>)}


        </div>
    );
};

export default Tickets;