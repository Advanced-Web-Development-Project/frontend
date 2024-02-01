import { CommentTwoTone } from '@mui/icons-material/';
import { timeAgo } from "../serviec";
import { Card, IconButton } from "@mui/material";
import { DialogPage, Post } from "../../../models/general";
import styles from "./index.module.css"
import no_image from "./../../../pictures/no_image.jpg"
import PostLikeBox from "../post_like_box/post_like_box";
import { useDialogContext } from "../../../contexts/PageContext";
import PostLikeComment from '../post_like_comment/post_like_comment';
import PostBoxTitle from '../post_box_title/post_box_title';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPictureAPI } from '../../../api/picture_api';
import { useSpecifcPostContext } from '../../../contexts/SpecificPostContext';


interface PostBoxProps {
    post: Post
}


function PostBox({ post }: PostBoxProps) {


    const [postInBox, setPostInBox] = useState<Post | null>(post)
    const { setPage } = useDialogContext()
    const { setSpecificPost, specifcPost } = useSpecifcPostContext()

    useEffect(() => {
        if (!postInBox || !specifcPost) return
        if (postInBox.postId !== specifcPost.postId) return
        setPostInBox({ ...specifcPost })
    }, [specifcPost])

    useEffect(() => {
        setPostInBox({ ...post })
    }, [post])

    if (!postInBox) return <></>

    const { title, likes, username, createdAt, dislikes, postId, comments, imagePath } = postInBox!

    const postTimestep = timeAgo(new Date(createdAt).getTime())
    const info = `Posted by ${username} ${postTimestep}`

    const handlePostClicked = () => {
        setSpecificPost({ ...postInBox })
        setPage(DialogPage.SpecificPost)
    }



    const computedImagePath = `http://localhost:8000/${imagePath}`

    console.log("Post Box Render --- ", postInBox.title)

    return (
        <Card variant="outlined" className={styles.card} >

            <PostLikeBox post={postInBox} setPost={setPostInBox}></PostLikeBox>

            <div className={styles.card__body} onClick={handlePostClicked}>
                <img
                    className={styles.card__picture}
                    src={computedImagePath}
                    alt="Circular Avatar"
                />
                <div className={styles.card__info} >
                    <PostBoxTitle title={title} info={info}></PostBoxTitle>
                    <PostLikeComment type='DISPLAY' comments={post.comments}></PostLikeComment>
                </div>
            </div>
        </Card>
    )
}


export default PostBox;