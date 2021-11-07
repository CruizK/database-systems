import { Box } from "@mui/system";
import { Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person'
import GroupIcon from '@mui/icons-material/Group'
import BookIcon from '@mui/icons-material/Book'
import { useHistory } from "react-router";
import { useContext } from "react";
import UserContext from "../userContext";

function Navbar() {
  const history = useHistory();
  const { user } = useContext(UserContext)
  const drawerWidth = '200px';

  const fontProps = {
    fontSize: 15,
    fontWeight: 'medium',
  };

  const onItemClick = (page) => {
    history.push(page);
  }

  const isAdmin = user.role == 'Staff' || user.role == 'Faculty';

  return (
    <Drawer anchor="left" variant="persistent" open={true} sx={{
      width: drawerWidth,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: drawerWidth,
        boxSizing: 'border-box',
      },
    }}>
      <Typography align="center" variant="h5" color="primary" sx={{ mb: '10px' }}>Uni System</Typography>
      <Divider />
      {isAdmin ?
      <List>
        <ListItemButton onClick={() => onItemClick('/students')}>
          <ListItemIcon><PersonIcon /></ListItemIcon>
          <ListItemText primary="Students" primaryTypographyProps={fontProps} />
        </ListItemButton>
        <ListItemButton onClick={() => onItemClick('/departments')}>
          <ListItemIcon><PersonIcon /></ListItemIcon>
          <ListItemText primary="Departments" primaryTypographyProps={fontProps} />
        </ListItemButton>
        <ListItemButton onClick={() => onItemClick('/enrollment')}>
          <ListItemIcon><GroupIcon /></ListItemIcon>
          <ListItemText primary="Enrollment" primaryTypographyProps={fontProps} />
        </ListItemButton>
        <ListItemButton onClick={() => onItemClick('/faculty')}>
          <ListItemIcon><GroupIcon /></ListItemIcon>
          <ListItemText primary="Faculty" primaryTypographyProps={fontProps} />
        </ListItemButton>
        <ListItemButton onClick={() => onItemClick('/staff')}>
          <ListItemIcon><GroupIcon /></ListItemIcon>
          <ListItemText primary="Staff" primaryTypographyProps={fontProps} />
        </ListItemButton>
        <ListItemButton onClick={() => onItemClick('/courses')}>
          <ListItemIcon><BookIcon /></ListItemIcon>
          <ListItemText primary="Courses" primaryTypographyProps={fontProps} />
        </ListItemButton>
      </List>
      : <List>
      <ListItemButton onClick={() => onItemClick('/studentview')}>
        <ListItemIcon><PersonIcon /></ListItemIcon>
        <ListItemText primary="Home" primaryTypographyProps={fontProps} />
      </ListItemButton>
    </List>
      }
    </Drawer>
  )
}

export default Navbar;