
import { IconButton } from "@mui/material";
import styles from "./index.module.css"
import { ArrowUpward, ArrowDownwardRounded, ArrowUpwardSharp, ArrowDownward, ArrowBackIosNew } from '@mui/icons-material/';
import { useAuth } from "../../../contexts/AuthContexts";
import { useEffect, useState } from "react";
import { patchPostAPI } from "../../../api/post_api";


interface PostLikeBoxProps {
    likes: string[],
    dislikes: string[],
    postId: string,
    style?: React.CSSProperties; // Add style prop
}

enum LikeStatus {
    None = "NONE",
    Like = "LIKE",
    Dislike = "DISLIKE"
}

function PostLikeBox({ likes, dislikes, postId, style }: PostLikeBoxProps) {

    const { user } = useAuth()
    const [status, setStatus] = useState<LikeStatus>(LikeStatus.None)
    const [countLikes, setCountLikes] = useState(likes.length)


    useEffect(() => {


        if (!user) return

        if (likes.find(userliked => userliked === user.id)) {
            setStatus(LikeStatus.Like)
            return
        }

        if (dislikes.find(userDisliked => userDisliked === user.id)) {
            setStatus(LikeStatus.Dislike)
            return
        }
    }, [])



    useEffect(() => {
        if (user) {
            const likeStatus = likes.find(userId => userId === user.id)
            const disikeStatus = dislikes.find(userId => userId === user.id)
            setStatus(likeStatus ? LikeStatus.Like : disikeStatus ? LikeStatus.Dislike : LikeStatus.None)
        }
    }, [user])


    const handleLikeClick = () => {

        if (!user) return
        if (status === LikeStatus.Like) return

        const newDisLikes = dislikes.filter(userDisliked => userDisliked !== user.id)

        // if (!isUserLiked) {
        setCountLikes(count => count + 1)
        setStatus(LikeStatus.Like)
        patchPostAPI({ likes: [...likes, user.id], dislikes: newDisLikes }, postId)
        // }

    }

    const handleDislikeClick = () => {

        if (!user) return
        if (status === LikeStatus.Dislike) return

        const newLikes = likes.filter(userLiked => userLiked !== user.id)

        // if (!isUserDisliked) {
        setCountLikes(newLikes.length)
        setStatus(LikeStatus.Dislike)
        patchPostAPI({ dislikes: [...dislikes, user.id], likes: newLikes }, postId)
        // }
    }

    return (
        <div className={styles.container} style={style}>
            <IconButton className={`${styles.navbar_home_icon} ${status === LikeStatus.Like ? styles.user_like : ''}`} onClick={handleLikeClick} >
                <ArrowUpwardSharp fontSize='small' />
            </IconButton>
            <div>{countLikes}</div>
            <IconButton className={`${styles.navbar_home_icon} ${status === LikeStatus.Dislike ? styles.user_like : ''}`} onClick={handleDislikeClick}>
                <ArrowDownward fontSize='small' />
            </IconButton>
        </div>
    )
}

export default PostLikeBox;