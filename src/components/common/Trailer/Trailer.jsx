import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons'


const Trailer = ({ url,text }) => {
    const [isTrailerAvailabe, setIsTrailerAvailbe] = useState(true)
    useEffect(() => {
        const modal = document.getElementsByClassName('trailerContainerModal')[0]

        const span = document.getElementsByClassName("close")[0];
        span.onclick = function () {

            setIsTrailerAvailbe(false)
            modal.style.display = "none";
        }
        window.onclick = function (event) {
            if (event.target == modal) {
                setIsTrailerAvailbe(false)

                modal.style.display = "none";


            }
        }
        const trigger = document.getElementsByClassName('triggerModal')[0]
        trigger.onclick = () => {
            setIsTrailerAvailbe(true)
            modal.style.display = 'flex'
        }
    }, [])
    console.log(url)
    return (<div className='relative'>
        {/* <div className='absolute z-50 left-3 bottom-3 text-white flex justify-center items-center'> */}
        <FontAwesomeIcon className='triggerModal text-white  text-2xl cursor-pointer' icon={faCirclePlay} />
        <span className='uppercase ms-1'>{text}</span>
        {/* </div> */}
        <div className='trailerContainerModal w-full min-h-screen fixed top-0 left-0 backdrop-blur-lg hidden justify-center items-center z-50'>
           
            <div className='modalContent relative '>
                 <span className="close text-3xl  inline-block absolute -top-8 right-0 cursor-pointer">&times;</span>
                {isTrailerAvailabe ? <iframe id='trailer' width="560" height="315" src={url} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe> : ''}

            </div>


        </div>
    </div>

    );
};

export default Trailer;



