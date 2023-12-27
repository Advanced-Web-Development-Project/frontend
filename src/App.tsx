import React from 'react';
import { Route, Routes } from "react-router-dom"
import Home from './pages/home/home';
import Login from './pages/login/login';
import Signup from './pages/signup/signup';
import Navbar from './pages/navbar/navbar';


function App() {
  return (
    <>
			<Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </>

  );
}

export default App;
