import React, { useEffect, useState } from 'react';
import styles from "./index.module.css"
import { Post } from '../../models/general';
import PostLikeComment from '../../features/post/post_like_comment/post_like_comment';
import no_image from "./../../pictures/no_image.jpg"
import PostLikeBox from '../../features/post/post_like_box/post_like_box';
import { useLocation, useNavigate } from 'react-router-dom';
import PostBoxTitle from '../../features/post/post_box_title/post_box_title';
import { timeAgo } from '../../features/post/serviec';
import { Button, IconButton, TextField } from '@mui/material';
import Comment from './../../features/comment/Comment'

interface PostPageProps {
}

function PostPage({ }: PostPageProps) {

    const [showComments, setShowComments] = useState(false)
    const navigate = useNavigate()

    const location = useLocation(); // Use useLocation hook to get current location object
    const post: Post = location.state?.post;

    if (!post) return <></>

    const { likes, dislikes, title, createdAt, user, _id } = post

    const postTimestep = timeAgo(createdAt.getTime())
    const info = `Posted by ${user.username} ${postTimestep}`

    const closePage = () => {
        navigate(-1)
    }

    return (
        <>
            <div className={styles.container}>


                <div className={styles.headline}>
                    <div className={styles.left_header} >
                        <PostLikeBox {...{ likes, dislikes, postId: _id, style: { backgroundColor: "white" } }} />
                        <PostBoxTitle  {...{ info, title }}></PostBoxTitle>
                    </div>

                    <IconButton className={styles.closeIcon} onClick={closePage}>X</IconButton>


                </div>
                <img
                    className={styles.image}
                    src={no_image}
                    alt="Circular Avatar"
                />

                <PostLikeComment {...{ setShowComments, showComments }}></PostLikeComment>

                {showComments ?
                    <div className={styles.comments_area}>
                        <Comment></Comment>
                        <Comment></Comment>
                        <Comment></Comment>
                        <Comment></Comment>
                        <Comment></Comment>
                    </div> : <></>}

                <TextField
                    className={styles.wide_text_box}
                    placeholder='Text'
                    multiline
                    rows={5}
                    maxRows={10}
                />
                <div className={styles.comment_button}>
                    <Button variant='contained' size='small'>Comment</Button>
                </div>

            </div>
        </>
    );
}

export default PostPage;