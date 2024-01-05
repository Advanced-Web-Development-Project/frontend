
import { useEffect, useState } from "react"
import styles from "./index.module.css"
import { getAllPostsAPI } from "../../../api/post_api"
import { Post } from "../../../models/general"
import PostBox from "../post_box/post_box"

interface PostListProps {

}

function PostList({ }: PostListProps) {


    const [posts, setPosts] = useState<Post[] | null>(null)

    useEffect(() => {
        try {
            const fetchData = async () => {
                debugger;
                const postsData = await getAllPostsAPI()
                setPosts(postsData)
            }
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