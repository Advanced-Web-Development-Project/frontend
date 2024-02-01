import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Post } from '../models/general';

interface SpecifcPostContextProps {
    specifcPost: Post | null;
    setSpecificPost: React.Dispatch<React.SetStateAction<Post | null>>
}

const SpecificPostContext = createContext<SpecifcPostContextProps | undefined>(undefined);

export const SpecificPostProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [specifcPost, setSpecificPost] = useState<Post | null>(null);

    return (
        <SpecificPostContext.Provider value={{ specifcPost, setSpecificPost }}>
            {children}
        </SpecificPostContext.Provider>
    );
};

export const useSpecifcPostContext = (): SpecifcPostContextProps => {
    const context = useContext(SpecificPostContext);
    if (!context) {
        throw new Error('SpecificPostContext must be used within a LoadingProvider');
    }
    return context;
};
