import { Button } from '@mui/material'
import no_image from "./../../pictures/no_image.jpg"
import { deleteUserAPI, deleteUserImageAPI, updateUserAPI } from '../../api/user_api'
import { HttpErrorResponse, User } from '../../models/general'
import { useAuth } from '../../contexts/AuthContexts'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useErrorContext } from '../../contexts/ErrorContext'

interface ProfileImage {
    setScreenEditable: React.Dispatch<React.SetStateAction<boolean>>
}

function ProfileImage({ setScreenEditable }: ProfileImage) {

    const { user, setUser } = useAuth()
    const { setSuccessMessage, setErrorMessage } = useErrorContext()

    // const { imagePath, setImagePath } = useState()

    const navigate = useNavigate();
    // const [] = useState()

    if (!user) return <></>

    const handleEditClick = () => {
        setScreenEditable(screen => !screen)
    }

    const handleDleteImageClick = async () => {
        try {
            const user = await deleteUserImageAPI()
            setUser(user)
            setSuccessMessage('Image deleted :)')
        } catch (err: any) {
            const error: HttpErrorResponse = err
            setErrorMessage(error.response.data.errors[0])
        }

    }

    const computedImagePath = `${process.env.REACT_APP_SERVER_URL_DEV}/${user.avatar}`

    return (

        <div style={{ paddingRight: 30, display: 'flex', flexDirection: 'column' }}>
            <img
                style={{ width: 200, height: 130, borderRadius: 25 }}
                src={computedImagePath}
                alt="Circular Avatar"
            />
            <div style={{ marginTop: 10, display: 'flex', gap: 10, justifyContent: "center" }}>
                <Button variant='contained' color='primary' size='small' style={{ marginLeft: 10 }} onClick={handleEditClick}>Edit</Button>
                <Button variant='contained' color='error' size='small' style={{ marginLeft: 10 }} onClick={handleDleteImageClick}>Remove</Button>
            </div>
        </div>
    )
}

export default ProfileImage
