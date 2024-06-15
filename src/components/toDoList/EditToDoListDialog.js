import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axiosApiInstance from '../../interceptors/axios';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function EditToDoListDialog({ open, handleClose, toDoListId }) {
  const [toDoListName, setToDoListName] = useState('');
  const [error, setError] = useState(null);

  const fetchToDoListData = useCallback(async () => {
    if (!toDoListId) return;

    try {
      const { data } = await axiosApiInstance.get(`/api/ToDoList/toDoListById/${toDoListId}`);
      setToDoListName(data.data.name);
    } catch (err) {
      console.error('Failed to fetch to-do list data:', err);
      setError('Failed to fetch to-do list data. Please try again.');
    }
  }, [toDoListId]);

  useEffect(() => {
    if (open) {
      fetchToDoListData();
    }
  }, [open, fetchToDoListData]);

  const handleSubmit = async () => {
    setError(null);

    try {
      await axiosApiInstance.patch(`/api/ToDoList/edit/${toDoListId}`, {
        name: toDoListName,
      });

      setToDoListName('');
      handleClose();
    } catch (err) {
      setError('Failed to update to-do list. Please try again.');
      console.error(err);
    }
  };

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Edit {toDoListName}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <TextField
          label="To-Do List Name"
          fullWidth
          value={toDoListName}
          onChange={(e) => setToDoListName(e.target.value)}
          required
        />
        {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleSubmit}>
          Save changes
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}
