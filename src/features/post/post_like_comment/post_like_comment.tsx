
import { IconButton } from "@mui/material";
import styles from "./index.module.css"
import { CommentTwoTone } from "@mui/icons-material";
import React from "react";


interface PostLikeCommentProps {
    setShowComments?: React.Dispatch<React.SetStateAction<boolean>>,
    showComments?: boolean | undefined
}

function PostLikeComment({ setShowComments, showComments }: PostLikeCommentProps) {

    const handleCommentsClick = () => {
        if (setShowComments) {
            setShowComments(!showComments)
        }
    }



    return (
        <>
            <div className={styles.comments_likes_row}>

                <div className={styles.card__info__bottom} onClick={handleCommentsClick}>
                    <IconButton>
                        <CommentTwoTone fontSize='small' />
                    </IconButton>
                    <div>
                        {`4 Comments`}
                    </div>
                </div>
                <div className={styles.card__info__bottom}>
                    <IconButton>
                        <CommentTwoTone fontSize='small' />
                    </IconButton>
                    <div>
                        {`4 Likes`}
                    </div>
                </div>
            </div>
        </>

    )
}

export default PostLikeComment;