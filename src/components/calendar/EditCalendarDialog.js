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

function EditCalendarDialog({ open, handleClose, calendarId }) {
  const [calendarName, setCalendarName] = useState('');
  const [error, setError] = useState(null);

  const fetchCalendarData = useCallback(async () => {
    if (!calendarId) return;

    try {
      const { data } = await axiosApiInstance.get(`/api/Calendar/calendarById/${calendarId}`);
      setCalendarName(data.data.name);
    } catch (err) {
      console.error('Failed to fetch calendar data:', err);
      setError('Failed to fetch calendar data. Please try again.');
    }
  }, [calendarId]);

  useEffect(() => {
    if (open) {
      fetchCalendarData();
    }
  }, [open, fetchCalendarData]);

  const handleSubmit = async () => {
    setError(null);

    try {
      await axiosApiInstance.patch(`/api/Calendar/edit/${calendarId}`, {
        name: calendarName,
      });

      setCalendarName('');
      handleClose();
    } catch (err) {
      setError('Failed to update calendar. Please try again.');
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
        Edit {calendarName}
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
          label="Calendar Name"
          fullWidth
          value={calendarName}
          onChange={(e) => setCalendarName(e.target.value)}
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

export default EditCalendarDialog;
