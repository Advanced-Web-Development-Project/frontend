import { CommentTwoTone } from '@mui/icons-material/';
import { timeAgo } from "../serviec";
import { Card, IconButton } from "@mui/material";
import { DialogPage, Post } from "../../../models/general";
import styles from "./index.module.css"
import no_image from "./../../../pictures/no_image.jpg"
import PostLikeBox from "../post_like_box/post_like_box";
import { useDialogContext } from "../../../contexts/PageContext";


interface PostBoxProps {
    post: Post
}
function PostBox({ post }: PostBoxProps) {

    const { title, likes, user, createdAt, dislikes, _id } = post

    const postTimestep = timeAgo(createdAt.getTime())

    console.log("pos  -  ", post)

    const { setPage } = useDialogContext()

    const postDescription = `Posted by OfekGlazer123 `
    const handlePostClicked = () => {
        setPage(DialogPage.ShowPost)
    }
    return (
        <Card variant="outlined" className={styles.card} >

            <PostLikeBox likes={likes} dislikes={dislikes} postId={_id}></PostLikeBox>
            <img
                className={styles.card__picture}
                src={no_image}
                alt="Circular Avatar"
            />

            <div className={styles.card__info}>
                <div className={styles.card__info__top}>
                    <div className={styles.card__info__title}>{title}</div>
                    {/* <div className={styles.card__info__user}>{postInfo}</div> */}
                </div>
                <div className={styles.card__info__bottom}>
                    <IconButton className={styles.navbar_home_icon}>
                        <CommentTwoTone fontSize='small' />
                    </IconButton>
                    <div>
                        {`4 Comments`}
                    </div>
                </div>
                <div className={styles.card__info} onClick={handlePostClicked}>
                    <div>
                        <div>{title}</div>
                        <div>{title}</div>
                    </div>

                </div>
            </div>

            <h1>{ }</h1>
        </Card>
    )
}


export default PostBox;