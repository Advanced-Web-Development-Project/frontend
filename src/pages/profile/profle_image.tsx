import { Button } from '@mui/material'
import no_image from "./../../pictures/no_image.jpg"
import { deleteUserAPI } from '../../api/user_api'
import { User } from '../../models/general'
import { useAuth } from '../../contexts/AuthContexts'
import { useNavigate } from 'react-router-dom'

interface ProfileImage {
    imagePath: string,
    setScreenEditable: React.Dispatch<React.SetStateAction<boolean>>
}

function ProfileImage({ setScreenEditable, imagePath }: ProfileImage) {

    const { accessToken, user, logout } = useAuth()

    const navigate = useNavigate();

    if (!user || !accessToken) return <></>

    console.log(user.avatar, "avatar ")

    const handleEditClick = () => {
        setScreenEditable(screen => !screen)
    }

    const handleDleteClick = async () => {
        try {
            const res = await deleteUserAPI(user.id, accessToken)
            logout();
            navigate(-1)
        } catch (error) {
            console.log(error)
        }

    }

    const computedImagePath = `http://localhost:8000/${user.avatar}`

    return (

        <div style={{ paddingRight: 30, display: 'flex', flexDirection: 'column' }}>
            <img
                style={{ width: 200, height: 130, borderRadius: 25 }}
                src={computedImagePath}
                alt="Circular Avatar"
            />
            <div style={{ marginTop: 10, display: 'flex', gap: 10, justifyContent: "center" }}>
                <Button variant='contained' color='primary' size='small' style={{ marginLeft: 10 }} onClick={handleEditClick}>Edit</Button>
                <Button variant='contained' color='error' size='small' style={{ marginLeft: 10 }} onClick={handleDleteClick}>Remove</Button>
            </div>
        </div>
    )
}

export default ProfileImage
