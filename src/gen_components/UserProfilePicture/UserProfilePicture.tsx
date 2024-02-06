import React, { ReactNode } from 'react'
import { Avatar } from '@mui/material'
import styles from './index.module.css'

interface UserProfilePictureProps {
    avatar: string
    src: string;
    alt: string;
    size?: 'small' | 'medium' | 'large';
    children?: ReactNode;
}

const UserProfilePicture: React.FC<UserProfilePictureProps> = ({ src, alt, size = 'medium', children, avatar }: UserProfilePictureProps) => {

    const computedImagePath = `${process.env.REACT_APP_SERVER_URL_DEV}/${avatar}`

    return (
        <Avatar alt={alt} src={computedImagePath} className={styles.avatar} sizes={size}>
            {children}
        </Avatar>
    )
}

export default UserProfilePicture
