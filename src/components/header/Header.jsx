import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocationContext } from '../../context/Location_context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faCartShopping, faBars, faCodeCompare } from '@fortawesome/free-solid-svg-icons'
import { useAuthContext } from '../../context/Auth_context';
import gsap from 'gsap';


const Header = () => {
    const { theaterLocation, setTheaterLocation,baseUrl } = useLocationContext()
    const { user, logOut, signUp } = useAuthContext()
    const [searchResult, setSearchResult] = useState()

    const [locations, setLocations] = useState([])
    const [isNavlinksShow, setIsNavlinksShow] = useState(false)
    const loadLocation = async () => {
        const res = await fetch(`${baseUrl}/api/auth/admin/getlocation`)
        const result = await res.json()
        console.log(result)
        setLocations(result)
    }
    const handleNavlinks = () => {

        const navlinksContainer = document.getElementsByClassName('navlinksContainer')[0]
        navlinksContainer.classList.toggle('hidden')
        // navlinksContainer.style.opacity = 1

        const navlink = document.getElementsByClassName('navlink')


        gsap.fromTo(
            navlink,
            {
                opacity: 0,
                y: -50, 
            },
            {
                opacity: 1,
                y: 0, 
                duration: .7,
                stagger: 0.1, 
                ease: 'power2.out', 
                // delay: .5
            }
        );

    }
    const handeSearchField = () => {
        const searchField = document.getElementsByClassName('searchfieldContainer')[0]
        searchField.classList.toggle('hidden')
    }


    const handleSearch = async (e) => {
        const searchValue = e.target.value
        try {
            // const res = await fetch(`https://digi-storebackend.vercel.app/productsearch?search=${searchValue}`)
            const res = await fetch(`${baseUrl}/api/movie/getbyname/${theaterLocation}?search=${searchValue}`)
            const result = await res.json()

            setSearchResult(result)

        } catch (error) {
            console.log(error)

        }


    }
    const clearInput = () => {
        const element = document.getElementById('search')
        element.value = ''
        setSearchResult([])

    }
    useEffect(() => {
        loadLocation()
    }, [])
    useEffect(() => {



    }, [])
    return (
        <div className='flex h-14 w-full justify-between fixed top-0 z-[999] '>
            <div className='flex h-full items-center z-20 '>
                <img className='h-10 md:h-full  ms-1 md:mx-3 ' src="https://i.ibb.co/hW1vLsr/showtime1.png" alt="" />
                <Link to='/' className='ms-1 md:ms-2 px-2 md:px-4 py-0 md:py-1 h-7 md:h-10 rounded-3xl text-white text-sm md:text-base border-solid border-2 border-white'>All Movies</Link>
            </div>


            <div className='flex items-center z-20'>
                <select id="role" onChange={(e) => setTheaterLocation(e.target.value)} className='bg-transparent text-white text-sm  md:text-lg font-medium '>
                    {
                        locations?.map((location, index) => <option key={index} value={location.location} className='bg-transparent text-black '>{location.location}</option>)
                    }

                </select>
                {/* <div className='text-white text-sm  md:text-lg font-medium px-1 md:px-3'>User</div> */}
                <FontAwesomeIcon className='icon text-white text-sm  md:text-lg font-medium px-1 md:px-3 cursor-pointer' icon={faMagnifyingGlass} onClick={handeSearchField} />
                <FontAwesomeIcon className='text-white text-sm  md:text-lg font-medium px-1 md:px-3 ' onClick={handleNavlinks} icon={faBars} />



            </div>




            <div className='w-full absolute searchfieldContainer hidden'>
                <FontAwesomeIcon className='icon text-white text-sm  md:text-lg font-medium px-1 md:px-3 absolute top-16 z-20 ' icon={faMagnifyingGlass} />
                <input type="text" placeholder='movie name' className='searchfield w-full absolute top-12 z-10 bg-transparent ps-9 text-white py-2 border-b-2 border-solid border-white backdrop-blur-3xl'onKeyUp={handleSearch} />

                <div className='searchResultContainer w-full absolute top-[5.6rem] z-10 text-center border-[1px] border-solid border-red-500'>

                    {searchResult?.map((movie, index) => <Link key={index} to={`/movie/${movie._id}`} onClick={clearInput} >
                        <div key={index} className='sRItem border-white border-solid border-b-[1px] backdrop-blur-3xl flex justify-center items-center gap-2'>
                            <div className='imgContainer'>
                          
                                <img src={`${baseUrl}/api/image/get/${movie?.img} `} alt="" className='w-10 h-10'  />

                            </div>
                            <div className='sRTextContainer text-white'>
                                {movie?.movieName}




                            </div>

                        </div>

                    </Link>)}





                </div>
            </div>




            {/* animated contents  */}
            <div className='fixed top-0 left-0  navlinksContainer z-10  w-full min-h-screen  bg-black  justify-center items-center  hidden '>



                {/* content part  */}
                <div className='relative w-full min-h-screen z-10  flex flex-col justify-center items-center text-white '>
                    <Link to='/' className='navlink py-2' onClick={handleNavlinks}>Home page</Link>
                    <Link to='/tickets' className='navlink py-2' onClick={handleNavlinks}>Tickets</Link>
                    {user?.email ? <button onClick={() => { logOut(); handleNavlinks }} className=' navlink text-black bg-white px-4 py-1 rounded-sm my-2' >{user?.name?.split(' ')[0]} LogOut</button> : <Link to='/login' className='navlink' onClick={handleNavlinks}>Sign up</Link>}

                </div>


            </div>

        </div>
    );
};

export default Header;