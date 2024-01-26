import React from 'react'

interface ProfileHeaderProps {
    name: string,
    email: string
}
function ProfileHeader({ email, name }: ProfileHeaderProps) {
    return (
        <div>
            <div style={{ fontSize: 45, fontWeight: 'bold' }}> {name}</div>
            <div style={{ color: '#0288d1' }}>{email}</div>
        </div>
    )
}

export default ProfileHeader
