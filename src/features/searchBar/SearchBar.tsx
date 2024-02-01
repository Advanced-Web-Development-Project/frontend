import React, { useState } from 'react'
import styles from './index.module.css'
import IconWithTextButton from '../../gen_components/IconWithTextButton.tsx/IconWithTextButton'
import { Fireplace, NewReleases } from '@mui/icons-material/';
import { HttpErrorResponse, Post } from '../../models/general';
import { getAllPostsAPI, getAllPostsByCategoryAPI } from '../../api/post_api';
import { sortHotPostsMethod } from './service';
import { useErrorContext } from '../../contexts/ErrorContext';
import { ErrorResponse } from 'react-router-dom';
import SearchBarSortBy from './SearchBarSortBy';


interface SearchBarProps {
    posts: Post[],
    originalPosts: Post[],
    setPosts: React.Dispatch<React.SetStateAction<Post[]>>
    setOriginalPosts: React.Dispatch<React.SetStateAction<Post[]>>
}

enum SearchBarCategory {
    MY_POSTS = 'My Posts',
    HOT = 'Hot',
    TECHNOLOGY = 'Technology',
    SPORTS = 'Sports',
    SCIENCE = 'Science',
}

function SearchBar({ setPosts, posts, originalPosts, setOriginalPosts }: SearchBarProps) {

    const [selectedCategory, setSelectedCategory] = useState<string>(SearchBarCategory.MY_POSTS)
    const { setErrorMessage } = useErrorContext()

    const getPostsByCategory = async (category: string) => {
        try {
            const posts = await getAllPostsByCategoryAPI(category)
            setPosts([...posts])
            setOriginalPosts([...posts])
            setSelectedCategory(category)
        } catch (err: any) {
            const error: HttpErrorResponse = err
            setErrorMessage(error.response.data.errors[0])
        }
    }

    const getOriginalUserPosts = async () => {
        try {
            const posts = await getAllPostsAPI()
            setPosts([...posts])
            setOriginalPosts([...posts])
            setSelectedCategory(SearchBarCategory.MY_POSTS)
        } catch (err: any) {
            const error: HttpErrorResponse = err
            setErrorMessage(error.response.data.errors[0])
        }

    }

    return (
        <div className={styles.main}>

            <div className={styles.main__left}>

                <IconWithTextButton onClick={getOriginalUserPosts} text='My Posts'>
                    <Fireplace color={selectedCategory === 'My Posts' ? 'warning' : undefined}></Fireplace>
                </IconWithTextButton>

                <IconWithTextButton onClick={() => getPostsByCategory('technology')} text='Technology'>
                    <Fireplace color={selectedCategory === 'technology' ? 'warning' : undefined}></Fireplace>
                </IconWithTextButton>
                <IconWithTextButton onClick={() => getPostsByCategory('sports')} text='Sports'>
                    <NewReleases color={selectedCategory === 'sports' ? 'warning' : undefined}></NewReleases>
                </IconWithTextButton>
                <IconWithTextButton onClick={() => getPostsByCategory('science')} text='Science'>
                    <Fireplace color={selectedCategory === 'science' ? 'warning' : undefined}></Fireplace>
                </IconWithTextButton>

            </div>
            <div className={styles.main__right}>
                <SearchBarSortBy {...{ posts, setPosts }}></SearchBarSortBy>
            </div>

        </div>
    )
}


export default SearchBar
