import React from 'react'
import styles from './index.module.css'
import { Comment } from '../../models/general'
import { IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material/';
import { useAuth } from '../../contexts/AuthContexts';
import { deleteComment } from '../../api/post_api';

interface CommentProps {
    comment: Comment,
    setCurrComments: React.Dispatch<React.SetStateAction<Comment[]>>
}

export default function UserComment({ comment, setCurrComments }: CommentProps) {

    const { username, content } = comment

    const { user, accessToken } = useAuth()

    const deleteAble = user?.username === comment.username // change to id

    const handleDeleteComment = async () => {
        if (!accessToken) return
        const res = await deleteComment("65a2abe0568883b98227a975", accessToken, comment.commentId)
        setCurrComments(comments => comments.filter(item => item.commentId !== comment.commentId))
    }

    return (
        <div className={styles.container}>
            <div>
                <div className={styles.user}> {username}</div>
                <div className={styles.text}> {content}</div>
            </div>
            {deleteAble ?
                <div className={styles.deleteIcon} onClick={handleDeleteComment}>
                    <IconButton aria-label="delete"  >
                        <Delete />
                    </IconButton>
                </div> : <></>}

        </div>
    )
}


