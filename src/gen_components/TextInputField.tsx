import React, { FocusEvent } from 'react'

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
    type: 'text' | 'file'

}

function TextInputField({ id, disabled, value, onChange, onBlur, isErrored, errorMessage, description, type, accept = '' }: InputFieldProps) {

    return (
        <>
            <div style={{ padding: 10, fontWeight: 'bold', color: 'rgba(221, 140, 64, 0.726)' }}>{description}</div>
            <input
                accept={accept}
                type={type}
                id={id}
                style={{ width: 400, height: 30, borderRadius: 30, border: '1px solid rgb(130, 153, 231);', padding: 10, fontSize: 14 }}
                disabled={disabled}
                onChange={onChange}
                value={value}
                onBlur={onBlur}
            >
            </input >
            {isErrored && <span style={{}}>{`${errorMessage}`}</span>}
        </>
    )
}

export default TextInputField
