import { Button } from '@mui/material'
import React from 'react'
import IconWithTextButton from '../../gen_components/IconWithTextButton.tsx/IconWithTextButton'
import { DeleteForever } from '@mui/icons-material'
import { deleteUserAPI } from '../../api/user_api'
import { useAuth } from '../../contexts/AuthContexts'
import { useNavigate } from 'react-router-dom'
import ConfirmationDialog from '../specific_post/delete_post_alert'
import { useDialogContext } from '../../contexts/PageContext'
import { DialogPage } from '../../models/general'

interface ProfileHeaderProps {
    name: string,
    email: string
}
function ProfileHeader({ email, name }: ProfileHeaderProps) {

    const { user, logout } = useAuth()
    const { page, setPage } = useDialogContext()
    const navigate = useNavigate()

    if (!user) return <></>

    const handleDleteUserClick = async () => {
        try {
            const res = await deleteUserAPI(user.id)
            logout();
            setPage(DialogPage.None)
        } catch (error) {
        }

    }

    return (
        <div>
            <div style={{ fontSize: 45, fontWeight: 'bold' }}> {name}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ color: '#0288d1' }}>{email}</div>
                <IconWithTextButton onClick={handleDleteUserClick} text='Delete User'>
                    <DeleteForever></DeleteForever>
                </IconWithTextButton>
            </div>
        </div>
    )
}

export default ProfileHeader
