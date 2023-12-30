import React, { createContext, useContext, useState, ReactNode } from 'react';
import { DialogPage } from '../models/general';

interface DialogContextProps {

    page: DialogPage;
    setPage: (newPage: DialogPage) => void;
}

const DialogContext = createContext<DialogContextProps | undefined>(undefined);

export const useDialogContext = (): DialogContextProps => {

    const context = useContext(DialogContext);
    if (!context) {
        throw new Error('useDialogContext must be used within a DialogProvider');
    }
    return context;
};

export const DialogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [page, setPage] = useState<DialogPage>(DialogPage.None);

    const contextValue: DialogContextProps = {
        page,
        setPage,
    };

    return (
        <DialogContext.Provider value={contextValue}>
            {children}
        </DialogContext.Provider>
    );
};
