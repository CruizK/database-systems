import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, IconButton, TextField } from "@mui/material";
import { useContext, useState } from "react";
import UserContext from "../userContext";


function Toolbar({ onSearchSubmit, onUpdateClick, onCreateClick, onDeleteClick, readonly, children }) {

  const { user } = useContext(UserContext);

  if(user.role == 'Faculty') readonly = true;

  const [searchValue, setSearchValue] = useState('');

  const handleKeyPress = (e) => {
    if(e.key === 'Enter' ) {
      e.preventDefault();
      onSearchSubmit(searchValue);
    }
  }

  const handleClear = () => {
    setSearchValue('');
    onSearchSubmit('');
  }

  return (
    <Box display="flex" justifyContent="space-between" sx={{ my: 1 }}>
      <Box display="flex">
        <TextField
          variant="standard"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search..."
          InputProps={{
            startAdornment: <SearchIcon fontSize="small" />,
            endAdornment: (
              <IconButton
                title="clear"
                size="small"
                style={{ visibility: searchValue ? 'visible' : 'hidden' }}
                onClick={handleClear}
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            )
          }} />
      </Box>
      {children && <Box display="flex">{children}</Box>}
      {!readonly && 
      <Box display="flex">
        
        <Button variant="contained" sx={{ mr: 2 }} onClick={onCreateClick}>Add</Button>
        <Button variant="contained" color="info" sx={{ mr: 2 }} onClick={onUpdateClick}>Update</Button>
        <Button variant="contained" color="error" sx={{ mr: 2 }} onClick={onDeleteClick}>Delete</Button>
      </Box>
      }
    </Box>
  )
}

export default Toolbar