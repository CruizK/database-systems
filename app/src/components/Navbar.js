import { Box } from "@mui/system";
import { Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person'
import GroupIcon from '@mui/icons-material/Group'
import BookIcon from '@mui/icons-material/Book'
import { useHistory } from "react-router";

function Navbar({ role }) {
  const history = useHistory();
  const drawerWidth = '200px';

  const fontProps = {
    fontSize: 15,
    fontWeight: 'medium',
  };

  const onItemClick = (page) => {
    history.push(page);
  }

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
      <List>
        <ListItemButton onClick={() => onItemClick('/students')}>
          <ListItemIcon><PersonIcon /></ListItemIcon>
          <ListItemText primary="Students" primaryTypographyProps={fontProps} />
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
    </Drawer>
  )
}

export default Navbar;