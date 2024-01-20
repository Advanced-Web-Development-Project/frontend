import React from 'react'
import styles from './index.module.css'
import IconWithTextButton from '../../gen_components/IconWithTextButton.tsx/IconWithTextButton'
import { Fireplace, NewReleases } from '@mui/icons-material/';
import { Post } from '../../models/general';
import { getAllPostsByCategory } from '../../api/post_api';


interface SearchBarProps {
    posts: Post[],
    setPosts: React.Dispatch<React.SetStateAction<Post[]>>
}

function SearchBar({ setPosts, posts }: SearchBarProps) {

    const sortHotPosts = () => {

        const sortedHotPosts = posts.sort(sortHotPostsMethod)
        // console.log(sortedHotPosts)
        setPosts([...sortedHotPosts])
    }

    const sortHotPostsMethod = (a: Post, b: Post): number => {

        const calculateScore = (post: Post) => post.likes.length - post.dislikes.length;

        const scoreA = calculateScore(a);
        const scoreB = calculateScore(b);

        return scoreB - scoreA;
    };

    const getSportPosts = async () => {
        try {
            const posts = await getAllPostsByCategory('sports')
            setPosts([...posts])
            // console.log(response)
        } catch (err) {

        }
    }

    const sortNewPosts = () => { }
    return (
        <div className={styles.main}>

            <div className={styles.main__left}>

                <IconWithTextButton onClick={sortHotPosts} text='Hot'>
                    <Fireplace color='warning'></Fireplace>
                </IconWithTextButton>
                <IconWithTextButton onClick={sortNewPosts} text='New'>
                    <NewReleases></NewReleases>
                </IconWithTextButton>

            </div>
            <div className={styles.main__right}>
                <IconWithTextButton onClick={sortHotPosts} text='Technology'>
                    <Fireplace></Fireplace>
                </IconWithTextButton>
                <IconWithTextButton onClick={getSportPosts} text='Sport'>
                    <NewReleases></NewReleases>
                </IconWithTextButton>
                <IconWithTextButton onClick={sortHotPosts} text='Sience'>
                    <Fireplace></Fireplace>
                </IconWithTextButton>
            </div>

        </div>
    )
}


export default SearchBar
