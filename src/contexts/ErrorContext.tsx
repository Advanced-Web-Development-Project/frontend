import React, { createContext, useContext, useState, ReactNode } from 'react';
import { DialogPage } from '../models/general';
import { AlertColor } from '@mui/material';

type ErrorInfo = {
    display: boolean,
    message: string,
    seveirity: AlertColor | undefined
} | null

interface ErrorContextProps {

    error: ErrorInfo
    setError: (error: ErrorInfo) => void;
}

const ErrorContext = createContext<ErrorContextProps | undefined>(undefined);

export const useErrorContext = (): ErrorContextProps => {

    const context = useContext(ErrorContext);
    if (!context) {
        throw new Error('useErrorContext must be used within a ErrorProvider');
    }
    return context;
};

export const initialErorrContext = { display: false, message: '', seveirity: undefined }

export const ErrorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [error, setValueError] = useState<ErrorInfo>(null);

    const setError = (error: ErrorInfo) => {
        setValueError(error)
        setTimeout(() => setValueError(null), 3000)
    }

    const contextValue: ErrorContextProps = {
        error,
        setError,
    };

    return (
        <ErrorContext.Provider value={contextValue}>
            {children}
        </ErrorContext.Provider>
    );
};
