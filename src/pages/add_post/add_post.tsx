import React, { useEffect, useState } from 'react';
import styles from './index.module.css'
import { useDialogContext } from '../../contexts/PageContext';
import { Button, TextField } from '@mui/material';



function AddPost() {

    const { setPage } = useDialogContext()



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
                    className={`${styles.text_box} ${styles.content}`}
                    placeholder='Text'
                    multiline
                    rows={10}
                    maxRows={10}
                />

            </div>
            <div className={styles.button_row}>
                <Button variant='contained' color='warning'>Upload</Button>
            </div>

        </>
    );
}

export default AddPost;