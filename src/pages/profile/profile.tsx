import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContexts';
import styles from './index.module.css'
import no_image from "./../../pictures/no_image.jpg"
import { Button, IconButton } from '@mui/material';
import { useFormik } from 'formik';
import { profileOutput } from '../signup/service';
import { userUpdateSchema } from '../../validation';
import { DialogPage, User, UserOS } from '../../models/general';
import { useErrorContext } from '../../contexts/ErrorContext';
import { deleteUserAPI, updateUserAPI } from '../../api/user_api';


type ProfileFileds = {
    username: string;
    email: string;
    name: string;
    [key: string]: any;

}

const initialProfileFields: ProfileFileds = {
    email: "",
    name: "",
    username: ""
}

function Profile() {

    const { setError } = useErrorContext()
    const [oldUser, setOldUser] = useState<ProfileFileds>(initialProfileFields)
    const [screenEditable, setScreenEditable] = useState(false)
    const { accessToken, user } = useAuth()

    useEffect(() => {

        if (!user) return

        const { email, name, username } = user
        setOldUser({ email, name, username })

    }, [])




    const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik<ProfileFileds>({
        initialValues: oldUser,
        validationSchema: userUpdateSchema,
        enableReinitialize: true,
        onSubmit: async (user: Partial<User>) => {

            debugger;

            if (!accessToken) return

            try {

                const response: any = await updateUserAPI(user.username!, accessToken, user)
                console.log(" RES @@@ - ", response)
                // setOldUser({})

            } catch (error: any) {

                const errorMessage = error.response.data.message
                // setError({ display: true, message: errorMessage, seveirity: 'error' })
            }
        },
    })

    if (!user || !accessToken) return <></>

    const handleEditClick = () => {
        setScreenEditable(screen => !screen)
    }

    const handleDleteClick = async () => {
        const res = await deleteUserAPI(user.id, accessToken, values)
        console.log(res)
    }

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
                        <Button variant='contained' color='primary' size='small' className={styles.card__button} onClick={handleEditClick}>Edit</Button>
                        <Button variant='contained' color='error' size='small' className={styles.card__button} onClick={handleDleteClick}>Remove</Button>
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
                                <div className={styles.input_headline}>{desc}</div>
                                <input
                                    type={type}
                                    id={key}
                                    className={`${styles.input} ${(errors[key] && touched[key] ? styles.inputError : "")}`}
                                    disabled={!screenEditable}
                                    onChange={handleChange}
                                    value={values[key]}
                                    onBlur={handleBlur}
                                >
                                </input>
                                {errors[key] && touched[key] && <span className={styles.error}>{`${errors[key]}`}</span>}
                            </>
                        )
                    })}
                </div>


                {screenEditable && <div className={styles.card__saveButton}>
                    <Button type='submit' variant='contained' color='primary' > Save</Button>
                </div>}


            </form >

        </div >
    );
}

export default Profile;