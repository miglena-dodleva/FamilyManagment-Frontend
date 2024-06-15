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
import CreateFamilyModal from "./CreateFamilyModal";
import EditFamilyDialog from "./EditFamilyDialog.js";

function FamilyIndex() {
  const [families, setFamilies] = useState([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedFamilyId, setSelectedFamilyId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFamilies();
  }, []);

  const fetchFamilies = async () => {
    try {
      const { data } = await axiosApiInstance.get("/api/Family/all");
      setFamilies(data);
    } catch (error) {
      console.error("Failed to fetch Families", error);
    }
  };

  const handleEdit = (id) => {
    setSelectedFamilyId(id);
    setEditModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axiosApiInstance.delete(`/api/Family/delete/${id}`);
      fetchFamilies();
    } catch (error) {
      console.error("Failed to delete Family", error);
    }
  };

  const handleViewUsers = (id) => {
    navigate(`/api/Family/${id}/users`);
  };

  const handleCreateModalOpen = () => {
    setCreateModalOpen(true);
  };

  const handleCreateModalClose = () => {
    setCreateModalOpen(false);
    fetchFamilies();
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
    setSelectedFamilyId(null);
    fetchFamilies();
  };

  return (
    <div>
      <div style={{ paddingTop: '5px', paddingBottom: '5px' }}></div>
      <Button variant="contained" color="primary" onClick={handleCreateModalOpen}>
        Create Family
      </Button>
      <div/>
      <CreateFamilyModal open={createModalOpen} handleClose={handleCreateModalClose} />
      <EditFamilyDialog open={editModalOpen} handleClose={handleEditModalClose} familyId={selectedFamilyId} />
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Members Count</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {families.map((family) => (
              <TableRow key={family.id}>
                <TableCell>{family.name}</TableCell>
                <TableCell>{family.users ? family.users.length : 0}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(family.id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(family.id)}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton onClick={() => handleViewUsers(family.id)}>
                    <VisibilityIcon />
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

export default FamilyIndex;
