import { Card } from "@mui/material";
import { Post } from "../../../models/general";
import styles from "./index.module.css"
import no_image from "./../../../pictures/no_image.jpg"
import PostLikeBox from "../post_like_box/post_like_box";


interface PostBoxProps {
    post: Post
}
function PostBox({ post }: PostBoxProps) {

    console.log(post)

    const { title, likes, } = post
    const postDescription = `Posted by OfekGlazer123 `
    return (
        <Card variant="outlined" className={styles.card}>

            <PostLikeBox likes={likes}></PostLikeBox>
            <img
                className={styles.card__picture}
                src={no_image}
                alt="Circular Avatar"
            />

            <div className={styles.card__info}>
                <div>{title}</div>
                <div>{title}</div>
            </div>

            <h1>{ }</h1>
        </Card>
    )
}

export default PostBox;