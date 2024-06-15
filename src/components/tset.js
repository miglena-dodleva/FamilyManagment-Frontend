import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AdbIcon from '@mui/icons-material/Adb';

const settings = ['Logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElCalendar, setAnchorElCalendar] = React.useState(null);
  const [anchorElFamily, setAnchorElFamily] = React.useState(null);

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

  return (
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
            }}
          >
            My Family Management
          </Typography>

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
              <MenuItem onClick={handleCloseNavMenu}>
                <Link href="/" color="inherit" underline="none">
                  Home
                </Link>
              </MenuItem>
              <MenuItem onClick={handleOpenCalendarMenu}>
                Calendar
              </MenuItem>
              <Menu
                anchorEl={anchorElCalendar}
          
                open={Boolean(anchorElCalendar)}
                onClose={handleCloseCalendarMenu}
              >
                <MenuItem onClick={handleCloseCalendarMenu}>Create New</MenuItem>
                <MenuItem onClick={handleCloseCalendarMenu}>View All</MenuItem>
                <MenuItem onClick={handleCloseCalendarMenu}>Calendar1</MenuItem>
              </Menu>
              <MenuItem onClick={handleOpenFamilyMenu}>
                Family
              </MenuItem>
              <Menu
                anchorEl={anchorElFamily}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElFamily)}
                onClose={handleCloseFamilyMenu}
              >
                <MenuItem onClick={handleCloseFamilyMenu}>Create New</MenuItem>
                <MenuItem onClick={handleCloseFamilyMenu}>View</MenuItem>
                <MenuItem onClick={handleCloseFamilyMenu}>Invite</MenuItem>
              </Menu>
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
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
          >
            My Family Management
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/">
                Home
              </Link>
              <Button
                color="inherit"
                onClick={handleOpenCalendarMenu}
              >
                Calendar
              </Button>
              <Menu
                anchorEl={anchorElCalendar}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElCalendar)}
                onClose={handleCloseCalendarMenu}
              >
                <MenuItem onClick={handleCloseCalendarMenu}>Create New</MenuItem>
                <MenuItem onClick={handleCloseCalendarMenu}>View All</MenuItem>
                <MenuItem onClick={handleCloseCalendarMenu}>Calendar1</MenuItem>
              </Menu>
              <Button
                color="inherit"
                onClick={handleOpenFamilyMenu}
              >
                Family
              </Button>
              <Menu
                anchorEl={anchorElFamily}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElFamily)}
                onClose={handleCloseFamilyMenu}
              >
                <MenuItem onClick={handleCloseFamilyMenu}>Create New</MenuItem>
                <MenuItem onClick={handleCloseFamilyMenu}>View</MenuItem>
                <MenuItem onClick={handleCloseFamilyMenu}>Invite</MenuItem>
              </Menu>
            </Breadcrumbs>
          </Box>

          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
            <IconButton color="inherit">
              <NotificationsIcon />
            </IconButton>
            <IconButton color="inherit">
              <PersonAddIcon />
            </IconButton>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
