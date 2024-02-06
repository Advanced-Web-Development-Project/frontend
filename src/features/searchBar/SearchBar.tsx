import React, { useState } from 'react'
import styles from './index.module.css'
import IconWithTextButton from '../../gen_components/IconWithTextButton.tsx/IconWithTextButton'
import { Fireplace, NewReleases, RefreshOutlined } from '@mui/icons-material/';
import { HttpErrorResponse, Post, PostCategory } from '../../models/general';
import { getAllPostsByCategoryAPI, refreshAllPostsByCategoryAPI } from '../../api/post_api';
import { useErrorContext } from '../../contexts/ErrorContext';
import SearchBarSortBy from './SearchBarSortBy';
import { usePostCategoryContext } from '../../contexts/CategoryContext';
import { useAuth } from '../../contexts/AuthContexts';


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

    const [selectedCategory, setSelectedCategory] = useState<string>(PostCategory.MyPosts)
    const { setErrorMessage } = useErrorContext()
    const { user } = useAuth()
    const { setCategory: setGlobalCategory, category } = usePostCategoryContext()

    const getPostsByCategory = async (category: PostCategory) => {
        try {
            const posts = await getAllPostsByCategoryAPI(category)
            setPosts([...posts])
            setOriginalPosts([...posts])
            setSelectedCategory(category)
            setGlobalCategory(category)
        } catch (err: any) {
            const error: HttpErrorResponse = err
            setErrorMessage(error.response.data.errors[0])
        }
    }

    const handleUserPostsOnly = async (category: PostCategory) => {
        if (!user) return
        try {
            const allPosts = await getAllPostsByCategoryAPI(PostCategory.MyPosts)
            const userPosts = allPosts.filter(post => post.username === user.username)
            setPosts([...userPosts])
            setOriginalPosts([...userPosts])
            setSelectedCategory(category)
            setGlobalCategory(category)
        } catch (err) {
            setErrorMessage('problem getting your posts :(')
        }

    }

    return (
        <div className={styles.main}>

            <div className={styles.main__left}>

                <IconWithTextButton onClick={() => getPostsByCategory(PostCategory.MyPosts)} text='All Posts'>
                    <Fireplace color={selectedCategory === PostCategory.MyPosts ? 'warning' : undefined}></Fireplace>
                </IconWithTextButton>
                {user && <IconWithTextButton onClick={() => handleUserPostsOnly(PostCategory.AllPosts)} text='My Posts'>
                    <Fireplace color={selectedCategory === PostCategory.AllPosts ? 'warning' : undefined}></Fireplace>
                </IconWithTextButton>}
                <IconWithTextButton onClick={() => getPostsByCategory(PostCategory.Tech)} text='Technology'>
                    <Fireplace color={selectedCategory === PostCategory.Tech ? 'warning' : undefined}></Fireplace>
                </IconWithTextButton>
                <IconWithTextButton onClick={() => getPostsByCategory(PostCategory.Sport)} text='Sports'>
                    <NewReleases color={selectedCategory === PostCategory.Sport ? 'warning' : undefined}></NewReleases>
                </IconWithTextButton>
                <IconWithTextButton onClick={() => getPostsByCategory(PostCategory.Science)} text='Science'>
                    <Fireplace color={selectedCategory === PostCategory.Science ? 'warning' : undefined}></Fireplace>
                </IconWithTextButton>

            </div>
            <div className={styles.main__right}>
                <SearchBarSortBy {...{ posts, setPosts }}></SearchBarSortBy>
            </div>

        </div>
    )
}


export default SearchBar
