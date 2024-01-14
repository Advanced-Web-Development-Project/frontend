
import { IconButton } from "@mui/material";
import styles from "./index.module.css"
import { ArrowUpward, ArrowDownwardRounded, ArrowUpwardSharp, ArrowDownward, ArrowBackIosNew } from '@mui/icons-material/';
import { useAuth } from "../../../contexts/AuthContexts";
import { useEffect, useState } from "react";
import { dislikePostAPI, likePostAPI, patchPostAPI } from "../../../api/post_api";


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

    const { user, accessToken } = useAuth()
    const [status, setStatus] = useState<LikeStatus>(LikeStatus.None)

    const [currLikes, setCurrLikes] = useState(likes)
    const [currdislikes, setCurrDislikes] = useState(dislikes)

    const totalLikesCalculated = currLikes.length - currdislikes.length

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


    const handleLikeClick = async () => {

        if (!user) return

        try {

            const response = await likePostAPI(postId, accessToken!)

            if (status === LikeStatus.Like) {

                setCurrLikes(currLikes.filter(id => id !== user.id))
                setStatus(LikeStatus.None)

            } else if (status === LikeStatus.Dislike) {

                setCurrDislikes(currdislikes.filter(id => id !== user.id))
                setCurrLikes([...currLikes, user.id])
                setStatus(LikeStatus.Like)
            } else {
                setCurrLikes([...currLikes, user.id])
                setStatus(LikeStatus.Like)
            }

        } catch (err) {
            console.log(err)
        }
    }
    const handleDislikeClick = async () => {

        if (!user) return

        try {

            const response = await dislikePostAPI(postId, accessToken!)

            if (status === LikeStatus.Dislike) {

                setCurrDislikes(currdislikes.filter(id => id !== user.id))
                setStatus(LikeStatus.None)

            } else if (status === LikeStatus.Like) {

                setCurrLikes(currLikes.filter(id => id !== user.id))
                setCurrDislikes([...currdislikes, user.id])
                setStatus(LikeStatus.Dislike)
            } else {
                setCurrDislikes([...currdislikes, user.id])
                setStatus(LikeStatus.Dislike)
            }


        } catch (err) {
            console.log(err)
        }


    }


    return (
        <div className={styles.container} style={style}>
            <IconButton className={`${styles.navbar_home_icon} ${status === LikeStatus.Like ? styles.user_like : ''}`} onClick={handleLikeClick} >
                <ArrowUpwardSharp fontSize='small' />
            </IconButton>
            <div>{totalLikesCalculated}</div>
            <IconButton className={`${styles.navbar_home_icon} ${status === LikeStatus.Dislike ? styles.user_like : ''}`} onClick={handleDislikeClick}>
                <ArrowDownward fontSize='small' />
            </IconButton>
        </div>
    )
}

export default PostLikeBox;