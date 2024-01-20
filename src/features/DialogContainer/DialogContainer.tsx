import { Alert, Dialog } from '@mui/material';
import React, { ReactNode } from 'react';
import styles from './index.module.css'
import { useDialogContext } from '../../contexts/PageContext';
import { DialogPage, Post } from '../../models/general';
import { useErrorContext } from '../../contexts/ErrorContext';
import LoginPage from './../../pages/login/login'
import SignupPage from './../../pages/signup/signup'
import ProfilePage from './../../pages/profile/profile'
import AddPost from './../../pages/add_post/add_post'
import ShowPostPage from "../../pages/specific_post/post_page"

interface DialogConatinerProps {
    children?: ReactNode,
    setPosts: React.Dispatch<React.SetStateAction<Post[]>>,

}

const DialogConatiner: React.FC<DialogConatinerProps> = ({ children, setPosts }: DialogConatinerProps) => {

    const { page, setPage } = useDialogContext()

    const handleClose = () => {
        setPage(DialogPage.None)
    }

    const toOpen = page !== DialogPage.None

    const selectPage = (page: DialogPage) => {
        switch (page) {
            case DialogPage.Login:
                return <LoginPage />
            case DialogPage.Signup:
                return <SignupPage />
            case DialogPage.AddPost:
                return <AddPost setPosts={setPosts} />
            case DialogPage.None:
                return <></>
        }
    }

    return (

        <>
            <Dialog className={styles.container} open={toOpen} onClose={handleClose} maxWidth="md">
                {selectPage(page)}
            </Dialog>
        </>
    );
}



export default DialogConatiner;