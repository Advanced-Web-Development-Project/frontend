import React from 'react'
import styles from './index.module.css'
import IconWithTextButton from '../../gen_components/IconWithTextButton.tsx/IconWithTextButton'
import { Fireplace, NewReleases } from '@mui/icons-material/';
import { Post } from '../../models/general';
import { getAllPostsAPI, getAllPostsByCategory } from '../../api/post_api';
import { sortHotPostsMethod } from './service';


interface SearchBarProps {
    posts: Post[],
    originalPosts: Post[],
    setPosts: React.Dispatch<React.SetStateAction<Post[]>>
    setOriginalPosts: React.Dispatch<React.SetStateAction<Post[]>>
}

function SearchBar({ setPosts, posts, originalPosts, setOriginalPosts }: SearchBarProps) {

    const sortHotPosts = async () => {
        const posts = await getAllPostsAPI()
        const sortedHotPosts = posts.sort(sortHotPostsMethod)
        setPosts([...sortedHotPosts])
    }

    const sortNewestPosts = async () => {
        const posts = await getAllPostsAPI()
        const sortedNewestPosts = posts.sort((a, b) => {
            return (b.createdAt.getTime() - a.createdAt.getTime())
        })
        setPosts([...sortedNewestPosts])
    }

    const getPostsByCategory = async (category: string) => {

        try {
            const posts = await getAllPostsByCategory(category)
            setPosts([...posts])
            setOriginalPosts([...posts])
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className={styles.main}>

            <div className={styles.main__left}>

                <IconWithTextButton onClick={sortHotPosts} text='Hot'>
                    <Fireplace color='warning'></Fireplace>
                </IconWithTextButton>
                <IconWithTextButton onClick={sortNewestPosts} text='New'>
                    <NewReleases></NewReleases>
                </IconWithTextButton>

            </div>
            <div className={styles.main__right}>
                <IconWithTextButton onClick={() => getPostsByCategory('technology')} text='Technology'>
                    <Fireplace></Fireplace>
                </IconWithTextButton>
                <IconWithTextButton onClick={() => getPostsByCategory('sports')} text='sports'>
                    <NewReleases></NewReleases>
                </IconWithTextButton>
                <IconWithTextButton onClick={() => getPostsByCategory('science')} text='Science'>
                    <Fireplace></Fireplace>
                </IconWithTextButton>
            </div>

        </div>
    )
}


export default SearchBar
