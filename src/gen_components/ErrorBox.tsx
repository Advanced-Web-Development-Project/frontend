import { Alert } from '@mui/material';
import React from 'react';


interface ErrorBoxProps {
    status: string
}



const ErrorBox: React.FC<ErrorBoxProps> = ({ }) => {
    return (
        <Alert severity="error">This is an error alert — check it out!</Alert>
    );
}



export default ErrorBox;