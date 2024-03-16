import { useEffect } from 'react';
import { Route, Routes } from "react-router-dom"
import Home from './pages/home/home';
import Navbar from './pages/navbar/navbar';
import './App.css';
import { useAuth } from './contexts/AuthContexts';
import MessageBox from './gen_components/MessageBox/MessageBox';
import Cookies from 'js-cookie';
import { getUserInfoAPI } from './api/user_api';
import NotFound from './pages/not_found';


function App() {

  const { login } = useAuth()

  const initializeAuth = async () => {
    try {
      const loggedUser = await getUserInfoAPI()
      login(loggedUser.data)
    } catch (err) {
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
          {/* Catch-all route for 404 errors */}
          <Route path='*' element={<NotFound />} />
        </Routes>
        <MessageBox></MessageBox>
      </div>
    </>

  );
}

export default App;
