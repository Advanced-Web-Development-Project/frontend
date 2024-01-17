
import { IconButton } from "@mui/material";
import styles from "./index.module.css"
import { CommentTwoTone } from "@mui/icons-material";
import { useEffect } from "react";
import { Comment, Post } from "../../../models/general";
import { getCommentsByPost } from "../../../api/commnet_api";




interface PostLikeCommentProps {
    type: "DISPLAY" | "SHOW",
    handleShowComment?: () => void,
    comments: string[] | Comment[],
}

function PostLikeComment({ comments, type, handleShowComment }: PostLikeCommentProps) {

    useEffect(() => {
    }, [])



    const handleCommentsClick = async () => {
        if (type === 'DISPLAY') return
        handleShowComment!();
    }


    return (
        <>
            <div className={styles.comments_likes_row}>

                <div className={styles.card__info__bottom} onClick={handleCommentsClick}>
                    <IconButton>
                        <CommentTwoTone fontSize='small' />
                    </IconButton>
                    <div>
                        {`${comments.length} Comments`}
                    </div>
                </div>



            </div>
        </>

    )
}

export default PostLikeComment;