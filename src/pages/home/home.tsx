import React, { useEffect, useState } from 'react';
import DialogConatiner from '../../features/DialogContainer/DialogContainer';
import LoginPage from '../login/login'
import SignupPage from '../signup/signup'
import { useDialogContext } from '../../contexts/PageContext';
import { DialogPage, Post } from '../../models/general';
import { useErrorContext } from '../../contexts/ErrorContext';
import { Alert } from '@mui/material';
import styles from './index.module.css'
import { getAllPostsAPI } from '../../api/post_api';
import PostBox from '../../features/post/post_box/post_box';
import PostList from '../../features/post/post_list/post_list';
import PostPage from './../post/post_page'

function Home() {

    const { page } = useDialogContext()
    const { error } = useErrorContext()

    const currentPage = () => {
        switch (page) {
            case DialogPage.Login:
                return <LoginPage />
            case DialogPage.Signup:
                return <SignupPage />
            case DialogPage.ShowPost:
                return <PostPage />
            case DialogPage.None:
                return <></>
        }
    }

    return (
        <>
            <DialogConatiner>

                {currentPage()}
                {error !== null &&
                    <div className={styles.alert_container}>
                        <Alert className={styles.alert} severity={error.seveirity}><span>{error.message}</span></Alert>
                    </div>}
            </DialogConatiner>

            <PostList></PostList>


        </>
    );
}

export default Home;