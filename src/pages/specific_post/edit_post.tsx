import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { createPostAPI, editPostAPI } from '../../api/post_api'
import { useErrorContext } from '../../contexts/ErrorContext'
import { DialogPage, Post, PostOnScreen } from '../../models/general'
import DialogWrapper from '../../gen_components/DialogWrapper'
import { useSpecifcPostContext } from '../../contexts/SpecificPostContext'
import { useDialogContext } from '../../contexts/PageContext'
import { TextMessages } from '../../contants/message_error'


interface EditPostProps {
    handleClose: () => void
}

function EditPost({ handleClose }: EditPostProps) {

    const { setErrorMessage, setSuccessMessage } = useErrorContext()
    const { specifcPost, setSpecificPost } = useSpecifcPostContext()
    const { setPage } = useDialogContext()

    const [postEditOS, setPostEditOS] = useState<PostOnScreen>({ content: specifcPost!.content, title: specifcPost!.title })
    const { editPostMessage } = TextMessages

    const handlePostOSChange = (prop: keyof PostOnScreen, value: string) => {
        setPostEditOS((postOS => {
            return ({
                ...postOS,
                [prop]: value
            })
        }))
    }

    const validatePost = (post: PostOnScreen) => {
        const { content, title } = post
        if (!content || !title) {
            return "Fill all post requierd fields"
        }
        return ""
    }

    console.log("POST: ", specifcPost)

    const handlePostSubmit = async () => {
        const errorMessage = validatePost(postEditOS)
        if (errorMessage) {
            setErrorMessage(errorMessage)
            return
        }

        try {

            const newPost = await editPostAPI(specifcPost!.postId, postEditOS)
            console.log(newPost)
            setSpecificPost(newPost)
            setSuccessMessage(editPostMessage.success)
            setTimeout(() => setPage(DialogPage.SpecificPost), 1500)
            handleClose();

        } catch (err) {
            setErrorMessage(editPostMessage.success)
        }
    }
    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', padding: 50, gap: 20, width: 400 }}>
                <h1>Edit a post</h1>
                <TextField
                    onChange={(e) => handlePostOSChange('title', e.target.value)}
                    placeholder='Title'
                    multiline
                    rows={1}
                    maxRows={4}
                    value={postEditOS.title}
                />
                <TextField
                    onChange={(e) => handlePostOSChange('content', e.target.value)}
                    placeholder='Content'
                    multiline
                    rows={8}
                    maxRows={10}
                    value={postEditOS.content}
                />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 20, paddingBottom: 20 }}>
                <Button variant='contained' color='warning' onClick={handlePostSubmit}>Submit</Button>
            </div>
        </>
    )
}

export default EditPost
