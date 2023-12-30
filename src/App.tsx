import React from 'react';
import { Route, Routes } from "react-router-dom"
import Home from './pages/home/home';
import Login from './pages/login/login';
import Signup from './pages/signup/signup';
import Navbar from './pages/navbar/navbar';
import Profile from './pages/profile/profile';
import './App.css';
import { Alert } from '@mui/material';
import { useErrorContext } from './contexts/ErrorContext';


function App() {

  // const { error, } = useErrorContext()
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
      {/* {error.display && <Alert className='alert__container' severity={error.seveirity}><span>{error.message}</span></Alert>} */}

    </>

  );
}

export default App;
