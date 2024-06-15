import React, { useState } from 'react';
import { Box, Button, Modal, Typography, TextField } from '@mui/material';
import axiosApiInstance from "../../interceptors/axios";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

function CreateCalendarModal({ open, handleClose }) {
  const [calendarName, setCalendarName] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const data = await axiosApiInstance.post('/api/Calendar/create', {
        name: calendarName,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        }
      });

      setCalendarName('');
      console.log('Calendar created successfully:', data);
      handleClose();
      
    } catch (err) {
      setError('Failed to create calendar. Please try again.');
      console.error(err);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-title" variant="h6" component="h2">
          Create New Calendar
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            label="Calendar Name"
            fullWidth
            value={calendarName}
            onChange={(e) => setCalendarName(e.target.value)}
            required
          />
          {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
          >
            Create
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default CreateCalendarModal;
