
import { IconButton } from "@mui/material";
import styles from "./index.module.css"
import { ArrowUpward, ArrowDownwardRounded, ArrowUpwardSharp, ArrowDownward, ArrowBackIosNew } from '@mui/icons-material/';
import { useAuth } from "../../../contexts/AuthContexts";
import { useEffect, useState } from "react";
import { dislikePostAPI, getSpecificPost, likePostAPI } from "../../../api/post_api";


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

    const [check, setCheck] = useState(likes)

    const [status, setStatus] = useState<LikeStatus>(LikeStatus.None)
    const [trigger, setTrigger] = useState(false)


    const totalLikesCalculated = likes.length - dislikes.length

    const getCurrentStateOfPost = async () => {
        // debugger;
        try {
            const res = await getSpecificPost(postId)
        } catch (err) {
            console.log(err)
        }
    }

    // useEffect(() => {
    //     if(status === LikeStatus.None)

    // }, [trigger])


    // write the set like status 
    const setLikeStatus = () => { }

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
    }, [trigger])


    useEffect(() => {
        if (user) {
            const likeStatus = likes.find(userId => userId === user.id)
            const disikeStatus = dislikes.find(userId => userId === user.id)
            setStatus(likeStatus ? LikeStatus.Like : disikeStatus ? LikeStatus.Dislike : LikeStatus.None)
        }
    }, [user])

    useEffect(() => {

    })


    const handleLikeClick = async () => {

        debugger;

        if (!user) return

        try {
            const response = await likePostAPI(postId, accessToken!)
            console.log("RESPONSE ", response)
            setTrigger(!trigger)
        } catch (err) {
            console.log(err)
        }
    }
    const handleDislikeClick = async () => {

        if (!user) return

        try {
            const response = await dislikePostAPI(postId, accessToken!)
            setTrigger(!trigger)
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