
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

    const { searchTerm } = useSearchTermContext()

    useEffect(() => {
        const filteredPosts = searchTerm === "" ? originalPosts : originalPosts.filter(post => post.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()))
        setPosts(filteredPosts)
    }, [searchTerm])

    if (posts.length === 0) {
        return <div className={styles.no_posts_container}>
            <h1 className={styles.no_posts_message}>No Posts... Please Try Another Category</h1>
        </div>
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