import React, { useEffect, useState } from 'react';
import styles from './index.module.css'
import { useDialogContext } from '../../contexts/PageContext';
import { Button, TextField } from '@mui/material';
import { DialogPage, Post, PostOnScreen, User } from '../../models/general';
import { createPostAPI } from '../../api/post_api';
import { useAuth } from '../../contexts/AuthContexts';
import { useErrorContext } from '../../contexts/ErrorContext';
import { TextMessages } from '../../contants/message_error';
import { useSpecifcPostContext } from '../../contexts/SpecificPostContext';


const initialPost: PostOnScreen = {
    title: "",
    content: "",
}

interface AddPostProps {
    setPosts: React.Dispatch<React.SetStateAction<Post[]>>
}
function AddPost({ setPosts: setPostsList }: AddPostProps) {

    const { setPage } = useDialogContext()
    const { setUser, user } = useAuth()
    const { setErrorMessage, setSuccessMessage } = useErrorContext()
    const { createPostMessage } = TextMessages
    const { setSpecificPost } = useSpecifcPostContext()
    const [post, setPost] = useState<PostOnScreen>(initialPost)

    const handlePostChange = (prop: keyof PostOnScreen, value: string) => {
        setPost({ ...post, [prop]: value })
    }

    const handleUploadImage = (event: any) => {
        const file = event.target.files[0]
        // handlePostChange('image', file)
        handlePostChange('image', file)
    }

    const validatePost = (post: PostOnScreen) => {
        const { content, title } = post
        if (!content || !title) {
            return "Fill all post requierd fields"
        }
        return ""
    }


    const handlePostSubmit = async () => {
        const errorMessage = validatePost(post)
        if (errorMessage) {
            setErrorMessage(errorMessage)
            return
        }

        try {

            const newPost = await createPostAPI(post)
            setPostsList(postsList => [...postsList, newPost])
            setSpecificPost(newPost)
            setSuccessMessage(createPostMessage.success)
            setUser((user) => {
                return {
                    ...user!,
                    posts: [...user!.posts, newPost.postId]
                }
            })
            setTimeout(() => setPage(DialogPage.SpecificPost), 1000)

        } catch (err) {
            setErrorMessage(createPostMessage.error)
        }
    }

    // if (!user) return <></>

    return (
        <>
            <div className={styles.page}>

                <h1>Create a post</h1>

                <TextField
                    onChange={(e) => handlePostChange('title', e.target.value)}
                    className={styles.text_box}
                    placeholder='Title'
                    multiline
                    rows={1}
                    maxRows={4}
                />

                <TextField
                    onChange={(e) => handlePostChange('content', e.target.value)}
                    placeholder='Content'
                    multiline
                    rows={8}
                    maxRows={10}
                />


                <div className={styles.input__fileUpload}>
                    <input
                        onChange={handleUploadImage}
                        type="file"
                        accept="image/*"
                        id="imageInput"
                    />
                </div>

            </div>

            <div className={styles.button_row}>
                <Button variant='contained' color='warning' onClick={handlePostSubmit}>Submit</Button>
            </div>

        </>
    );
}

export default AddPost;