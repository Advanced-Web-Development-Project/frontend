import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SearchTermProps {
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>
}

const SearchTermContext = createContext<SearchTermProps | undefined>(undefined);

export const SearchTermProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [searchTerm, setSearchTerm] = useState<string>("");

    return (
        <SearchTermContext.Provider value={{ searchTerm, setSearchTerm }}>
            {children}
        </SearchTermContext.Provider>
    );
};

export const useSearchTermContext = (): SearchTermProps => {
    const context = useContext(SearchTermContext);
    if (!context) {
        throw new Error('useSearchTerm must be used within a LoadingProvider');
    }
    return context;
};
