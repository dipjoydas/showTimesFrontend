import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap, { Power3 } from "gsap";
import { AnimatePresence, motion } from "framer-motion"
import { Link } from 'react-router-dom';
import { useLocationContext } from '../../../context/Location_context';
import Header from '../../header/Header';
import './slider.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faCartShopping, faBars, faCodeCompare,faLessThan,faGreaterThan } from '@fortawesome/free-solid-svg-icons'
// const baseUrl = 'http://localhost:5000/'
// const baseUrl = 'https://show-times-server.vercel.app/'


const Slider = () => {
    const {theaterLocation,setTheaterLocation,baseUrl} =useLocationContext()
    const [todaysData, setTodaysData] = useState([])
    const [tomorrowsData, setTomorrowsData] = useState([])
    const [currentSliderIndex, setCurrentSliderIndex] = useState(0)
    const app = useRef();
    // ---------------------------------------load data-------------------------------------------------------------------------------- 

    useEffect(() => {
        const loadData = async () => {
            const res = await fetch(baseUrl+'/api/slider/get/'+theaterLocation)
            const result = await res.json()
            // console.log(result,'result')
            setTodaysData(result.todayMovies)
            setTomorrowsData(result.tomorrowMovies)


        }
        loadData()


    }, [theaterLocation])


    let intervalId
    const handleImgIndicatorRef = useRef()
    const handleIndicatorRef = useRef()
    let startCarousel
    let stopCarousel

    useEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline()
        const element = document.getElementsByClassName('SliderbgImg')
        let imgIndicator = document.getElementById("imgIndicator")
        const serialNumber = document.getElementsByClassName('serialNumber')
        const todayContainer = document.getElementsByClassName('todayContainer')
        const tomorrowContainer = document.getElementsByClassName('tomorrowContainer')
        const nameContainer = document.getElementsByClassName('nameContainer')
        const sessions = document.getElementsByClassName('sessions')
        const actionBtn1 = document.getElementsByClassName('actionBtn1')
        const actionBtn2 = document.getElementsByClassName('actionBtn2')
        const computedwidthimgIndicator = imgIndicator.getBoundingClientRect().width
        const requiredTranslate = (computedwidthimgIndicator / (todaysData.length + tomorrowsData.length))

        let sliderIndex = 0
        let activeImgIndicatorIndex = 0

        if (element.length) {
            element[0].style.transform = 'translateZ(0px) rotate(0deg)'
            serialNumber[0].style.top = '0'
            nameContainer[0].style.left = '0'
            sessions[0].style.opacity = '1'
            actionBtn1[0].style.left = '0'
            actionBtn1[0].style.display = 'block'
            actionBtn2[0].style.left = '0'
            actionBtn2[0].style.display = 'block'
           


            // to avail   text container when user clicked on img navigator as one text contianer is block at a time and other one none 
            console.log(document.getElementsByClassName('todayIndicator')[0], "element")
            document.getElementsByClassName('todayIndicator')[0].addEventListener('click', () => {

                todayContainer[0].style.display = 'block'
                tomorrowContainer[0].style.display = 'none'

            })
            document.getElementsByClassName('tomorrowIndicator')[0].addEventListener('click', () => {
                todayContainer[0].style.display = 'none'
                tomorrowContainer[0].style.display = 'block'

            })

            function carousel() {
                

                // ---------------------------------------------------------------------------
                tl.fromTo(element[sliderIndex], {
                    z: 0,
                    rotation: 0,
                    scaleY: 1

                }, {

                    z: 500,
                    rotation: 20,
                    scaleY: 1,
                    scaleX: 1.4,
                    duration: 1,
                    ease: Power3.easeOut

                })
                // serialNumber animation  

                gsap.to(serialNumber[sliderIndex], {
                    top: '50px',
                    opacity: 0,
                    duration: 1,
                    ease: Power3.easeOut
                })
                // movie name animation 
                gsap.to(nameContainer[sliderIndex], {
                    left: "-100%",
                    opacity: 0,
                    duration: 2,
                    ease: Power3.easeInOut
                })
                // sessions animation 
                gsap.to(sessions[sliderIndex], {
                    opacity: 0,
                    left: "-10%",
                    duration: 1.5,
                    ease: Power3.easeInOut
                })
                // actionBtn animation 
                gsap.to(actionBtn1[sliderIndex], {
                    left: '-100%',
                    duration: 1.5,
                    display:'none',
                    ease: Power3.easeInOut
                })
                gsap.to(actionBtn2[sliderIndex], {
                    left: '100%',
                    duration: 1.5,
                    display:'none',
                    ease: Power3.easeInOut
                })
                // hide 1st text container and display block 2nd continer 
                if ((sliderIndex + 1) == todaysData.length) {
                   todayContainer[0]? todayContainer[0].style.display = 'none':''
                   tomorrowContainer[0]?  tomorrowContainer[0].style.display = 'block':''

                }
                if ((sliderIndex + 1) == (todaysData.length + tomorrowsData.length)) {
                    todayContainer[0]?  todayContainer[0].style.display = 'block':''
                    tomorrowContainer[0]? tomorrowContainer[0].style.display = 'none':''

                }

                // -----------------------------------------------------------------------------
                if ((sliderIndex + 1) == element.length) {
                    // element[0].classList.add('scaleDown')
                    // ---------------------------------------------------------------------------
                    tl.fromTo(element[0], {
                        z: 500,
                        rotation: 20,
                        scaleY: 1

                    }, {
                        z: 0,
                        rotation: 0,
                        scaleY: 1,
                        scaleX: 1.4,
                        duration: 1,
                        ease: Power3.easeOut


                    }, ">-.2")
                    // serialNumber animation  

                    gsap.to(serialNumber[0], {
                        top: '0',
                        opacity: 1,
                        duration: 1,
                        ease: Power3.easeOut
                    })
                    // movie name animation 
                    gsap.to(nameContainer[0], {
                        left: "0",
                        opacity: 1,
                        duration: 2,
                        ease: Power3.easeInOut
                    })
                    // sessions animation 
                    gsap.to(sessions[0], {
                        opacity: 1,
                        left: "0",
                        duration: 1.5,
                        ease: Power3.easeInOut
                    })
                    // actionBtn animation 
                    gsap.to(actionBtn1[0], {
                        left: 0,
                        duration: 1.5,
                        display:'block',
                        ease: Power3.easeInOut
                    })
                    gsap.to(actionBtn2[0], {
                        left: 0,
                        duration: 1.5,
                        display:'block',
                        ease: Power3.easeInOut
                    })



                    // ---------------------------------------------------------------------------
                } else {
                    // element[sliderIndex + 1].classList.add('scaleDown')
                    tl.fromTo(element[sliderIndex + 1], {
                        z: 500,
                        rotation: 20,
                        scaleY: 1

                    }, {
                        z: 0,
                        rotation: 0,
                        scaleY: 1,
                        scaleX: 1.4,
                        duration: 1,
                        ease: Power3.easeOut


                    }, ">-.2")
                    // serialNumber animation  

                    gsap.to(serialNumber[sliderIndex + 1], {
                        top: '0',
                        duration: 1,
                        opacity: 1,
                        ease: Power3.easeOut
                    })
                    // movie name animation 
                    gsap.to(nameContainer[sliderIndex + 1], {
                        left: "0",
                        opacity: 1,
                        duration: 2,
                        ease: Power3.easeInOut
                    })
                    // sessions animation 
                    gsap.to(sessions[sliderIndex + 1], {
                        opacity: 1,
                        left: "0",
                        duration: 1.5,
                        ease: Power3.easeInOut
                    })
                    // actionBtn animation 
                    gsap.to(actionBtn1[sliderIndex + 1], {
                        left: 0,
                        duration: 1.5,
                        display:'block',
                        ease: Power3.easeInOut
                    })
                    gsap.to(actionBtn2[sliderIndex + 1], {
                        left: 0,
                        duration: 1.5,
                        display:'block',
                        ease: Power3.easeInOut
                    })



                }
                sliderIndex++




                imgIndicator.style.left = `-${requiredTranslate * sliderIndex}px`
                activeImgIndicatorIndex = sliderIndex
                setCurrentSliderIndex(sliderIndex)
                if (sliderIndex == element.length) {
                    sliderIndex = 0


                    imgIndicator.style.left = `-${requiredTranslate * sliderIndex}px`
                    activeImgIndicatorIndex = sliderIndex
                    setCurrentSliderIndex(sliderIndex)
                }



                // const timeout = setTimeout(carousel, 5000);
                // return () => { clearTimeout(timeout) }

            }
            //---------------------------------------------  to handle tab throttling--------------------------------------------------- 

            startCarousel = () => {
                intervalId = setInterval(carousel, 5000);
            }
            startCarousel()

            stopCarousel = () => {
                // window.alert('hit')
                clearInterval(intervalId);
                intervalId = null;
            }
            const imgIndicators = document.getElementsByClassName('indicator')
            for (let indicator of imgIndicators) {
                indicator.addEventListener('click', () => {
                    // window.alert('works add e')
                    stopCarousel()
                })
            }



            document.addEventListener("visibilitychange", () => {
                if (document.visibilityState === "visible" && intervalId === null) {
                    startCarousel();
                } else if (document.visibilityState === "hidden" && intervalId !== null) {
                    stopCarousel();
                }
            });
          









        }


        //    -------------------------------------------handle image indicator --------------------------------------------------------------------------------
        const changeSlider = () => {
            gsap.to(element[sliderIndex], {

                z: 500,
                rotation: 20,
                scaleY: 1,
                scaleX: 1.4,
                duration: 1,
                ease: Power3.easeOut

            })
            gsap.to(element[activeImgIndicatorIndex], {
                z: 0,
                rotation: 0,
                scaleY: 1,
                scaleX: 1.4,
                duration: 1,
                ease: Power3.easeOut


            }, ">-.2")
            // serialNumber animation  

            gsap.to(serialNumber[sliderIndex], {
                top: '50px',
                opacity: 0,
                duration: 1,
                ease: Power3.easeOut
            })
            // movie name animation 
            gsap.to(nameContainer[sliderIndex], {
                left: "-100%",
                opacity: 0,
                duration: 2,
                ease: Power3.easeInOut
            })
            // sessions animation 
            gsap.to(sessions[sliderIndex], {
                opacity: 0,
                left: "-10%",
                duration: 1.5,
                ease: Power3.easeInOut
            })
            // actionBtn animation 
            gsap.to(actionBtn1[sliderIndex], {
                left: '-100%',
                duration: 1.5,
                display:'none',
                ease: Power3.easeInOut
            })
            gsap.to(actionBtn2[sliderIndex], {
                left: '100%',
                duration: 1.5,
                display:'none',
                ease: Power3.easeInOut
            })
            // serialNumber animation  

            gsap.to(serialNumber[activeImgIndicatorIndex], {
                top: '0',
                opacity: 1,
                duration: 1,
                ease: Power3.easeOut
            })
            // movie name animation 
            gsap.to(nameContainer[activeImgIndicatorIndex], {
                left: "0",
                opacity: 1,
                duration: 2,
                ease: Power3.easeInOut
            })
            // sessions animation 
            gsap.to(sessions[activeImgIndicatorIndex], {
                opacity: 1,
                left: "0",
                duration: 1.5,
                ease: Power3.easeInOut
            })
            // actionBtn animation 
            gsap.to(actionBtn1[activeImgIndicatorIndex], {
                left: 0,
                duration: 1.5,
                display:'block',
                ease: Power3.easeInOut
            })
            gsap.to(actionBtn2[activeImgIndicatorIndex], {
                left: 0,
                duration: 1.5,
                display:'block',
                ease: Power3.easeInOut
            })
            sliderIndex = activeImgIndicatorIndex
            startCarousel()

        }

        handleImgIndicatorRef.current = (n) => {
            stopCarousel()

            activeImgIndicatorIndex = n

            changeSlider()
            imgIndicator.style.left = `-${requiredTranslate * n}px`



        }

        handleIndicatorRef.current = (indicator) => {

            // let imgIndicatorContainer = document.getElementById("imgIndicator")
            let imgIndicator = document.getElementsByClassName('indicator')
            if (indicator == '+') {
                if (activeImgIndicatorIndex != 0) {
                    imgIndicator[activeImgIndicatorIndex - 1].click()
                }
            } else {
                if (activeImgIndicatorIndex != (imgIndicator.length - 1)) {
                    imgIndicator[activeImgIndicatorIndex + 1].click()
                }
            }
        }

        },app)


return ()=>{ 
    ctx.revert()
    clearInterval(intervalId);
    intervalId = null;
  
}
    }, [todaysData, tomorrowsData])



    return (
    //  <AnimatePresence>
           <motion.div 
        // initial={{opacity:1}}
        // animate={{opacity:1}}
        // exit={{x:600}}
        // transition={{ duration: 2,  ease: "easeInOut",   delay: 1  }} 
         ref={app} className='sliderContainer relative flex items-center flex-wrap ' style={{  minHeight: "100vh" }}>
            <Header></Header>
          
            <div className='min-h-[50px] bg-white sm:hidden'>
               


            </div>
            {/* --------------------------------------------background images start ----------------------------------------*/}
            <div className='bgImgContainer w-full h-full absolute top-0 left-0 z-10' style={{ perspective: "500px", transformStyle: "preserve-3d", overflow: "hidden" }}>
                {
                    todaysData.map((item, index) => <img className='SliderbgImg w-full h-full absolute top-0 left-0' style={{ transform: "translateZ(500px) rotate(20deg)"}} key={index} src={`${baseUrl}/api/image/get/${item.img}`}></img>)
                }
                {
                    tomorrowsData.map((item, index) => <img className='SliderbgImg w-full h-full absolute top-0 left-0' style={{ transform: "translateZ(500px) rotate(20deg)" }} key={index} src={`${baseUrl}/api/image/get/${item.img}`}></img>)

                }

            </div>

            {/* --------------------------------------------background images end ------------------------------------------*/}
            <div className='min-h-screen w-full  absolute top-0 left-0 z-20' style={{background:'radial-gradient(50% 80%,transparent 40%,rgba(0, 0, 0, 0.801))'}}>
                

            </div>






            {/* --------------------------------------------arrow indicator start ------------------------------------------*/}
            <motion.div
            exit={{opacity:0}}
            transition={{   duration: 0.5,  ease: "easeInOut",  }} 
             className='arrowIndicatorContainer z-50 flex absolute bottom-5 left-1/2 translate-x-[-50%]'>
                <div 
                 className='pre w-8 h-8 md:h-10 md:w-10 bg-orange-500 text-gray-700 rounded-full cursor-pointer text-base md:text-lg text-center p-1 md:p-2' onClick={() => handleIndicatorRef.current('-')}><FontAwesomeIcon icon={faLessThan} /></div>
                <div  className='nxt w-8 h-8 md:h-10 md:w-10 bg-orange-500 text-gray-700 rounded-full cursor-pointer text-base md:text-lg text-center p-1 md:p-2' onClick={() => handleIndicatorRef.current('+')}><FontAwesomeIcon icon={faGreaterThan} /></div>

            </motion.div>
            {/* --------------------------------------------arrow indicator end ------------------------------------------*/}





            {/* --------------------------------------------slider text container start  ------------------------------------------*/}
            <div className='sliderTextContainer w-full md:w-1/2 relative z-50' >
                <div className='' >





                    <div >

                        <div className='todayContainer relative ' >
                            <motion.h1 
                            exit={{opacity:0,
                                
                            }}
                            className='text-white text-xl '>Today</motion.h1>
                            {/*------------------------------------- number and text container start---------------------------------------------------------------*/}
                            <div className='relative number&nameContainer h-16 ' >
                                {
                                    todaysData.map((item, index) => <div key={index} className=' flex items-center absolute top-3 left-0 overflow-hidden '  >
                                        <motion.h1
                                        exit={{opacity:0,
                                
                                        }}
                                         className='text-white text-3xl md:text-5xl overflow-hidden '>0<span className='serialNumber relative top-11'>{item.number}</span></motion.h1>
                                        <div className='overflow-hidden' >
                                            <div className='nameContainer relative -left-full'>
                                                <h1 className='text-white text-xl md:text-3xl uppercase  '>{item.name}</h1>
                                                {/* <h3 className='text-white text-base '>category:{item.category.map((category, index) => <span key={index} className='p-1'>{category}</span>)}</h3> */}
                                                <motion.h3
                                                exit={{opacity:0,
                                
                                                }}
                                                 className='text-white text-base '>Category: {item.category}</motion.h3>

                                            </div>

                                        </div>

                                    </div>
                                    )
                                }
                            </div>
                            {/*------------------------------------- number and text container end---------------------------------------------------------------*/}
                            {/*------------------------------------- session schedule  container start ---------------------------------------------------------------*/}
                            <motion.div
                             exit={{opacity:0
                                
                             }}
                             className='sessionContainer relative  h-20 m-5'>
                                <h1 className='uppercase text-white my-3'>session</h1>
                                <div className='relative h-8'>
                                    {
                                        todaysData.map((item, index) => <div key={index} className='sessions flex absolute top-0 opacity-0 '  >
                                            {
                                                item.session.map((session, index) => <div key={index} className='text-white px-4 mx-1 rounded-xl border-solid border-current border-2'>{session}</div>)
                                            }

                                        </div>)
                                    }

                                </div>



                            </motion.div>
                            {/*------------------------------------- session schedule  container end ---------------------------------------------------------------*/}
                            {/*------------------------------------- action  container start ---------------------------------------------------------------*/}
                            {/* <br /> */}
                            <motion.div 
                            exit={{opacity:0,
                                
                            }}
                            className='actionContainer relative h-8 m-5 ' >
                                {
                                    todaysData.map((item, index) => <div key={index} className='flex absolute overflow-hidden left-0  z-[999]'>
                                        <Link to={`/movie/${item._id}`} className='bg-orange-500 px-2 py-1 relative hidden -left-[100%] actionBtn1'>Book a session</Link>
                                        <Link to={`/movie/${item._id}`} className='px-2 text-white border-solid hidden border-current border-2 mx-2 relative left-[100%] actionBtn2'>More</Link>

                                    </div>)
                                }
                            </motion.div>
                            {/*------------------------------------- action  container end -----------------------------------------------------------------*/}


                        </div>
                        {/* ----------------------------------------------------tomorrow container------------------------------------------------------------------------------------- */}




                        <div className='tomorrowContainer relative hidden' >
                            <motion.h1
                            exit={{opacity:0,
                                
                            }}
                             className='text-white text-xl '>Tomorrow</motion.h1>
                            {/*------------------------------------- number and text container start---------------------------------------------------------------*/}
                            <div className='relative number&nameContainer h-16 ' >
                                {
                                    tomorrowsData.map((item, index) => <div key={index} className=' flex items-center absolute top-3 left-0 overflow-hidden '  >
                                        <motion.h1
                                        exit={{opacity:0,
                                
                                        }}
                                         className='text-white text-3xl md:text-5xl overflow-hidden '>0<span className='serialNumber relative top-11'>{item.number}</span></motion.h1>
                                        <div className='overflow-hidden' >
                                            <div className='nameContainer relative -left-full'>
                                                <h1 className='text-white text-xl md:text-3xl uppercase  '>{item.name}</h1>
                                                {/* <h3 className='text-white text-base '>category:{item.category.map((category, index) => <span key={index} className='p-1'>{category}</span>)}</h3> */}
                                                <motion.h3
                                                exit={{opacity:0,
                                
                                                }}
                                                 className='text-white text-base '>Category:{item.category}</motion.h3>

                                            </div>


                                        </div>

                                    </div>
                                    )
                                }
                            </div>
                            {/*------------------------------------- number and text container end---------------------------------------------------------------*/}
                            {/*------------------------------------- session schedule  container start ---------------------------------------------------------------*/}
                            <motion.div
                            exit={{opacity:0
                                
                            }}
                            // transition={{ duration: 2,  ease: "easeInOut",   delay: 1  }} 
                             className='sessionContainer relative  h-20 m-5' >
                                <h1 className='uppercase text-white my-3'>session</h1>
                                <div className='relative h-8'>
                                    {
                                        tomorrowsData.map((item, index) => <div key={index} className='sessions flex absolute top-0 '  >
                                            {
                                                item.session.map((session, index) => <div key={index} className='text-white px-4 mx-1 rounded-xl border-solid border-current border-2'>{session}</div>)
                                            }

                                        </div>)
                                    }

                                </div>



                            </motion.div>
                            {/*------------------------------------- session schedule  container end ---------------------------------------------------------------*/}
                            {/*------------------------------------- action  container start ---------------------------------------------------------------*/}
                            {/* <br /> */}
                            <motion.div className='actionContainer relative h-8 m-5 z-[999]' >
                                {
                                    tomorrowsData.map((item, index) => <div key={index} className='flex absolute  left-0 overflow-hidden z-[999]' >
                                        <Link to={`/movie/${item._id}`} className='bg-orange-500 px-2 py-1 hidden relative -left-[100%] actionBtn1'>Book a session</Link>
                                        <Link to={`/movie/${item._id}`} className='px-2 text-white hidden border-solid border-current border-2 mx-2 relative left-[100%] actionBtn2'>More</Link>

                                    </div>)
                                }
                            </motion.div>
                            {/*------------------------------------- action  container end -----------------------------------------------------------------*/}


                        </div>
                    </div>

                </div>

            </div>
            {/* --------------------------------------------slider text container end    ------------------------------------------*/}





            {/* --------------------------------------------slider navigetor container start    ------------------------------------------*/}

            <motion.div
            exit={{x:'100%'}}
            transition={{ duration: .5,  ease: "easeInOut" }} 
             className='sliderTextContainer  w-full md:w-1/2 relative z-20  overflow-x-hidden py-7' >
                <div className='flex relative transition-all ease-out duration-1000 ' id='imgIndicator' style={{ width: "fit-content" }}>
                    <div className='todayIndicator flex relative '>
                       {todaysData?.length?<h1 className='text-white text-2xl font-bold absolute left-0 -top-9 z-50' >Today</h1>:''} 
                        {
                            todaysData?.map((item, index) => <div key={index} className='indicator   flex-grow-0 flex-shrink-0 relative w-[100px] h-[133px] md:w-[150px] md:h-[200px] m-2 overflow-hidden' onClick={() => handleImgIndicatorRef.current(index)} >
                                <img src={`${baseUrl}/api/image/get/${item.img}`} className='w-full h-full object-cover transition ease-in-out cursor-pointer hover:scale-125' />
                                <h1 className='absolute text-lg uppercase left-[50%] translate-x-[-50%] bottom-5 text-white z-20 '>{item.name}</h1>
                            </div>)
                        }
                    </div>
                    <div className='tomorrowIndicator flex relative'>
                       {tomorrowsData?.length?<h1 className='text-white text-2xl font-bold absolute left-0 -top-9 z-50'>Tomorrow</h1>:''
  }                       {
                            tomorrowsData.map((item, index) => <div key={index} className='indicator  flex-grow-0 flex-shrink-0 relative w-[100px] h-[133px] md:w-[150px] md:h-[200px] m-2 overflow-hidden' onClick={() => handleImgIndicatorRef.current(todaysData.length + index)} >
                                <img src={`${baseUrl}/api/image/get/${item.img}`} className='w-full h-full object-cover transition ease-in-out cursor-pointer hover:scale-125' />
                                <h1 className='absolute text-lg uppercase left-[50%] translate-x-[-50%] bottom-5 text-white z-20 '>{item.name}</h1>
                            </div>)
                        }

                    </div>



                </div>

            </motion.div>
            {/* --------------------------------------------slider navigetor container end    ------------------------------------------*/}
            {/* <div className='absolute w-full h-5 bottom-0 bg-[url(linear-gradient(red, yellow, blue))] z-[999] '>
                akjdfkajlfklak;f

            </div> */}

        </motion.div>
    //  </AnimatePresence>
    );
};

export default Slider;