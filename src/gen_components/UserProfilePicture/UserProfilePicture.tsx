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

    const computedImagePath = `http://localhost:8000/${avatar}`

    return (
        <Avatar alt={alt} src={computedImagePath} className={styles.avatar} sizes={size}>
            {children}
        </Avatar>
    )
}

export default UserProfilePicture
