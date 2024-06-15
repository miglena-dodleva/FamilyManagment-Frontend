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
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import axiosApiInstance from '../../interceptors/axios';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function EditTaskDialog({ open, handleClose, taskId }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(0);
  const [deadline, setDeadline] = useState('');
  const [ownerId, setOwnerId] = useState('');
  const [assigneeId, setAssigneeId] = useState('');
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const fetchTaskData = useCallback(async () => {
    try {
      const { data } = await axiosApiInstance.get(`/api/Task/taskById/${taskId}`);
      setTitle(data.title);
      setDescription(data.description);
      setStatus(data.status);
      setDeadline(data.deadline);
      setOwnerId(data.ownerId);
      setAssigneeId(data.assigneeId);
    } catch (err) {
      console.error('Failed to fetch task data:', err);
      setError('Failed to fetch task data. Please try again.');
    }
  }, [taskId]);

  useEffect(() => {
    if (taskId) {
      fetchTaskData();
    }
  }, [taskId, fetchTaskData]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axiosApiInstance.get('/api/User/all');
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = async () => {
    setError(null);

    try {
      await axiosApiInstance.patch(`/api/Task/edit/${taskId}`, {
        title,
        description,
        status,
        deadline,
        ownerId,
        assigneeId
      });

      setTitle('');
      setDescription('');
      setStatus(0);
      setDeadline('');
      setOwnerId('');
      setAssigneeId('');
      handleClose();
    } catch (err) {
      setError('Failed to update task. Please try again.');
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
        Edit Task
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
          label="Task Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          label="Task Description"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          multiline
          rows={4}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Status</InputLabel>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <MenuItem value={0}>Pending</MenuItem>
            <MenuItem value={1}>In Progress</MenuItem>
            <MenuItem value={2}>Completed</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Deadline"
          type="datetime-local"
          fullWidth
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
          InputLabelProps={{
            shrink: true,
          }}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Owner</InputLabel>
          <Select
            value={ownerId}
            onChange={(e) => setOwnerId(e.target.value)}
            required
          >
            {users.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.firstName} {user.lastName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Assignee</InputLabel>
          <Select
            value={assigneeId}
            onChange={(e) => setAssigneeId(e.target.value)}
            required
          >
            {users.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.firstName} {user.lastName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
