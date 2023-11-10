
import React, { useEffect, useState } from 'react';
import { useLocationContext } from '../../../context/Location_context';
import Trailer from '../../common/Trailer/Trailer';
import { Link } from 'react-router-dom';

const AllMovies = () => {
    const { theaterLocation,baseUrl } = useLocationContext()
    const [allMovies, setAllmovies] = useState([])
    useEffect(() => {
        (async () => {
            const res = await fetch(`${baseUrl}/api/movie/getall/${theaterLocation}`)
            const result = await res.json()
            console.log(result, 'from all movies page ')
            setAllmovies(result)


        })()
    }, [])
    return (
        <div className='allmoviesContainer'>
            <h1 className='text-2xl font-semibold text-white'>All Movies</h1>
            <div className='flex justify-center items-center'>

                {

                    allMovies.map((item, index) => <div key={index} className='group gap-2 flex justify-center items-center flex-grow-0 flex-shrink-0 relative w-[170px] h-[193px] md:w-[190px] md:h-[230px] m-2 overflow-hidden'  >
                        <img src={`${baseUrl}/api/image/get/${item.img}`} className='absolute w-full h-full object-cover transition ease-in-out cursor-pointer group-hover:scale-125' />

                        <div className='w-full h-full bg-black absolute top-0 left-0 opacity-0 group-hover:opacity-50'>


                        </div>


                        <div className='opacity-0 group-hover:opacity-100'>
                            <Trailer url={item?.videoLink} text=''></Trailer>
                        </div>



                        <h1 className='absolute left-[50%] text-lg uppercase translate-x-[-50%] bottom-11 text-white z-20 opacity-0 group-hover:opacity-100 '>{item.movieName}</h1>
                        <Link to={`/movie/${item._id}`}>
                            <h1 className='absolute left-0 bottom-3 rounded-sm text-white bg-black py-1 px-2'>Get Tickets</h1>
                        </Link>
                    </div>)
                }

            </div>

        </div>
    );
};

export default AllMovies;