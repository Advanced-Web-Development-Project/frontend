import { Alert, Dialog } from '@mui/material';
import React, { ReactNode } from 'react';
import styles from './index.module.css'
import { useDialogContext } from '../../contexts/PageContext';
import { DialogPage } from '../../models/general';
import { useErrorContext } from '../../contexts/ErrorContext';
import LoginPage from './../../pages/login/login'
import SignupPage from './../../pages/signup/signup'
import ProfilePage from './../../pages/profile/profile'
import AddPost from './../../pages/add_post/add_post'

interface DialogConatinerProps {
    children?: ReactNode;
}

const DialogConatiner: React.FC<DialogConatinerProps> = ({ children }: DialogConatinerProps) => {

    const { page, setPage } = useDialogContext()
    const { error } = useErrorContext()

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
                return <AddPost />
            case DialogPage.Profile:
                return <ProfilePage />
            case DialogPage.None:
                return <></>
        }
    }

    return (

        <>
            <Dialog className={styles.container} open={toOpen} onClose={handleClose} maxWidth="md">

                {selectPage(page)}

                {error !== null &&
                    <div className={styles.alert_container}>
                        <Alert className={styles.alert} severity={error.seveirity}><span>{error.message}</span></Alert>
                    </div>}
            </Dialog>


        </>
    );
}



export default DialogConatiner;