import React from 'react';
import { Button, TextField, Link, IconButton } from '@mui/material'
import styles from "./index.module.css"
import UserTextField from '../../gen_components/UserTextField';

function Login() {
    return (
        <>
            <div className={styles.page}>
                <div className={styles.page__container}>
                    <IconButton className={styles.closeIcon}>X</IconButton>

                    <div className={styles.title}>Log In</div>

                    <div>By continuing, you agree to our User Agreement and<br /> acknowledge that you understand the Privacy Policy.</div>

                    <Button variant='outlined' >Contine With Google</Button>

                    <div className={styles.orContainer}>
                        <div className={styles.orContainer__line}></div>
                        <div>OR</div>
                        <div className={styles.orContainer__line}></div>

                    </div>

                    <div className={styles.button_container}>
                        {/* <UserTextField placeHolder='Username'></UserTextField>
                        <UserTextField placeHolder='Password'></UserTextField> */}
                    </div>

                    <div>
                        <span>New to Reddit? </span>
                        <Link href="#" underline="none">Sign Up</Link>
                    </div>

                    <Button variant='contained' color='info'>Log In</Button>
                </div>
            </div>
        </>
    );
}

export default Login;