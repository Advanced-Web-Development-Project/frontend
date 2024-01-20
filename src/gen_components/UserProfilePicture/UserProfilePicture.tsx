import React, { ReactNode } from 'react'
import { Avatar } from '@mui/material'
import styles from './index.module.css'

interface UserProfilePictureProps {
    src: string;
    alt: string;
    size?: 'small' | 'medium' | 'large';
    children?: ReactNode;
}

const UserProfilePicture: React.FC<UserProfilePictureProps> = ({ src, alt, size = 'medium', children }: UserProfilePictureProps) => {

    return (
        <Avatar alt={alt} src={src} className={styles.avatar} sizes={size}>
            {children}
        </Avatar>
    )
}

export default UserProfilePicture
