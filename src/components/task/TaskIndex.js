import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosApiInstance from "../../interceptors/axios";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditTaskDialog from "./EditTaskDialog"; // Ensure this is created
import CreateTaskModal from "./CreateTaskModal"; // Ensure this is created

function TaskIndex() {
  const navigate = useNavigate();
  const { id: toDoListId } = useParams(); // Get the ToDoList ID from the URL
  const [tasks, setTasks] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, [toDoListId]);

  const fetchTasks = async () => {
    try {
      const { data } = await axiosApiInstance.get(`/api/Task/byToDoList/${toDoListId}`);
      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    }
  };

  const handleEdit = (taskId) => {
    setSelectedTaskId(taskId);
    setEditModalOpen(true);
  };

  const handleDelete = async (taskId) => {
    try {
      await axiosApiInstance.delete(`/api/Task/delete/${taskId}`);
      fetchTasks();
    } catch (error) {
      console.error("Failed to delete task", error);
    }
  };

  const handleCreateModalOpen = () => {
    setCreateModalOpen(true);
  };

  const handleCreateModalClose = () => {
    setCreateModalOpen(false);
    fetchTasks();
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
    setSelectedTaskId(null);
    fetchTasks();
  };

  return (
    <div>
      <div style={{ paddingTop: '5px', paddingBottom: '5px' }}>
        <Button variant="contained" color="primary" onClick={handleCreateModalOpen}>
          Create Task
        </Button>
      </div>
      <CreateTaskModal open={createModalOpen} handleClose={handleCreateModalClose} toDoListId={toDoListId} />
      <EditTaskDialog open={editModalOpen} handleClose={handleEditModalClose} taskId={selectedTaskId} />
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Deadline</TableCell>
              <TableCell>Owner</TableCell>
              <TableCell>Assignee</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>{new Date(task.deadline).toLocaleDateString()}</TableCell>
                <TableCell>{task.owner?.username}</TableCell>
                <TableCell>{task.assignee?.username}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(task.id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(task.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default TaskIndex;
