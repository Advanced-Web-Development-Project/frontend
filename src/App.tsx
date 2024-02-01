import React, { useEffect } from 'react';
import { Route, Routes } from "react-router-dom"
import Home from './pages/home/home';
import Navbar from './pages/navbar/navbar';
import Profile from './pages/profile/profile';
import './App.css';
import { useAuth } from './contexts/AuthContexts';
import { UserStorageInfo } from './models/general';
import PostPage from './pages/specific_post/post_page';
import MessageBox from './gen_components/MessageBox/MessageBox';
import { getPictureAPI } from './api/picture_api';
import Cookies from 'js-cookie';
import { getUserInfoAPI } from './api/user_api';


function App() {

  const { login } = useAuth()

  const initializeAuth = async () => {

    const accessToken = Cookies.get('accessToken')!;
    if (!accessToken) return

    try {
      const loggedUser = await getUserInfoAPI(accessToken)
      login(accessToken, loggedUser.data)
    } catch (err) {
      console.log(err)
    }
  };

  const loadPicture = async () => {
    try {
      const res = await getPictureAPI('images/default/default-post-image.png')
      console.log("resposen: ", res)
    } catch (err) {
      console.log("error: ", err)
    }

  }

  useEffect(() => {
    initializeAuth();
    loadPicture();
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
        <MessageBox></MessageBox>
      </div>
    </>

  );
}

export default App;
