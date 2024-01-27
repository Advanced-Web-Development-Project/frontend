
import { useEffect, useState } from "react"
import styles from "./index.module.css"
import { getAllPostsAPI } from "../../../api/post_api"
import { Post } from "../../../models/general"
import PostBox from "../post_box/post_box"
import { useLoading } from "../../../contexts/LoadingSpinnerContext"
import { useErrorContext } from "../../../contexts/ErrorContext"
import { useSearchTermContext } from "../../../contexts/SearchTermContext"

interface PostListProps {
    posts: Post[],
    originalPosts: Post[],
    setPosts: React.Dispatch<React.SetStateAction<Post[]>>,
    setOriginalPosts: React.Dispatch<React.SetStateAction<Post[]>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

function PostList({ setPosts, posts, setOriginalPosts, originalPosts, setLoading }: PostListProps) {

    const { setMessage } = useErrorContext()

    const { searchTerm } = useSearchTermContext()

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
        const filteredPosts = searchTerm === "" ? originalPosts : originalPosts.filter(post => post.title.includes(searchTerm))
        setPosts(filteredPosts)
    }, [searchTerm])

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
        return <div className={styles.no_posts_container}>
            <h1 className={styles.no_posts_message}>No Posts... Please Try Another Category</h1>
        </div>
        // <div style={{ display: "flex", justifyContent: 'center' }}>
        //     <h1>No Post... Plz Try Other Category </h1>
        // </div>
    }

    return (
        <>
            { }
            <div className={styles.container}>
                {posts.map(post => <PostBox post={post}></PostBox>)}
            </div>
        </>
    )

}

export default PostList;