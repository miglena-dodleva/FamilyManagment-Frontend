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
import CreateCalendarModal from "./CreateCalendarModal";
import EditCalendarDialog from "./EditCalendarDialog";

function CalendarIndex() {
  const [calendars, setCalendars] = useState([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedCalendarId, setSelectedCalendarId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCalendars();
  }, []);

  const fetchCalendars = async () => {
    try {
      const { data } = await axiosApiInstance.get("/api/Calendar/all");
      setCalendars(data);
    } catch (error) {
      console.error("Failed to fetch Calendars", error);
    }
  };

  const handleEdit = (id) => {
    setSelectedCalendarId(id);
    setEditModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axiosApiInstance.delete(`/api/Calendar/delete/${id}`);
      fetchCalendars();
    } catch (error) {
      console.error("Failed to delete Calendar", error);
    }
  };

  const handleViewEvents = (id) => {
    navigate(`/api/Calendar/${id}/events`);
  };

  const handleCreateModalOpen = () => {
    setCreateModalOpen(true);
  };

  const handleCreateModalClose = () => {
    setCreateModalOpen(false);
    fetchCalendars();
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
    setSelectedCalendarId(null);
    fetchCalendars();
  };

  return (
    <div>
      <div style={{ paddingTop: '5px', paddingBottom: '5px' }}></div>
      <Button variant="contained" color="primary" onClick={handleCreateModalOpen}>
        Create Calendar
      </Button>
      <div/>
      <CreateCalendarModal open={createModalOpen} handleClose={handleCreateModalClose} />
      <EditCalendarDialog open={editModalOpen} handleClose={handleEditModalClose} calendarId={selectedCalendarId} />
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Event Count</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {calendars.map((calendar) => (
              <TableRow key={calendar.id}>
                <TableCell>{calendar.name}</TableCell>
                <TableCell>{calendar.events ? calendar.events.length : 0}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(calendar.id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(calendar.id)}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton onClick={() => handleViewEvents(calendar.id)}>
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

export default CalendarIndex;
