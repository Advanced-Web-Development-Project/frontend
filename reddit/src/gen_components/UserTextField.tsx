import React, { ChangeEvent } from 'react';

import { TextField } from "@mui/material"

interface UserTextFieldProps {
    width?: number,
    height?: number,
    placeHolder: string,
    value: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    type?: string,
}



const UserTextField: React.FC<UserTextFieldProps> = ({ height, width, placeHolder, onChange, value, type }) => {
    return (
        <input
            className=''
            placeholder={placeHolder}
            onChange={onChange}
            value={value}
            type={type}
        >

        </input>

    );
}

UserTextField.defaultProps = {
    height: 20,
    width: 250,
    type: "string"
}



export default UserTextField;