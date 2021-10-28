import { useState } from "react";
import { Container, Typography, Box, Button, TextField, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid"
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const allRows = [
  { id: 1, ID: 1, Name: "Timmy", Major: "CS", Level: "Junior", Age: 31 },
  { id: 2, ID: 2, Name: "Timmy", Major: "CS", Level: "Junior", Age: 31 },
  { id: 3, ID: 3, Name: "Timmy", Major: "CS", Level: "Junior", Age: 31 },
  { id: 4, ID: 4, Name: "Timmy", Major: "CS", Level: "Junior", Age: 31 },
  { id: 5, ID: 5, Name: "Timmy", Major: "CS", Level: "Junior", Age: 31 },
  { id: 6, ID: 6, Name: "Timmy", Major: "CS", Level: "Junior", Age: 31 },
  { id: 7, ID: 7, Name: "Timmy", Major: "CS", Level: "Junior", Age: 31 },
  { id: 8, ID: 8, Name: "Timmy", Major: "CS", Level: "Junior", Age: 31 },
  { id: 9, ID: 9, Name: "Timmy", Major: "CS", Level: "Junior", Age: 31 },
  { id: 10, ID: 10, Name: "Timmy", Major: "CS", Level: "Junior", Age: 31 },
  { id: 11, ID: 11, Name: "Timmy", Major: "CS", Level: "Junior", Age: 31 },
  { id: 12, ID: 12, Name: "Timmy", Major: "CS", Level: "Junior", Age: 31 },
  { id: 13, ID: 13, Name: "Timmy", Major: "CS", Level: "Junior", Age: 31 },

]

const columns = [
  { field: "ID", headerName: "ID", minWidth: 50 },
  { field: "Name", headerName: "Name", minWidth: 200 },
  { field: "Major", headerName: "Major", flex: 1 },
  { field: "Level", headerName: "Level", flex: 1 },
  { field: "Age", headerName: "Age", flex: 1 },
]

function Students() {

  const [rows, setRows] = useState(allRows);

  const onCellEdit = (e) => {
    console.log(e);
  }

  const onSearchSubmit = (searchValue) => {
    console.log("Search submitted: " + searchValue)
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 3, ml: '250px' }}>
      <Typography variant="h2">Students</Typography>
      <Toolbar onSearchSubmit={onSearchSubmit} />
      <Box sx={{ height: 650, width: '100%' }}>
        <DataGrid
          checkboxSelection
          pagination
          columns={columns}
          rows={rows}
          pageSize={10}
          onCellEditCommit={onCellEdit}
        />
      </Box>
    </Container>
  )
}

function Toolbar({ onSearchSubmit }) {

  const [searchValue, setSearchValue] = useState('');

  const handleKeyPress = (e) => {
    if(e.key === 'Enter' ) {
      e.preventDefault();
      onSearchSubmit(searchValue);
    }
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
                onClick={() => setSearchValue('') && onSearchSubmit('')}
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            )
          }} />
      </Box>
      <Box display="flex">
        <Button variant="contained" sx={{ mr: 2 }}>Add</Button>
        <Button variant="contained" color="error" sx={{ mr: 2 }}>Delete</Button>
      </Box>
    </Box>
  )
}

export default Students;