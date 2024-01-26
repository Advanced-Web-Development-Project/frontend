import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContexts';
import styles from './index.module.css'

import { Button, IconButton } from '@mui/material';
import { useFormik } from 'formik';
import { userUpdateSchema } from '../../validation';
import { DialogPage, User, UserOS } from '../../models/general';
import { useErrorContext } from '../../contexts/ErrorContext';
import { deleteUserAPI, updateUserAPI } from '../../api/user_api';
import { useNavigate } from 'react-router-dom';
import { profileOutput } from './service';
import ProfileHeader from './profile_header';
import Profile_Image from './profle_image';
import ProfileImage from './profle_image';
import ProfileForm from './profile_form';


type ProfileFileds = {
    username: string;
    email: string;
    name: string;
    // password: string;
    avatar: File | null;
    [key: string]: any;
}

const initialProfileFields: ProfileFileds = {
    email: "",
    name: "",
    username: "",
    avatar: null
}

function Profile() {

    const [screenEditable, setScreenEditable] = useState(false)
    const { accessToken, user, logout } = useAuth()


    if (!user || !accessToken) return <></>

    const { avatar, name, email } = user

    console.log(user)

    return (
        <div className={styles.card}>

            <div className={styles.card__header}>
                <ProfileHeader {...{ name, email }}></ProfileHeader>
                <ProfileImage {...{ setScreenEditable, imagePath: avatar }}></ProfileImage>
            </div>

            <ProfileForm {...{ screenEditable }}></ProfileForm>

        </div>

    );
}

export default Profile;