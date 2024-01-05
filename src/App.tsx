import React, { useEffect } from 'react';
import { Route, Routes } from "react-router-dom"
import Home from './pages/home/home';
import Login from './pages/login/login';
import Signup from './pages/signup/signup';
import Navbar from './pages/navbar/navbar';
import Profile from './pages/profile/profile';
import './App.css';
import { Alert } from '@mui/material';
import { useErrorContext } from './contexts/ErrorContext';
import { useAuth } from './contexts/AuthContexts';
import { UserStorageInfo } from './models/general';


function App() {

  const { login } = useAuth()

  const initializeAuth = () => {

    const userStorage = localStorage.getItem('userInfo')
    if (!userStorage) return

    const userInfo: UserStorageInfo = JSON.parse(userStorage);

    if (userInfo) {
      login(userInfo.accessToken, userInfo.user)
    }
  };

  useEffect(() => {
    initializeAuth();
  }, [])

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </>

  );
}

export default App;
