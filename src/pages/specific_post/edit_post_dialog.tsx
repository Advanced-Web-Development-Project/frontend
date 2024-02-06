import React, { useState } from 'react'
import DialogWrapper from '../../gen_components/DialogWrapper'
import EditPost from './edit_post'
import { Post } from '../../models/general'

interface EditPostDialogProps {
    post: Post
}
function EditPostDialog({ post }: EditPostDialogProps) {

    const [open, setOpen] = useState(false)
    const handleClose = () => {
        setOpen(false)
    }


    return (
        <>
            <DialogWrapper {...{ open, handleClose }}>
                <EditPost {...{ handleClose }} />
            </DialogWrapper>
        </>
    )
}


export default EditPostDialog
