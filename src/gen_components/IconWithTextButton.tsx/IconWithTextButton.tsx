import React, { MouseEvent, ReactNode } from 'react'
import styles from './index.module.css'
import { IconButton } from '@mui/material'

interface IconWithTextButtonProps {
    children: ReactNode
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void,
    text: string
}


const IconWithTextButton: React.FC<IconWithTextButtonProps> = ({ children, onClick, text }: IconWithTextButtonProps) => {
    return (
        <div className={styles.main}>
            <IconButton className={styles.icon} onClick={onClick}>
                {children}
                <div className={styles.text}>
                    {text}
                </div>
            </IconButton>

        </div>

    )
}

export default IconWithTextButton

