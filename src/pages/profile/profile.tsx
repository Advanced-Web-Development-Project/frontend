import React from 'react';
import { useAuth } from '../../contexts/AuthContexts';
import styles from './index.module.css'
import no_image from "./../../pictures/no_image.jpg"
import { Button, IconButton } from '@mui/material';
import { useFormik } from 'formik';
import { initProfile, initialUser, profileOutput, userOutput } from '../signup/service';
import { postSchema, userSchema } from '../../validation';
import { DialogPage, User } from '../../models/general';
import { useErrorContext } from '../../contexts/ErrorContext';
import { useDialogContext } from '../../contexts/PageContext';

function Profile() {


    const { setError } = useErrorContext()
    const { setPage } = useDialogContext()

    const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik<Partial<User>>({
        initialValues: initProfile,
        validationSchema: postSchema,
        onSubmit: async (user: Partial<User>) => {

            try {

                // const response: any = await signupAPI(user)
                // const accessToken = response.data.token
                // const userInfo = response.data.userInfo


            } catch (error: any) {

                alert()
                setError({ display: true, message: "Email is not valid", seveirity: 'error' })
            }
        },
    })

    console.log("ERRORS : ", errors)

    return (
        <div className={styles.card}>

            <div className={styles.card__header}>

                <div className={styles.card__person}>
                    <img
                        className={styles.card__picture}
                        src={no_image}
                        alt="Circular Avatar"
                    />
                    <div className={styles.card__picture__buttons}>
                        <Button variant='contained' color='primary' size='small' className={styles.card__button}>Edit</Button>
                        <Button variant='contained' color='error' size='small' className={styles.card__button}>Remove</Button>
                    </div>
                </div>

                <div>
                    <div className={styles.card__name}> Ofek Glazer</div>
                    <div className={styles.card__email}>ofekglaz11@gmail.com</div>
                </div>
            </div>

            <form className={styles.page} onSubmit={handleSubmit}>

                <div className={styles.card__form}>

                    {profileOutput.map(({ key, type, desc }) => {
                        return (
                            <>
                                <input
                                    type={type}
                                    id={key}
                                    className={`${styles.input} ${(errors[key] && touched[key] ? styles.inputError : "")}`}
                                    placeholder={desc}
                                    onChange={handleChange}
                                    value={values[key]}
                                    onBlur={handleBlur}
                                >
                                </input>
                                {errors[key] && touched[key] && <span className={styles.error}>{errors[key]}</span>}
                            </>
                        )
                    })}
                </div>

            </form >

            <div className={styles.card__saveButton}>
                <Button variant='contained' color='primary' > Save</Button>
            </div>

        </div >
    );
}

export default Profile;