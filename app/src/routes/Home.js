import React, { useContext, useState } from 'react'
import { Container, Paper, TextField, Typography, MenuItem, Box, Button } from '@mui/material'
import { useHistory } from 'react-router';
import UserContext from '../userContext';

const roles = [ 'Student', 'Staff', 'Faculty' ];

function Home() {
  const roleContext = useContext(UserContext);
  const [ role, setRole ] = useState(roles[0]);
  const [ id, setId] = useState('');
  const history = useHistory();

  const handleChange = (e) => {
    setRole(e.target.value);
  }

  const handleClick = (e) => {
    // Check if valid
    roleContext.setRole(role);
    history.push(`/main`);
  }

  return (
    <Container maxWidth="sm" sx={{ mt: '50px' }}>
      <Paper sx={{ py: '50px' }}>
        <Typography variant="h2" align="center">Log In</Typography>
        <Box display="flex" alignItems="center" justifyContent="center" sx={{ py: '25px' }}>
          <TextField label="Role" select value={role} onChange={handleChange} sx={{ mr: '10px' }}>
            {roles.map(x => 
              <MenuItem key={x} value={x}>
                {x}
              </MenuItem>
            )}
          </TextField>
          <TextField label="User ID" value={id} onChange={e => setId(e.target.value)}/>
        </Box>
        <Box display="flex" justifyContent="center">
          <Button onClick={handleClick} variant="contained" size="large" sx={{ width: '30%' }}>Submit</Button>
        </Box>
      </Paper>
    </Container>
  )
}

export default Home;