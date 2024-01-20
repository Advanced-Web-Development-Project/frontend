
import { useEffect, useState } from "react"
import styles from "./index.module.css"
import { getAllPostsAPI } from "../../../api/post_api"
import { Post } from "../../../models/general"
import PostBox from "../post_box/post_box"

interface PostListProps {
    posts: Post[],
    setPosts: React.Dispatch<React.SetStateAction<Post[]>>,
    setOriginalPosts: React.Dispatch<React.SetStateAction<Post[]>>
}

function PostList({ setPosts, posts, setOriginalPosts }: PostListProps) {


    //  const [postList, setPostLike] = useState<Post[] | null>(posts)

    const fetchData = async () => {
        const postsData = await getAllPostsAPI()
        console.log("DATA: @@@ - ", postsData)
        setPosts(postsData)
        setOriginalPosts(postsData)
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