
import { useEffect, useState } from "react"
import styles from "./index.module.css"
import { getAllPostsAPI } from "../../../api/post_api"
import { Post } from "../../../models/general"
import PostBox from "../post_box/post_box"

interface PostListProps {
    posts: Post[],
    setPosts: React.Dispatch<React.SetStateAction<Post[]>>
}

function PostList({ setPosts, posts }: PostListProps) {


    // const [posts, setPosts] = useState<Post[] | null>(null)

    const fetchData = async () => {
        const postsData = await getAllPostsAPI()
        setPosts(postsData)
    }

    useEffect(() => {
        try {

            fetchData();
        } catch (error) {
            console.log(error)
        }

    }, [])

    if (!posts) return <></>

    return (
        <div className={styles.container}>
            {posts.map(post => <PostBox post={post}></PostBox>)}
        </div>
    )
}

export default PostList;