
import { IconButton } from "@mui/material";
import styles from "./index.module.css"
import { ArrowUpward, ArrowDownwardRounded, ArrowUpwardSharp, ArrowDownward, ArrowBackIosNew } from '@mui/icons-material/';
import { useAuth } from "../../../contexts/AuthContexts";
import { useEffect, useState } from "react";
import { dislikePostAPI, getSpecificPost, likePostAPI } from "../../../api/post_api";
import { Post } from "../../../models/general";


interface PostLikeBoxProps {
    post: Post,
    style?: React.CSSProperties; // Add style prop
}

enum LikeStatus {
    None = "NONE",
    Like = "LIKE",
    Dislike = "DISLIKE"
}

function PostLikeBox({ post, style }: PostLikeBoxProps) {

    const { likes, dislikes, postId } = post

    const { user, accessToken } = useAuth()
    const [currentLikes, setCurrentLikes] = useState(likes)
    const [currentDisLikes, setCurrentDisLikes] = useState(dislikes)

    useEffect(() => {
        setCurrentLikes(post.likes)
        setCurrentDisLikes(post.dislikes)
    }, [post])

    const getLikeStatus = () => {
        if (!user) return LikeStatus.None
        const likeStatus = currentLikes.find(id => id === user.id)
        const disikeStatus = currentDisLikes.find(id => id === user.id)
        return likeStatus ? LikeStatus.Like : disikeStatus ? LikeStatus.Dislike : LikeStatus.None
    }

    const currentStatus = getLikeStatus()
    const totalLikesCalculated = currentLikes.length - currentDisLikes.length

    const handleLikeClick = async () => {

        if (!user) return

        try {
            const post = await likePostAPI(postId, accessToken!)
            const { likes, dislikes } = post.data
            setCurrentLikes(likes)
            setCurrentDisLikes(dislikes)
            // setStatus(status)
        } catch (err) {
            console.log(err)
        }
    }
    const handleDislikeClick = async () => {

        if (!user) return

        try {
            const post = await dislikePostAPI(postId, accessToken!)
            const { likes, dislikes } = post.data
            setCurrentLikes(likes)
            setCurrentDisLikes(dislikes)
            // setStatus(status)
        } catch (err) {
            console.log(err)
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