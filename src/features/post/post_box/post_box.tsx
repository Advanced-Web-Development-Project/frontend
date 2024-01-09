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


interface PostBoxProps {
    post: Post
}
function PostBox({ post }: PostBoxProps) {

    const { title, likes, user, createdAt, dislikes, _id } = post

    const postTimestep = timeAgo(createdAt.getTime())
    const info = `Posted by ${user.username} ${postTimestep}`

    const navigate = useNavigate();

    const handlePostClicked = () => {
        navigate('/post', { state: { post } });
    }

    return (
        <Card variant="outlined" className={styles.card} >

            <PostLikeBox likes={likes} dislikes={dislikes} postId={_id}></PostLikeBox>

            <div className={styles.card__body} onClick={handlePostClicked}>
                <img
                    className={styles.card__picture}
                    src={no_image}
                    alt="Circular Avatar"
                />
                <div className={styles.card__info} >
                    <PostBoxTitle title={title} info={info}></PostBoxTitle>
                    <PostLikeComment></PostLikeComment>
                </div>
            </div>
        </Card>
    )
}


export default PostBox;