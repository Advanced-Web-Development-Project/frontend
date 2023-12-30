import { Alert, Dialog } from '@mui/material';
import React, { ReactNode } from 'react';
import styles from './index.module.css'
import { useDialogContext } from '../../contexts/PageContext';
import { DialogPage } from '../../models/general';
import { useErrorContext } from '../../contexts/ErrorContext';


interface DialogConatinerProps {
    children?: ReactNode;
}



const DialogConatiner: React.FC<DialogConatinerProps> = ({ children }: DialogConatinerProps) => {


    const { page, setPage } = useDialogContext()

    const toOpen = page !== DialogPage.None

    return (

        <>
            <Dialog className={styles.container} open={toOpen} onClose={() => setPage(DialogPage.None)}>
                {children}
            </Dialog>


        </>
    );
}



export default DialogConatiner;