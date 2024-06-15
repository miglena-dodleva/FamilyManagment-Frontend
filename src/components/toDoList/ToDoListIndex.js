import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add"; // Import Add Icon
import CreateToDoListModal from "./CreateToDoListModal";
import EditToDoListDialog from "./EditToDoListDialog";
import CreateTaskModal from "../task/CreateTaskModal"

function ToDoListIndex() {
  const [toDoLists, setToDoLists] = useState([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedToDoListId, setSelectedToDoListId] = useState(null);
  const [taskModalOpen, setTaskModalOpen] = useState(false); // State for task modal
  const navigate = useNavigate();

  useEffect(() => {
    fetchToDoLists();
  }, []);

  const fetchToDoLists = async () => {
    try {
      const { data } = await axiosApiInstance.get("/api/ToDoList/all");
      setToDoLists(data);
    } catch (error) {
      console.error("Failed to fetch To-Do Lists", error);
    }
  };

  const handleEdit = (id) => {
    setSelectedToDoListId(id);
    setEditModalOpen(true);
    //navigate(`/ToDoList/toDoListById/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axiosApiInstance.delete(`/api/ToDoList/delete/${id}`);
      fetchToDoLists();
    } catch (error) {
      console.error("Failed to delete To-Do List", error);
    }
  };

  const handleViewTasks = (id) => {
    navigate(`/ToDoList/${id}/tasks`);
  };

  const handleCreateModalOpen = () => {
    setCreateModalOpen(true);
  };

  const handleCreateModalClose = () => {
    setCreateModalOpen(false);
    fetchToDoLists();
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
    setSelectedToDoListId(null);
    fetchToDoLists();
  };

  const handleTaskModalOpen = (id) => {
    setSelectedToDoListId(id);
    setTaskModalOpen(true);
  };

  const handleTaskModalClose = () => {
    setTaskModalOpen(false);
    setSelectedToDoListId(null);
    fetchToDoLists();
  };

  return (
    <div >
      <div style={{ paddingTop: '5px', paddingBottom: '5px' }}>
      <Button  variant="contained" color="primary" onClick={handleCreateModalOpen}>
        Create To-Do List
      </Button>
      </div>
      <CreateToDoListModal open={createModalOpen} handleClose={handleCreateModalClose} />
      <EditToDoListDialog open={editModalOpen} handleClose={handleEditModalClose} toDoListId={selectedToDoListId} />
      <CreateTaskModal open={taskModalOpen} handleClose={handleTaskModalClose} toDoListId={selectedToDoListId} />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Task Count</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {toDoLists.map((list) => (
              <TableRow key={list.id}>
                <TableCell>{list.name}</TableCell>
                <TableCell>{list.tasks ? list.tasks.count : 0}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(list.id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(list.id)}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton onClick={() => handleViewTasks(list.id)}>
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton onClick={() => handleTaskModalOpen(list.id)}>
                    <AddIcon />
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

export default ToDoListIndex;
