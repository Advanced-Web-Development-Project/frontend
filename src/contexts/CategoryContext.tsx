import React, { createContext, useContext, useState, ReactNode } from 'react';
import { DialogPage, PostCategory } from '../models/general';

interface PostCategoryContextProps {

    category: PostCategory;
    setCategory: React.Dispatch<React.SetStateAction<PostCategory>>
}

const PostCategoryContext = createContext<PostCategoryContextProps | undefined>(undefined);

export const usePostCategoryContext = (): PostCategoryContextProps => {

    const context = useContext(PostCategoryContext);
    if (!context) {
        throw new Error('useDialogContext must be used within a DialogProvider');
    }
    return context;
};

export const PostCategoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [category, setCategory] = useState<PostCategory>(PostCategory.MyPosts);

    const contextValue: PostCategoryContextProps = {
        category,
        setCategory,
    };

    return (
        <PostCategoryContext.Provider value={contextValue}>
            {children}
        </PostCategoryContext.Provider>
    );
};
