
// AuthContext.js
import { createContext, useContext, useState } from 'react';
import { User } from '../models/general';

type AuthContextType = {
  accessToken: string | null,
  user: User | null,
  login: (token: string, user: User) => void,
  logout: () => void
}

const initialAuthContext: AuthContextType = {
  accessToken: null,
  user: null,
  login: (token: string, user: User) => { },
  logout: () => { }
}
const AuthContext = createContext(initialAuthContext);

export const AuthProvider = ({ children }: any) => {

  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const login = (token: string, user: User) => {
    setAccessToken(token);
    setUser(user)
  };

  const logout = () => {
    setAccessToken(null);
    setUser(null)
  };

  return (
    <AuthContext.Provider value={{ accessToken, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};