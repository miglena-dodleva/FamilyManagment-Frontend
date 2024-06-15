import React, { useState } from "react";
import { Box, Button, Modal, Typography, TextField } from "@mui/material";
import axiosApiInstance from "../../interceptors/axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function CreateToDoListModal({ open, handleClose }) {
  const [toDoListName, setToDoListName] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axiosApiInstance.post(
        "/api/ToDoList/create",
        {
          name: toDoListName,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      setToDoListName("");
      console.log("To-Do List created successfully:", response.data);
      handleClose(); // Close the modal after successful creation
    } catch (err) {
      setError("Failed to create to-do list. Please try again.");
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
          Create New To-Do List
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            label="To-Do List Name"
            fullWidth
            value={toDoListName}
            onChange={(e) => setToDoListName(e.target.value)}
            required
          />
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
            Create
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default CreateToDoListModal;
