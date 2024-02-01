import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { deletePostAPI } from '../../api/post_api';
import { useAuth } from '../../contexts/AuthContexts';
import { useNavigate } from 'react-router-dom';
import { useErrorContext } from '../../contexts/ErrorContext';
import { TextMessages } from '../../contants/message_error';

interface ConfirmationDialogProps {
  children?: React.ReactNode;
  open: boolean;
  message: string;
  postId: string,
  onAccept: () => void;
  onCancel: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  message,
  onAccept,
  onCancel,
  postId,
}) => {

  const { deletePostMessage } = TextMessages
  const { accessToken } = useAuth()
  const navigate = useNavigate()
  const { setErrorMessage, setSuccessMessage, setWarningMessage } = useErrorContext()

  const handleAccept = async () => {
    // debugger;
    if (!accessToken) return
    // delete post
    try {
      setWarningMessage(deletePostMessage.warning)
      const response = await deletePostAPI(postId, accessToken)
      setTimeout(() => {
        setSuccessMessage(deletePostMessage.success)
        onAccept();
      }, 1500)

    } catch (err) {
      setErrorMessage(deletePostMessage.error)
    }
  }



  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>Confirmation</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAccept} color="primary">
          Accept
        </Button>
        <Button onClick={onCancel} color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;