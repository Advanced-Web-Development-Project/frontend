import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { ProfileFileds, getProfileOutput, getUpdatedFieldFromUser, initialProfileFields } from './service';
import { userUpdateSchema } from '../../validation';
import { useAuth } from '../../contexts/AuthContexts';
import { HttpErrorResponse, User } from '../../models/general';
import { updateUserAPI } from '../../api/user_api';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import TextInputField from '../../gen_components/TextInputField';
import { useErrorContext } from '../../contexts/ErrorContext';
import { TextMessages } from '../../contants/message_error';

interface ProfileFormProps {
    screenEditable: boolean,
    setScreenEditable: React.Dispatch<React.SetStateAction<boolean>>
}

function ProfileForm({ screenEditable, setScreenEditable }: ProfileFormProps) {

    const [oldProfileFields, setOldProfileFields] = useState<ProfileFileds>(initialProfileFields)
    const [imageFile, setImageFile] = useState<File | null>(null)

    const { user, setUser } = useAuth()
    const { setSuccessMessage, setErrorMessage } = useErrorContext()
    const { updateUserMessage } = TextMessages

    useEffect(() => {

        if (!user) return

        const { email, name, username } = user
        setOldProfileFields({ email, name, username, avatar: null, password: "" })
    }, [])

    const { values, handleBlur, handleChange, handleSubmit, errors, touched, setFieldValue } = useFormik<ProfileFileds>({
        initialValues: oldProfileFields,
        validationSchema: userUpdateSchema,
        enableReinitialize: true,
        onSubmit: async (user: Partial<ProfileFileds>) => {

            const updatedUser = getUpdatedFieldFromUser(oldProfileFields, values, imageFile);

            if (Object.keys(updatedUser).length === 0) {
                setErrorMessage('You forgot to update... :)')
                return
            }

            try {
                const user: User = await updateUserAPI(oldProfileFields.username, updatedUser)
                setUser(user)
                setSuccessMessage(updateUserMessage.success)
                setScreenEditable(false)

            } catch (err: any) {
                const error: HttpErrorResponse = err
                setErrorMessage(error.response.data.errors[0])
            }
        },
    })


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            setImageFile(file);
        }
    };

    const profileFormFields = getProfileOutput(user!.provider)

    return (
        <form onSubmit={handleSubmit}>

            <div style={{ marginTop: 60, paddingBottom: 20, display: 'flex', flexDirection: 'column' }}>

                {profileFormFields.map(({ key, type, desc, accept }) => {

                    return (
                        <TextInputField
                            type={type}
                            accept={accept}
                            id={key}
                            value={values[key]}
                            description={desc}
                            disabled={!screenEditable}
                            isErrored={(errors[key] !== undefined && touched[key] !== undefined)}
                            errorMessage={errors[key] as string | undefined}
                            onBlur={handleBlur}
                            onChange={type === 'text' || type === 'password' ? handleChange : handleFileChange}
                        />
                    )
                })}


            </div>


            {screenEditable && <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Button type='submit' variant='contained' color='primary' > Save</Button>
            </div>}


        </form >
    )
}

export default ProfileForm
