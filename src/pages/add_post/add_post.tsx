import React, { useEffect, useState } from 'react';
import styles from './index.module.css'
import { useDialogContext } from '../../contexts/PageContext';
import { Button, TextField } from '@mui/material';
import { Post, PostOnScreen } from '../../models/general';
import { createPost } from '../../api/post_api';
import { useAuth } from '../../contexts/AuthContexts';


const initialPost: PostOnScreen = {
    imagePath: "",
    title: "",
    userId: "",
    comments: [],
    content: "",

}
function AddPost() {

    const { setPage } = useDialogContext()

    const [post, setPost] = useState<PostOnScreen>(initialPost)

    const { accessToken } = useAuth()

    const handlePostChange = (prop: keyof Post, value: string) => {
        setPost({ ...post, [prop]: value })
    }

    const handleUploadImage = (event: any) => {
        debugger;
    }

    const handlePostSubmit = async () => {

        if (!accessToken) return

        try {
            const res = await createPost(post, accessToken)
            console.log(res)
        } catch (err) {
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