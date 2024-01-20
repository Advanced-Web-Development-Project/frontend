import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './index.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBars } from '@fortawesome/free-solid-svg-icons';
import reddit_logo from "../../pictures/reddit_logo.png"
import { Home, Person } from '@mui/icons-material/';
import { Button, IconButton } from '@mui/material';
import { useAuth } from '../../contexts/AuthContexts';
import { useDialogContext } from '../../contexts/PageContext';
import { DialogPage } from '../../models/general';

const Navbar: React.FC = () => {

  const { setPage } = useDialogContext()

  const [searchTerm, setSearchTerm] = useState('');
  const { isLoggedIn, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogin = () => {
    setPage(DialogPage.Login)
  }

  const handleSignup = () => {
    setPage(DialogPage.Signup)
  }

  const handleProfile = () => {
    navigate('/profile')
  }

  const handleLogout = () => {
    logout()
    navigate('/', { replace: true })
  }

  const handleHome = () => {
    navigate('/', { replace: true })
  }


  return (

    <nav className={styles.navbar}>

      <div className={styles.navbar__left}>

        <img
          src={reddit_logo}
          alt="Circular Avatar"
          className={styles.navbar_reddit_logo}
        />


        <IconButton className={styles.navbar_home_icon} onClick={handleHome}>
          <Home fontSize='large' />
        </IconButton>

        <div className={styles.navbar__searchBar}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

      </div>

      <div className={styles.navbar__right}>

        {isLoggedIn ? (
          <>
            <IconButton className={styles.navbar_home_icon} onClick={handleProfile}>
              <Person fontSize='large' />
            </IconButton>
            <Button onClick={handleLogout}  >Logout</Button>
          </>
        ) : (
          <>
            <Button onClick={handleLogin}><span>Login</span></Button>
            <Button onClick={handleSignup}>Signup</Button>
          </>
        )}

      </div>


    </nav>
  );
};

export default Navbar;
