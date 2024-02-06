import { Button } from '@mui/material'
import React, { useState } from 'react'
import DialogWrapper from '../../gen_components/DialogWrapper'
import { Post } from '../../models/general'
import EditPost from './edit_post'

interface EditPostButtonProps {
}

function EditPostButton({ }: EditPostButtonProps) {

    const [open, setOpen] = useState(false)

    const handleClose = () => {
        setOpen(false)
    }
    const handleOpen = () => {
        setOpen(true)
    }


    return (
        <>
            <Button onClick={handleOpen}>Edit Post</Button>
            <DialogWrapper {...{ open, handleClose }}>
                <EditPost {...{ handleClose }} />
            </DialogWrapper>
        </>
    )
}

export default EditPostButton
