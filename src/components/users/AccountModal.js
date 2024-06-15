// src/components/user/AccountModal.js
import React, { useState, useEffect } from 'react';
import { Box, Button, Modal, Typography, IconButton } from '@mui/material';
import axiosApiInstance from '../../interceptors/axios';
import CloseIcon from '@mui/icons-material/Close';

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

const familyRoleMapping = {
  0: 'Admin',
  1: 'Member'
};


function AccountModal({ open, handleClose }) {
  const [userData, setUserData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setError(null);
      try {
        const userId = localStorage.getItem("userId");
        const { data: userData } = await axiosApiInstance.get(`/api/User/userById/${userId}`);

        setUserData(userData.data);
      } catch (err) {
        setError("Failed to fetch user data. Please try again.");
        console.error(err);
      }
    };

    if (open) {
      fetchUserData();
    }
  }, [open]);
  
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-title" variant="h6" component="h2">
          User Account
        </Typography>
        <IconButton onClick={handleClose} style={{ position: 'absolute', right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
        {error && <Typography color="error">{error}</Typography>}
        {userData ? (
          <Box>
            <Typography variant="body1"><strong>First Name:</strong> {userData.firstName}</Typography>
            <Typography variant="body1"><strong>Last Name:</strong> {userData.lastName}</Typography>
            <Typography variant="body1"><strong>Email:</strong> {userData.email}</Typography>
            <Typography variant="body1"><strong>Username:</strong> {userData.username}</Typography>
            <Typography variant="body1"><strong>Phone Number:</strong> {userData.phoneNumber}</Typography>
            <Typography variant="body1"><strong>Family Role:</strong> {familyRoleMapping[userData.familyRole]}</Typography>
          </Box>
        ) : (
          !error && <Typography>Loading...</Typography>
        )}
        <Button
          type="button"
          fullWidth
          variant="contained"
          onClick={handleClose}
          sx={{ mt: 2 }}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
}

export default AccountModal;
