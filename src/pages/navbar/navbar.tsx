import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBars } from '@fortawesome/free-solid-svg-icons';

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleMenuClick = () => {
    setShowDropdown(false);
  };

  const renderMenuLinks = () => (
    isLoggedIn ? (
      <>
        <Link to="/profile" onClick={handleMenuClick}>Profile</Link>
        <button onClick={() => { setIsLoggedIn(false); handleMenuClick(); }}>Logout</button>
      </>
    ) : (
      <>
        <Link to="/login" onClick={handleMenuClick}>Log In</Link>
        <Link to="/signup" onClick={handleMenuClick}>Sign Up</Link>
      </>
    )
  );

  return (
    <nav className={styles.navbar}>
      <Link to="/">Home</Link>
      <div className={styles.searchBar}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className={styles.navItems}>
        {renderMenuLinks()}
      </div>
      <FontAwesomeIcon className={styles.menu} icon={faBars} onClick={toggleDropdown} />
      {showDropdown && (
        <div className={styles.dropdownMenu} ref={dropdownRef}>
          {renderMenuLinks()}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
