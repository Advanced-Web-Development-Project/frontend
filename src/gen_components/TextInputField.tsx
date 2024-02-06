import React, { FocusEvent, useState } from 'react'

interface InputFieldProps {

    id: string,
    disabled: boolean,
    value: string,
    onChange: (e: React.ChangeEvent<any>) => void,
    onBlur: (e: FocusEvent<any, Element>) => void,
    isErrored: boolean,
    errorMessage: string | undefined,
    description: string,
    accept?: string,
    type: 'text' | 'file' | 'password'

}

function TextInputField({ id, disabled, value, onChange, onBlur, isErrored, errorMessage, description, type, accept = '' }: InputFieldProps) {

    const [isHovered, setIsHovered] = useState(false);

    const inputStyle = { width: 400, height: 30, backgroundColor: "white", padding: 15, fontSize: 14 }
    const borderStyle = { borderRadius: 10, border: isHovered ? '2px solid black' : '2px solid gray' }

    const style = type === 'file' ? inputStyle : { ...inputStyle, ...borderStyle }

    return (
        <>
            <div style={{ padding: 10, fontWeight: 'bold', color: 'rgba(221, 140, 64, 0.726)' }}>{description}</div>
            <input
                accept={accept}
                type={type}
                id={id}
                style={style}
                disabled={disabled}
                onChange={onChange}
                value={value}
                onBlur={onBlur}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
            </input >
            {isErrored && <span style={{}}>{`${errorMessage}`}</span>}
        </>
    )
}

export default TextInputField
