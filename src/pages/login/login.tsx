import React, { useState } from 'react';
import { Button, Link, IconButton } from '@mui/material'
import styles from "./index.module.css"
import { loginAPI } from '../../api/auth_api';
import { useAuth } from '../../contexts/AuthContexts';
import { useNavigate } from 'react-router-dom';
import { useDialogContext } from '../../contexts/PageContext';
import { DialogPage } from '../../models/general';
import { useErrorContext } from '../../contexts/ErrorContext';

interface LoginProps {
}


function Login({ }: LoginProps) {

    const { login } = useAuth();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { setPage } = useDialogContext()
    const { setMessage } = useErrorContext()



    const handleLogin = async () => {
        try {
            const response = await loginAPI(email, password);
            const accessToken = response.data.data.accessToken
            const user = response.data.data.userInfo

            localStorage.setItem('userInfo', JSON.stringify({
                accessToken: accessToken,
                user: user
            }));

            login(accessToken, user)
            setPage(DialogPage.None)

        } catch (error: any) {

            console.log(error)

            // throw error

            // const errors: string[] = error.response.data.errors
            // const message = errors.reduce((acc, curr) => acc + curr)
            // setMessage({ display: true, message: message, seveirity: 'error' })
        }
    }



    return (
        <>
            <div className={styles.page}>
                <div className={styles.page__container}>
                    <IconButton className={styles.closeIcon} onClick={() => setPage(DialogPage.None)}>X</IconButton>

                    <div className={styles.title}>Log In</div>

                    <div>By continuing, you agree to our User Agreement and<br /> acknowledge that you understand the Privacy Policy.</div>

                    <Button variant='outlined' >Contine With Google</Button>

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

                    <div>
                        <span>New to Reddit? </span>
                        <Link href="#" underline="none">Sign Up</Link>
                    </div>

                    <Button variant='contained' onClick={handleLogin} color='info'>Log In</Button>
                </div>
            </div>
        </>
    );
}

export default Login;