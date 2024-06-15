import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axiosApiInstance from "../../interceptors/axios";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton'; 
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonAddIcon from '@mui/icons-material/PersonAdd';


import AccountModal from "../users/AccountModal";

import CreateFamilyModal from "../family/CreateFamilyModal";
import CreateCalendarModal from "../calendar/CreateCalendarModal";
import CreateToDoListModal from "../toDoList/CreateToDoListModal";


const settings = ['Account', 'Logout'];

function randomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: randomColor(),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1] ? name.split(' ')[1][0] : ''}`,
  };
}

function Navigation() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElCalendar, setAnchorElCalendar] = useState(null);
  const [anchorElFamily, setAnchorElFamily] = useState(null);
  const [anchorElToDoList, setAnchorElToDoList] = useState(null);
  const [modalOpen, setModalOpen] = useState({});
  const [accountModalOpen, setAccountModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('userId');
    setIsAuthenticated(!!token);
    // Replace with actual user name retrieval logic

    if (token && userId) {
      const fetchUserFullName = async () => {
        try {
          const { data } = await axiosApiInstance.get(`/api/User/userById/${userId}`);
          setUserName(`${data.firstName} ${data.lastName}`);
        } catch (error) {
          console.error("Failed to fetch user data", error);
        }
      };
      fetchUserFullName();
     } // Replace 'User Name' with the actual logic to get the user name
  }, [isAuthenticated]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleOpenCalendarMenu = (event) => {
    setAnchorElCalendar(event.currentTarget);
  };
  const handleOpenFamilyMenu = (event) => {
    setAnchorElFamily(event.currentTarget);
  };

  const handleOpenToDoListMenu = (event) => {
    setAnchorElToDoList(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleCloseCalendarMenu = () => {
    setAnchorElCalendar(null);
  };
  const handleCloseFamilyMenu = () => {
    setAnchorElFamily(null);
  };
  
  const handleCloseToDoListMenu = () => {
    setAnchorElToDoList(null);
  };

  const handleTitleClick = () => {
    navigate('/home');
  };

  const handleAccountModalOpen = () => {
    setAccountModalOpen(true);
  };

  const handleAccountModalClose = () => {
    setAccountModalOpen(false);
  }; 

  const handleModalOpen = (type) => {
    setModalOpen((prev) => ({ ...prev, [type]: true }));
    console.log('Modal Open State:', modalOpen); // Debugging line
  };

  const handleModalClose = (type) => {
    setModalOpen((prev) => ({ ...prev, [type]: false }));
  };


  const logout = async () => {
    await axiosApiInstance.post("api/Auth/revoke", {
      accessToken: localStorage.getItem("accessToken"),
      refreshToken: localStorage.getItem("refreshToken"),
      userId: localStorage.getItem("userId"),
    });
    localStorage.clear();
    setIsAuthenticated(false);
    navigate('/login');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                flexGrow: 1,
              }}
              onClick={handleTitleClick}
            >
              My Family Management
            </Typography>
            {isAuthenticated && (
              <>
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                      display: { xs: 'block', md: 'none' },
                    }}
                  >
                    <MenuItem onClick={handleCloseNavMenu} component="a" href="/home">
                      <Typography textAlign="center">Home</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleOpenCalendarMenu}>
                      <Typography textAlign="center">Calendars</Typography>
                    </MenuItem>
                    <Menu
                      id="calendar-menu"
                      anchorEl={anchorElCalendar}
                      open={Boolean(anchorElCalendar)}
                      onClose={handleCloseCalendarMenu}
                      TransitionComponent={Fade}
                    >
                      <MenuItem onClick={() => handleModalOpen('calendar')}>Create New Calendar</MenuItem>
                      <MenuItem onClick={() => navigate('/calendars')}>View All</MenuItem>
                      <MenuItem onClick={handleCloseCalendarMenu}>Work Calendar</MenuItem>
                    </Menu>
                    <MenuItem onClick={handleOpenFamilyMenu}>
                      <Typography textAlign="center">Family</Typography>
                    </MenuItem>
                    <Menu
                      id="family-menu"
                      anchorEl={anchorElFamily}
                      open={Boolean(anchorElFamily)}
                      onClose={handleCloseFamilyMenu}
                      TransitionComponent={Fade}
                    >
                      <MenuItem onClick={() => handleModalOpen('family')}>Create New Family</MenuItem>
                      <MenuItem onClick={() => navigate('/families')}>View My Family</MenuItem>
                      <MenuItem onClick={handleCloseFamilyMenu}>Invite</MenuItem>
                    </Menu>
                    <MenuItem onClick={handleOpenToDoListMenu}>
                      <Typography textAlign="center">To-Do List</Typography>
                    </MenuItem>
                    <Menu
                      id="toDoList-menu"
                      anchorEl={anchorElToDoList}
                      open={Boolean(anchorElToDoList)}
                      onClose={handleCloseToDoListMenu}
                      TransitionComponent={Fade}
                    >
                      <MenuItem onClick={() => handleModalOpen('toDoList')}>Create New To-Do List</MenuItem>
                      <MenuItem onClick={() => navigate('/toDoLists')}>View My To-Do Lists</MenuItem>
                    </Menu>
                  </Menu>
                </Box>
              </>
            )}

            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
              onClick={handleTitleClick}
            >
              My Family Management
            </Typography>
            {isAuthenticated && (
              <>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                  <Button
                    key="home"
                    href="/home"
                    sx={{ my: 2, color: 'white', display: 'block' }}
                    onClick={handleTitleClick}
                  >
                    Home
                  </Button>
                  <Button
                    key="calendars"
                    onClick={handleOpenCalendarMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    Calendars
                  </Button>
                  <Menu
                    id="calendar-menu"
                    anchorEl={anchorElCalendar}
                    open={Boolean(anchorElCalendar)}
                    onClose={handleCloseCalendarMenu}
                    TransitionComponent={Fade}
                  >
                    <MenuItem onClick={() => handleModalOpen('calendar')}>Create New Calendar</MenuItem>
                    <MenuItem onClick={() => navigate('/calendars')}>View All</MenuItem>
                    <MenuItem onClick={handleCloseCalendarMenu}>Work Calendar</MenuItem>
                  </Menu>
                  <Button
                    key="family"
                    onClick={handleOpenFamilyMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    Family
                  </Button>
                  <Menu
                    id="family-menu"
                    anchorEl={anchorElFamily}
                    open={Boolean(anchorElFamily)}
                    onClose={handleCloseFamilyMenu}
                    TransitionComponent={Fade}
                  >
                    <MenuItem onClick={() => handleModalOpen('family')}>Create New Family</MenuItem>
                    <MenuItem onClick={() => navigate('/families')}>View My Family</MenuItem>
                    <MenuItem onClick={handleCloseFamilyMenu}>Invite</MenuItem>
                  </Menu>
                  <Button
                    key="toDoList"
                    onClick={handleOpenToDoListMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    To-Do List
                  </Button>
                  <Menu
                    id="toDoList-menu"
                    anchorEl={anchorElToDoList}
                    open={Boolean(anchorElToDoList)}
                    onClose={handleCloseToDoListMenu}
                    TransitionComponent={Fade}
                  >
                    <MenuItem onClick={() => handleModalOpen('toDoList')}>Create New To-Do List</MenuItem>
                    <MenuItem onClick={() => navigate('/toDoLists')}>View My To-Do Lists</MenuItem>
                  </Menu>
                </Box>  
              </>
            )}

            {isAuthenticated ? (
              <>
                <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
                  <IconButton color="inherit">
                    <NotificationsIcon />
                  </IconButton>
                  <IconButton color="inherit">
                    <PersonAddIcon />
                  </IconButton>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar {...stringAvatar(userName)} />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <MenuItem key={setting} onClick={setting === 'Account' ? handleAccountModalOpen : (setting === 'Logout' ? logout : handleCloseUserMenu)}>
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              </>
            ) : (
              <Button
                key="login"
                onClick={handleLoginClick}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Sign In
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <AccountModal open={accountModalOpen} handleClose={handleAccountModalClose} />
      <CreateFamilyModal open={modalOpen.family} handleClose={() => handleModalClose('family')} />
      <CreateCalendarModal open={modalOpen.calendar} handleClose={() => handleModalClose('calendar')} />
      <CreateToDoListModal open={modalOpen.toDoList} handleClose={() => handleModalClose('toDoList')} />
    </>
  );
}

export default Navigation;
