
import { useEffect, useState } from "react"
import styles from "./index.module.css"
import { getAllPostsAPI } from "../../../api/post_api"
import { DialogPage, Post } from "../../../models/general"
import PostBox from "../post_box/post_box"
import { useDialogContext } from "../../../contexts/PageContext"

interface PostAddProps {

}

function PostAdd({ }: PostAddProps) {

    const { setPage } = useDialogContext()

    const handleAddPost = () => {
        setPage(DialogPage.AddPost)
    }


    return (
        <div className={styles.container}>
            <input
                className={styles.input}
                placeholder='Create Post..'
                type='text'
                onClick={handleAddPost}
            >

            </input>
        </div>
    )
}

export default PostAdd;