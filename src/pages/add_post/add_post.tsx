import React, { useEffect, useState } from 'react';
import styles from './index.module.css'
import { useDialogContext } from '../../contexts/PageContext';
import { Button, TextField } from '@mui/material';



function AddPost() {

    const { setPage } = useDialogContext()

    const handleUploadImage = (event: any) => {
        console.log(event)
    }



    return (
        <>
            <div className={styles.page}>

                <h1>Create a post</h1>
                <TextField
                    className={styles.text_box}
                    placeholder='Title'
                    multiline
                    rows={1}
                    maxRows={4}
                />
                <TextField
                    className={styles.wide_text_box}
                    placeholder='Text'
                    multiline
                    rows={10}
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
                <Button variant='contained' color='warning'>Submit</Button>
            </div>

        </>
    );
}

export default AddPost;