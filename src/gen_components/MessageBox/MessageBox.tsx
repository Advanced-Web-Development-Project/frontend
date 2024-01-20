import React, { useState } from 'react'
import { useErrorContext } from '../../contexts/ErrorContext'
import styles from './index.module.css'
import { Alert } from '@mui/material'

interface MessageBoxProps {

}
const MessageBox: React.FC<MessageBoxProps> = () => {

    const { error } = useErrorContext()
    const [show, setShow] = useState(false);


    return (
        <>
            {error !== null &&
                <div className={styles.alert_container}>
                    <Alert className={styles.alert} severity={error.seveirity}><span>{error.message}</span></Alert>
                </div>}
        </>
    )
}

export default MessageBox
