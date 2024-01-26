import React from 'react'
import styles from './index.module.css'
import IconWithTextButton from '../../gen_components/IconWithTextButton.tsx/IconWithTextButton'
import { Fireplace, NewReleases } from '@mui/icons-material/';
import { Post } from '../../models/general';
import { getAllPostsByCategory } from '../../api/post_api';


interface SearchBarProps {
    posts: Post[],
    originalPosts: Post[],
    setPosts: React.Dispatch<React.SetStateAction<Post[]>>
}

function SearchBar({ setPosts, posts, originalPosts }: SearchBarProps) {

    const sortHotPosts = () => {
        const sortedHotPosts = originalPosts.sort(sortHotPostsMethod)
        setPosts([...sortedHotPosts])
    }

    const sortNewestPosts = () => {
        const sortedNewestPosts = originalPosts.sort((a, b) => {
            return (b.createdAt.getTime() - a.createdAt.getTime())
        })
        setPosts([...sortedNewestPosts])
    }

    const sortHotPostsMethod = (a: Post, b: Post): number => {

        const calculateScore = (post: Post) => post.likes.length - post.dislikes.length;

        const scoreA = calculateScore(a);
        const scoreB = calculateScore(b);

        return scoreB - scoreA;
    };

    const getPostsByCategory = async (category: string) => {

        try {
            const posts = await getAllPostsByCategory(category)
            setPosts([...posts])
        } catch (err) {
            console.log(err)
        }
    }

    // if (posts.length === 0) return <></>
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
                <IconWithTextButton onClick={() => getPostsByCategory('Technology')} text='Technology'>
                    <Fireplace></Fireplace>
                </IconWithTextButton>
                <IconWithTextButton onClick={() => getPostsByCategory('sports')} text='sports'>
                    <NewReleases></NewReleases>
                </IconWithTextButton>
                <IconWithTextButton onClick={() => getPostsByCategory('Sience')} text='sience'>
                    <Fireplace></Fireplace>
                </IconWithTextButton>
            </div>

        </div>
    )
}


export default SearchBar
