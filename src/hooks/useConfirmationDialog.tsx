import { useState } from 'react';

interface UseConfirmationDialogProps {
    initialOpen?: boolean;
}

interface ConfirmationDialogHookResult {
    open: boolean;
    handleOpen: () => void;
    handleClose: () => void;
}

const useConfirmationDialog = ({
    initialOpen = false,
}: UseConfirmationDialogProps = {}): ConfirmationDialogHookResult => {
    const [open, setOpen] = useState(initialOpen);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return {
        open,
        handleOpen,
        handleClose,
    };
};

export default useConfirmationDialog;