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


interface PostBoxProps {
    post: Post
}
function PostBox({ post }: PostBoxProps) {

    const { title, likes, username, createdAt, dislikes, postId, comments } = post
    const [imagePath, setImagePath] = useState("")
    const navigate = useNavigate();

    useEffect(() => {
        loadPicture();
    }, [])

    if (!post) return <></>

    const postTimestep = timeAgo(createdAt.getTime())
    const info = `Posted by ${username} ${postTimestep}`

    const handlePostClicked = () => {
        navigate('/post', { state: { post } });
    }
    const loadPicture = async () => {
        const res = await getPictureAPI(post.imagePath)
        // setImagePath()
        console.log(res)
    }

    return (
        <Card variant="outlined" className={styles.card} >

            <PostLikeBox likes={likes} dislikes={dislikes} postId={postId}></PostLikeBox>

            <div className={styles.card__body} onClick={handlePostClicked}>
                <img
                    className={styles.card__picture}
                    src={no_image}
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