import React, { useEffect, useState } from 'react';
import { Button, Link, IconButton } from '@mui/material'
import styles from "./index.module.css"
import { loginAPI, loginWithGoogleAPI } from '../../api/auth_api';
import { useAuth } from '../../contexts/AuthContexts';
import { useNavigate } from 'react-router-dom';
import { useDialogContext } from '../../contexts/PageContext';
import { DialogPage, HttpErrorResponse } from '../../models/general';
import { useErrorContext } from '../../contexts/ErrorContext';
import Cookies from 'js-cookie';

interface LoginProps {
}


function Login({ }: LoginProps) {


    const { login } = useAuth();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { setPage } = useDialogContext()
    const { setErrorMessage } = useErrorContext()

    const handleUserHasLoggedIn = (response: any) => {

        const accessToken = response.data.data.accessToken
        const refreshToken = response.data.data.refreshToken
        const user = response.data.data.userInfo

        // Store the tokens in Cookies or secure cookie for later use
        Cookies.set('accessToken', accessToken);
        Cookies.set('refreshToken', refreshToken);

        localStorage.setItem('userInfo', JSON.stringify({
            accessToken: accessToken,
            user: user
        }));

        login(user)
        setPage(DialogPage.None)
    }



    const handleLogin = async () => {
        try {
            const response = await loginAPI(email, password);
            handleUserHasLoggedIn(response)

        } catch (err: any) {
            const error: HttpErrorResponse = err
            setErrorMessage(error.response.data.errors[0])
        }
    }

    const handleGoogleLogin = async () => {
        try {
            const response = await loginWithGoogleAPI()
        } catch (err) {
        }
    }

    const computedImagePath = `${process.env.REACT_APP_SERVER_URL_DEV}/auth/google`


    return (
        <>
            <div className={styles.page}>
                <div className={styles.page__container}>
                    <IconButton className={styles.closeIcon} onClick={() => setPage(DialogPage.None)}>X</IconButton>

                    <div className={styles.title}>Log In</div>

                    <div>By continuing, you agree to our User Agreement and<br /> acknowledge that you understand the Privacy Policy.</div>

                    <Button variant='outlined' href={computedImagePath} onClick={handleGoogleLogin}>Contine With Google</Button>

                    <div className={styles.orContainer}>
                        <div className={styles.orContainer__line}></div>
                        <div>OR</div>
                        <div className={styles.orContainer__line}></div>

                    </div>

                    <div className={styles.button_container}>
                        <input
                            type='text'
                            id='email'
                            className={styles.input}
                            placeholder={'Email..'}
                            onChange={(e) => setEmail(e.target.value)}
                            value={email} />
                        <input
                            type='password'
                            id='password'
                            className={styles.input}
                            placeholder={'Password..'}
                            onChange={(e) => setPassword(e.target.value)}
                            value={password} />

                    </div>

                    <div onClick={() => setPage(DialogPage.Signup)}>
                        <span>New to Reddit? </span>
                        <Link href="#" underline="none">Sign Up</Link>
                    </div>

                    <Button variant='contained' onClick={handleLogin} color='info'>Log In</Button>
                </div>
            </div >
        </>
    );
}

export default Login;
