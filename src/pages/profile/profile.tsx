import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContexts';
import styles from './index.module.css'
import ProfileHeader from './profile_header';
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
    const { user, logout } = useAuth()


    if (!user) return <></>

    const { avatar, name, email } = user

    return (
        <div className={styles.card}>

            <div className={styles.card__header}>
                <ProfileHeader {...{ name, email }}></ProfileHeader>
                <ProfileImage {...{ setScreenEditable, imagePath: avatar }}></ProfileImage>
            </div>

            <ProfileForm {...{ screenEditable, setScreenEditable }}></ProfileForm>

        </div>

    );
}

export default Profile;