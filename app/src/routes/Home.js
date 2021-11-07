import React, { useContext, useState } from 'react'
import { Container, Paper, TextField, Typography, MenuItem, Box, Button } from '@mui/material'
import { useHistory, useRouteMatch } from 'react-router';
import UserContext from '../userContext';
import { GetAllStudents } from '../api/studentApi';
import { GetAllStaff } from '../api/staffApi';
import { GetAllFaculty } from '../api/facultyApi';

const roles = [ 'Student', 'Staff', 'Faculty' ];

function Home() {
  const { setUser } = useContext(UserContext);
  const [ role, setRole ] = useState(roles[0]);
  const [ id, setId] = useState('');
  const [idError, setIdError] = useState(false);
  const history = useHistory();

  const handleChange = (e) => {
    setRole(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(role == 'Student') {
      const res = await GetAllStudents()
      const students = res.data;
  
      const user = students.filter(x => x.ID == id)[0];
      if(!user) return setIdError(true);
      // Check if valid
      setUser({ ...user, role });
      history.push(`/studentview`);
    }
    else if(role == 'Staff') {
      console.log("Staff sign in");
      const res = await GetAllStaff()
      const staff = res.data;
      const user = staff.filter(x => x.ID == id)[0];

      if(!user) return setIdError(true);

      setUser({...user, role});
      history.push('/students');
    }
    else {
      const res = await GetAllFaculty()
      const faculty = res.data;
      const user = faculty.filter(x => x.ID == id)[0];

      if(!user) return setIdError(true);

      setUser({...user, role});
      history.push('/students');
    }
  }

  return (
    <Container component="form" onSubmit={handleSubmit} maxWidth="sm" sx={{ mt: '50px' }}>
      <Paper sx={{ py: '50px' }}>
        <Typography variant="h2" align="center">Log In</Typography>
        <Box display="flex"  justifyContent="center" sx={{ my: '25px' }}>
          <TextField label="Role" select value={role} onChange={handleChange} sx={{ mr: '10px' }}>
            {roles.map(x => 
              <MenuItem key={x} value={x}>
                {x}
              </MenuItem>
            )}
          </TextField>
          <TextField label="User ID" helperText={idError ? "Invalid User ID" : ""} error={idError} value={id} onChange={e => setId(e.target.value)}/>
        </Box>
        <Box display="flex" justifyContent="center">
          <Button type="submit" variant="contained" size="large" sx={{ width: '30%' }}>Submit</Button>
        </Box>
      </Paper>
    </Container>
  )
}

export default Home;