import React, { useState } from 'react'
import styles from './index.module.css'
import { Comment } from '../../models/general'
import { IconButton, TextField } from '@mui/material'
import { Delete, Edit, Save } from '@mui/icons-material/';
import { useAuth } from '../../contexts/AuthContexts';
import { deleteComment, editComment } from '../../api/commnet_api';
import { useErrorContext } from '../../contexts/ErrorContext';

interface CommentProps {
    comment: Comment,
    setCurrComments: React.Dispatch<React.SetStateAction<Comment[]>>,
    currComments: Comment[]
    postId: string
}

export default function UserComment({ comment, setCurrComments, currComments, postId }: CommentProps) {

    const { username, content, commentId } = comment

    const { user, accessToken } = useAuth()
    const { setMessage } = useErrorContext()

    const [editable, setEditable] = useState(false)
    const [contentToBeEdited, setContentToBeEdited] = useState(content)

    const isUseOwnComment = user?.username === comment.username

    const handleDeleteComment = async () => {
        if (!accessToken) return
        const res = await deleteComment("65a2abe0568883b98227a975", accessToken, comment.commentId)
        setCurrComments(comments => comments.filter(item => item.commentId !== comment.commentId))
    }

    const handleEditComment = () => {
        setEditable(!editable)
    }

    const handleSaveComment = async () => {

        if (!accessToken) return
        try {
            // const response = editComment(postId, accessToken, { content: contentToBeEdited, commentId: comment.commentId })
            const otherComments = currComments.filter(comment => comment.commentId !== commentId)
            const editedComment = { ...comment, content: contentToBeEdited }
            setCurrComments([...otherComments, editedComment])
            setMessage({ display: true, message: "Comment edited Successfully", seveirity: "success" })

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <div className={styles.container}>
                {editable ?
                    <div >
                        <div className={styles.user}> {username}</div>

                        <div className={styles.input_wrapper}>
                            <TextField
                                onChange={(e) => setContentToBeEdited(e.target.value)}
                                value={contentToBeEdited}
                                className={styles.input}
                                multiline
                                rows={2}
                                maxRows={2} />

                            <IconButton aria-label="delete" onClick={handleSaveComment} >
                                <Save />
                            </IconButton>
                        </div>

                    </div> :
                    <div>
                        <div className={styles.user}> {username}</div>
                        <div className={styles.text}> {content}</div>
                    </div>}

                {isUseOwnComment ?
                    <div className={styles.deleteIcon} >
                        <IconButton aria-label="delete" onClick={handleDeleteComment} >
                            <Delete />
                        </IconButton>
                        <IconButton aria-label="edit" onClick={handleEditComment}>
                            <Edit />
                        </IconButton>
                    </div> : <></>}

            </div>
            <div className={styles.horizontal_line}></div>
        </>
    )
}


