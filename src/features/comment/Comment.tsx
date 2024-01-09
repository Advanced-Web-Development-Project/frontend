import React from 'react'
import styles from './index.module.css'

interface CommentProps {
}

export default function Comment({ }: CommentProps) {
    return (
        <div className={styles.container}>
            <div className={styles.user}> ofek.glazer123 </div>
            <div className={styles.text}> This is a comment content</div>
        </div>
    )
}
