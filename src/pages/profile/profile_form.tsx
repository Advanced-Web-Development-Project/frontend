import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { ProfileFileds, getUpdatedFieldFromUser, initialProfileFields, profileOutput } from './service';
import { userUpdateSchema } from '../../validation';
import { useAuth } from '../../contexts/AuthContexts';
import { User } from '../../models/general';
import { updateUserAPI } from '../../api/user_api';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import TextInputField from '../../gen_components/TextInputField';

interface ProfileFormProps {
    screenEditable: boolean
}

function ProfileForm({ screenEditable }: ProfileFormProps) {

    const [oldProfileFields, setOldProfileFields] = useState<ProfileFileds>(initialProfileFields)
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [selectedImageFileName, setSelctedImageFileName] = useState('')

    const { accessToken, user, logout } = useAuth()

    const navigate = useNavigate();

    useEffect(() => {

        if (!user) return

        const { email, name, username, avatar } = user
        setOldProfileFields({ email, name, username, avatar: null })
    }, [])

    const { values, handleBlur, handleChange, handleSubmit, errors, touched, setFieldValue } = useFormik<ProfileFileds>({
        initialValues: oldProfileFields,
        validationSchema: userUpdateSchema,
        enableReinitialize: true,
        onSubmit: async (user: Partial<ProfileFileds>) => {

            const updatedUser = getUpdatedFieldFromUser(oldProfileFields, values, imageFile);

            if (Object.keys(updatedUser).length === 0 || !accessToken) return

            try {

                const response: any = await updateUserAPI(oldProfileFields.username, accessToken, updatedUser)
                console.log("USER : ", response)

            } catch (error: any) {
                const errorMessage = error.response.data.message
                console.log(error)
            }
        },
    })


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const files = event.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            setImageFile(file);
            setSelctedImageFileName(file.name)
        }
    };

    console.log(values)


    return (
        <form onSubmit={handleSubmit}>

            <div style={{ marginTop: 60, paddingBottom: 20, display: 'flex', flexDirection: 'column' }}>

                {profileOutput.map(({ key, type, desc, accept }) => {

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
                            onChange={type === 'text' ? handleChange : handleFileChange}
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
