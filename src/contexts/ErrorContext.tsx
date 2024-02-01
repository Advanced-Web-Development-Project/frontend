import React, { createContext, useContext, useState, ReactNode } from 'react';
import { DialogPage } from '../models/general';
import { AlertColor } from '@mui/material';

type ErrorInfo = {
    message: string,
    seveirity: AlertColor | undefined
} | null

interface ErrorContextProps {

    error: ErrorInfo
    setErrorMessage: (text: string) => void
    setSuccessMessage: (text: string) => void
    setWarningMessage: (text: string) => void
}

const ErrorContext = createContext<ErrorContextProps | undefined>(undefined);

export const useErrorContext = (): ErrorContextProps => {

    const context = useContext(ErrorContext);
    if (!context) {
        throw new Error('useErrorContext must be used within a ErrorProvider');
    }
    return context;
};

export const initialErorrContext = { message: '', seveirity: undefined }

export const ErrorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [error, setValueError] = useState<ErrorInfo>(null);


    const setErrorMessage = (text: string) => {
        const errorMessage: ErrorInfo = { message: text, seveirity: 'error' }
        setValueError(errorMessage)
        setTimeout(() => setValueError(null), 3000)
    }

    const setSuccessMessage = (text: string) => {
        const errorMessage: ErrorInfo = { message: text, seveirity: 'success' }
        setValueError(errorMessage)
        setTimeout(() => setValueError(null), 3000)
    }

    const setWarningMessage = (text: string) => {
        const errorMessage: ErrorInfo = { message: text, seveirity: 'warning' }
        setValueError(errorMessage)
        setTimeout(() => setValueError(null), 3000)
    }

    const contextValue: ErrorContextProps = {
        error,
        setErrorMessage,
        setSuccessMessage,
        setWarningMessage
    };

    return (
        <ErrorContext.Provider value={contextValue}>
            {children}
        </ErrorContext.Provider>
    );
};
