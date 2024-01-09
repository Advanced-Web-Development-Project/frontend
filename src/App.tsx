import React, { useEffect } from 'react';
import { Route, Routes } from "react-router-dom"
import Home from './pages/home/home';
import Navbar from './pages/navbar/navbar';
import Profile from './pages/profile/profile';
import './App.css';
import { useAuth } from './contexts/AuthContexts';
import { UserStorageInfo } from './models/general';
import PostPage from './pages/specific_post/post_page';


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
      <div className='main'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/post' element={<PostPage />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </div>
    </>

  );
}

export default App;
