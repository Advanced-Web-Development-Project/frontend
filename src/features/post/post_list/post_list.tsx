
import { useEffect, useState } from "react"
import styles from "./index.module.css"
import { getAllPostsAPI } from "../../../api/post_api"
import { Post } from "../../../models/general"
import PostBox from "../post_box/post_box"
import { useLoading } from "../../../contexts/LoadingSpinnerContext"
import { useErrorContext } from "../../../contexts/ErrorContext"

interface PostListProps {
    posts: Post[],
    setPosts: React.Dispatch<React.SetStateAction<Post[]>>,
    setOriginalPosts: React.Dispatch<React.SetStateAction<Post[]>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

function PostList({ setPosts, posts, setOriginalPosts, setLoading }: PostListProps) {

    const { setMessage } = useErrorContext()



    const fetchData = async () => {

        setTimeout(async () => {
            // setLoading(true)
            const postsData = await getAllPostsAPI()
            setPosts(postsData)
            setOriginalPosts(postsData)
            setLoading(false)
        }, 0)
    }

    useEffect(() => {
        try {
            // setLoading(true)
            fetchData();
        } catch (error) {
            console.log(error)
        }
    }, [])

    if (posts.length === 0) {
        // setMessage({ message: 'No Post availbale to this category', display: true, seveirity: 'info' })
        return <></>
    }

    return (
        <>
            <div className={styles.container}>
                {posts.map(post => <PostBox post={post}></PostBox>)}
            </div>
        </>
    )

}

export default PostList;