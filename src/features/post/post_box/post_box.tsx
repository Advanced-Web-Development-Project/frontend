import { Card } from "@mui/material";
import { DialogPage, Post } from "../../../models/general";
import styles from "./index.module.css"
import no_image from "./../../../pictures/no_image.jpg"
import PostLikeBox from "../post_like_box/post_like_box";
import { useDialogContext } from "../../../contexts/PageContext";


interface PostBoxProps {
    post: Post
}
function PostBox({ post }: PostBoxProps) {

    const { setPage } = useDialogContext()

    const { title, likes, } = post
    const postDescription = `Posted by OfekGlazer123 `
    const handlePostClicked = () => {
        setPage(DialogPage.ShowPost)
    }
    return (
        <Card variant="outlined" className={styles.card} >

            <PostLikeBox likes={likes}></PostLikeBox>
            {/* <div className="clickable"> */}

            <img
                className={styles.card__picture}
                src={no_image}
                alt="Circular Avatar"
            />

            <div className={styles.card__info} onClick={handlePostClicked}>
                <div>
                    <div>{title}</div>
                    <div>{title}</div>
                </div>

            </div>
            {/* </div> */}

            <h1>{ }</h1>
        </Card>
    )
}

export default PostBox;