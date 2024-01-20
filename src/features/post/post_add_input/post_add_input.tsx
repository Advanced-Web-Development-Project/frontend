
import { useEffect, useState } from "react"
import styles from "./index.module.css"
import { getAllPostsAPI } from "../../../api/post_api"
import { DialogPage, Post } from "../../../models/general"
import PostBox from "../post_box/post_box"
import { useDialogContext } from "../../../contexts/PageContext"
import { TextField } from "@mui/material"
import UserProfilePicture from "../../../gen_components/UserProfilePicture/UserProfilePicture"
import no_image from "../../../pictures/no_image.jpg"

interface PostAddProps {

}

function PostAdd({ }: PostAddProps) {

    const { setPage } = useDialogContext()

    const handleAddPost = () => {
        setPage(DialogPage.AddPost)
    }


    return (
        <div className={styles.container}>
            <div className={styles.profile_image}>
                <UserProfilePicture alt="profiel" size="large" src={no_image} ></UserProfilePicture>
            </div>
            <TextField
                className={styles.input}
                placeholder='Create Post..'
                type='text'
                onClick={handleAddPost}
            >

            </TextField>
        </div>
    )
}

export default PostAdd;