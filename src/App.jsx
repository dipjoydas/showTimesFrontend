

import './App.css'
import { Route, RouterProvider, Routes, createBrowserRouter, useLocation } from 'react-router-dom';
// import {
//   BrowserRouter,
//   // Redirect,
//   Route,
//   Routes,
//   // Switch,
//   // Link,
//   useLocation
// } from "react-router-dom";
import Home from './components/home/Home';
import Movie from './components/Movie/Movie';
import LogIn from './components/LogIn/LogIn'
import SignUp from './components/SingUp/SIgnUp'
import VerifyEmail from './components/VerifyEmail/VerifyEmail';
import PrivateRoute from './routes/PrivateRoute'
import Payment from './components/Payment/Payment';
import { AnimatePresence } from 'framer-motion';
import Tickets from './components/Tickets/Tickets';

function App() {
  // const location =useLocation()
  // return(
  //   <>
  //   <BrowserRouter>
  //   <AnimatePresence mode="wait" initial={false}>
  //     <Routes location={location} key={location.pathname}>
  //       <Route path='/'>
  //         <Home></Home>
  //       </Route>
  //       <Route path='/movie/:id'>
  //         <Movie></Movie>
  //       </Route>
  //     </Routes>
  //   </AnimatePresence>
  //   </BrowserRouter>
    
  //   <Routes location={location} key={location.pathname}>
  //     <Route index element={<Home/>}/>
  //     <Route path='/movie/:id' element={<Movie/>} />

  //   </Routes>
    
  //   </>
  // )


  const router = createBrowserRouter([
    {
      path:'/',
      element:<AnimatePresence initial={false} mode='wait'>
        <Home key='home'></Home>
      </AnimatePresence>
    },{
      path:'/movie/:id',
      // element:<PrivateRoute><Movie></Movie></PrivateRoute>
      element:<AnimatePresence initial={false} mode='wait'>
        <PrivateRoute><Movie key='movie'></Movie></PrivateRoute>
      
    </AnimatePresence>
    },
    {
      path:'/login',
      element:<LogIn></LogIn>

    },
    {
      path:'/signup',
      element:<SignUp></SignUp>

    }
    ,
    {
      path:'/verifyemail',
      element:<VerifyEmail></VerifyEmail>

    },{
      path:'/payment/:id',
      // element:<Payment></Payment>                  
      element:<AnimatePresence initial={false} mode='wait'><Payment key='payment'></Payment>   </AnimatePresence>                  
    },{
      path:'/tickets',
      element:<Tickets></Tickets>
    }
   
  ])


  return (
   
      <div className='bg-black'>
         {/* <AnimatePresence initial={false} mode='wait'> */}
     
      <RouterProvider router={router}></RouterProvider>
      {/* </AnimatePresence> */}
     
    </div>
       
   
    
  
  )
}

export default App
