
// AuthContext.js
import { createContext, useContext, useState } from 'react';
import { User } from '../models/general';
import Cookies from 'js-cookie';

type AuthContextType = {
  user: User | null,
  isLoggedIn: boolean,
  login: (user: User) => void,
  logout: () => void,
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}

const initialAuthContext: AuthContextType = {
  user: null,
  isLoggedIn: false,
  login: (user: User) => { },
  logout: () => { },
  setUser: () => { }
}

const AuthContext = createContext(initialAuthContext);

export const AuthProvider = ({ children }: any) => {

  const [user, setUser] = useState<User | null>(null);

  const login = (user: User) => {
    setUser(user)
  };

  const isLoggedIn = user !== null

  const logout = () => {
    setUser(null)
    localStorage.removeItem('userInfo');
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};