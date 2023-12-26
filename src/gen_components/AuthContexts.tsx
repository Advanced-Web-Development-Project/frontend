
// AuthContext.js
import { createContext, useContext, useState } from 'react';

type AuthContextType = {
  accessToken: string | null,
  login: (token: string) => void,
  logout: () => void
}

const initialAuthContext: AuthContextType = {
  accessToken: null,
  login: (token: string) => { },
  logout: () => { }
}
const AuthContext = createContext(initialAuthContext);

export const AuthProvider = ({ children }: any) => {

  const [accessToken, setAccessToken] = useState<string | null>(null);

  const login = (token: string) => {
    setAccessToken(token);
  };

  const logout = () => {
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider value={{ accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};