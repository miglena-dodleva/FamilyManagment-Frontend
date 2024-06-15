import React, { useState } from 'react';
import { Box, Button, Modal, Typography, TextField } from '@mui/material';
import axiosApiInstance from '../../interceptors/axios'; 


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

function CreateFamilyModal({ open, handleClose }) {
  const [familyName, setFamilyName] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const data = await axiosApiInstance.post('/api/Family/create', {
        name: familyName,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        }
      });

      setFamilyName('');
      console.log('Family created successfully:', data);
      handleClose(); // Close the modal after successful creation
    } catch (err) {
      setError('Failed to create family. Please try again.');
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
          Create New Family
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            label="Family Name"
            fullWidth
            value={familyName}
            onChange={(e) => setFamilyName(e.target.value)}
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

export default CreateFamilyModal;