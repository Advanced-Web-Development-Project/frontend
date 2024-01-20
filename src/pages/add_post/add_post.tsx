import React, { useEffect, useState } from 'react';
import styles from './index.module.css'
import { useDialogContext } from '../../contexts/PageContext';
import { Button, TextField } from '@mui/material';
import { DialogPage, Post, PostOnScreen } from '../../models/general';
import { createPost } from '../../api/post_api';
import { useAuth } from '../../contexts/AuthContexts';
import { useErrorContext } from '../../contexts/ErrorContext';


const initialPost: PostOnScreen = {
    // imagePath: "",
    title: "",
    content: "",
}

interface AddPostProps {
    setPosts: React.Dispatch<React.SetStateAction<Post[]>>
}
function AddPost({ setPosts: setPostsList }: AddPostProps) {

    const { setPage } = useDialogContext()
    const { setMessage } = useErrorContext()

    const [post, setPost] = useState<PostOnScreen>(initialPost)

    const { accessToken } = useAuth()

    const handlePostChange = (prop: keyof Post, value: string) => {
        setPost({ ...post, [prop]: value })
    }

    const handleUploadImage = (event: any) => {
    }

    const handlePostSubmit = async () => {

        if (!accessToken) return

        try {
            const newPost = await createPost(post, accessToken)
            setPostsList(postsList => [...postsList, newPost])
            setMessage({ display: true, message: "Post has been added", seveirity: "success" })
            setTimeout(() => setPage(DialogPage.None), 1000)

        } catch (err) {
            setMessage({ display: true, message: "Post has been added", seveirity: "success" })
            console.log(err)
        }
    }

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