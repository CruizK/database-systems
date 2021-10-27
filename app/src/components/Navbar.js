import { Box } from "@mui/system";
import { Tabs, Tab } from "@mui/material";
import { useState } from "react";

function Navbar({ role }) {
  const [ value, setValue ] = useState(0);

  return (
    <Box>
      <Tabs value={value} onChange={e => setValue(e.target.value)}>
        <Tab label="Students" id="tab-panel-0"/>
        <Tab label="Courses" id="tab-panel-1"/>
        <Tab label="Enrolled" id="tab-panel-2"/>
        <Tab label="Faculty" id="tab-panel-3"/>
        <Tab label="Staff" id="tab-panel-4"/>
        <Tab label="Departments" id="tab-panel-5"/>
      </Tabs>
    </Box>
  )
}

export default Navbar;