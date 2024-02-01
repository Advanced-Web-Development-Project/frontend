import { useEffect } from 'react';
import { Route, Routes } from "react-router-dom"
import Home from './pages/home/home';
import Navbar from './pages/navbar/navbar';
import './App.css';
import { useAuth } from './contexts/AuthContexts';
import MessageBox from './gen_components/MessageBox/MessageBox';
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


  useEffect(() => {
    initializeAuth();
  }, [])

  return (
    <>
      <Navbar />
      <div className='main'>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
        <MessageBox></MessageBox>
      </div>
    </>

  );
}

export default App;
