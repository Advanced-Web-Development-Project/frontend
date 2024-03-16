import React, { useState } from 'react'
import styles from './index.module.css'
import { Comment, HttpErrorResponse } from '../../models/general'
import { IconButton, TextField } from '@mui/material'
import { Delete, Edit, Save } from '@mui/icons-material/';
import { useAuth } from '../../contexts/AuthContexts';
import { deleteComment, editComment } from '../../api/commnet_api';
import { useErrorContext } from '../../contexts/ErrorContext';
import { TextMessages } from '../../contants/message_error';

interface CommentProps {
    comment: Comment,
    setCurrComments: React.Dispatch<React.SetStateAction<Comment[]>>,
    currComments: Comment[]
    postId: string
}

export default function UserComment({ comment, setCurrComments, currComments, postId }: CommentProps) {

    const { username, content, commentId } = comment

    const { user } = useAuth()
    const { setErrorMessage, setSuccessMessage } = useErrorContext()

    const [editable, setEditable] = useState(false)
    const [contentToBeEdited, setContentToBeEdited] = useState(content)

    const isUseOwnComment = user?.username === comment.username
    const { editCommentMessage } = TextMessages

    const handleDeleteComment = async () => {

        try {
            const res = await deleteComment(postId, comment.commentId)
            setCurrComments(comments => comments.filter(item => item.commentId !== comment.commentId))
            setSuccessMessage('Message deleted')
        } catch (err: any) {
            const error: HttpErrorResponse = err
            setErrorMessage(error.response.data.errors[0])
        }
    }

    const handleEditComment = () => {
        setEditable(!editable)
    }

    const handleSaveComment = async () => {
        try {
            const commentHasChanged = contentToBeEdited !== comment.content
            if (!commentHasChanged) {
                setErrorMessage(editCommentMessage.validateCommentChange)
                return
            }
            const response = await editComment(postId, { content: contentToBeEdited, commentId: comment.commentId })
            const otherComments = currComments.filter(comment => comment.commentId !== commentId)
            const editedComment = { ...comment, content: contentToBeEdited }

            setCurrComments([...otherComments, editedComment])
            setSuccessMessage(response.message)
            setEditable(false)

        } catch (err: any) {
            const error: HttpErrorResponse = err
            setErrorMessage(error.response.data.errors[0])
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
                    <div style={{ maxWidth: '80%' }}>
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


