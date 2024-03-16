
import { IconButton } from "@mui/material";
import styles from "./index.module.css"
import { ArrowUpward, ArrowDownwardRounded, ArrowUpwardSharp, ArrowDownward, ArrowBackIosNew } from '@mui/icons-material/';
import { useAuth } from "../../../contexts/AuthContexts";
import { useEffect, useState } from "react";
import { dislikePostAPI, likePostAPI } from "../../../api/post_api";
import { HttpErrorResponse, Post } from "../../../models/general";
import { useErrorContext } from "../../../contexts/ErrorContext";
import { TextMessages } from "../../../contants/message_error";


interface PostLikeBoxProps {
    post: Post | null,
    style?: React.CSSProperties; // Add style prop
    setPost: React.Dispatch<React.SetStateAction<Post | null>>
}

enum LikeStatus {
    None = "NONE",
    Like = "LIKE",
    Dislike = "DISLIKE"
}

function PostLikeBox({ post, style, setPost }: PostLikeBoxProps) {

    const { likes, dislikes, postId } = post!

    const { user } = useAuth()
    const { setErrorMessage } = useErrorContext()
    const { likePostMessage } = TextMessages

    useEffect(() => {
    }, [post])

    const getLikeStatus = () => {
        if (!user) return LikeStatus.None
        const likeStatus = likes.find(id => id === user.id)
        const disikeStatus = dislikes.find(id => id === user.id)
        return likeStatus ? LikeStatus.Like : disikeStatus ? LikeStatus.Dislike : LikeStatus.None
    }

    const currentStatus = getLikeStatus()
    const totalLikesCalculated = likes.length - dislikes.length

    const handleLikeClick = async () => {

        if (!user) return

        try {
            const post = await likePostAPI(postId)
            const { likes, dislikes } = post.data
            setPost((prev) => {
                return {
                    ...prev,
                    likes,
                    dislikes
                } as Post
            })
        } catch (err: any) {
            setErrorMessage(likePostMessage.error)
        }
    }
    const handleDislikeClick = async () => {

        if (!user) return

        try {
            const post = await dislikePostAPI(postId)
            const { likes, dislikes } = post.data
            setPost((prev) => {
                return {
                    ...prev,
                    likes,
                    dislikes
                } as Post
            })
        } catch (err) {
        }
    }

    return (
        <div className={styles.container} style={style}>
            <IconButton className={`${styles.navbar_home_icon} ${currentStatus === LikeStatus.Like ? styles.user_like : ''}`} onClick={handleLikeClick} >
                <ArrowUpwardSharp fontSize='small' />
            </IconButton>
            <div>{totalLikesCalculated}</div>
            <IconButton className={`${styles.navbar_home_icon} ${currentStatus === LikeStatus.Dislike ? styles.user_like : ''}`} onClick={handleDislikeClick}>
                <ArrowDownward fontSize='small' />
            </IconButton>
        </div>
    )
}

export default PostLikeBox;