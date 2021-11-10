import { Box, Button, Divider, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect, useContext } from "react";
import Toolbar from './Toolbar';
import UserContext from "../userContext";
import Search from "../utils/searchFunc";

function CourseSearch({ data, enrollStudent}) {

  const { user } = useContext(UserContext);
  const [allRows, setAllRows] = useState([]);
  const [rows, setRows] = useState([]);
  const [selection, setSelection] = useState([]);

  useEffect(() => {
    async function work() {
      const enrolled = data.enrolled.filter(x => x.StudentID == user.ID).map(x => x.CourseID);
      const filtered = data.courses.filter(x => enrolled.indexOf(x.ID) == -1);
      setSelection([]);
      try {
        setAllRows(filtered.map(x => (
          {
            id: x.ID,
            DeptID: data.faculty.filter(y => x.FacultyID == y.ID)[0].DeptID,
            CurrentEnrollment: data.enrolled.filter(y => y.CourseID == x.ID).length, 
            Enrolled: `${data.enrolled.filter(y => y.CourseID == x.ID).length}/${x.Capacity}`,
            ...x 
          }
          )));
      } catch(e) {
        console.error(e);
      }  
    }
    if(data)
      work();
  }, [data])

  useEffect(() => {
    setRows(allRows);
  }, [allRows])

  const columns = [
    { field: "ID", headerName: "ID", minWidth: 50 },
    { field: "Name", headerName: "Name", flex: 1 },
    { field: "MeetsAt", headerName: "Meets At", flex: 1 },
    { field: "Room", headerName: "Room", flex: 1 },
    { field: "Name", headerName: "Name", flex: 1 },
    { 
      field: "FacultyID", 
      headerName: "Teacher", 
      flex: 1,
      valueFormatter: (params) => {
        const name = data.faculty.filter(x => x.ID === params.value)[0].Name;
        return name
      }
    },
    { 
      field: "DeptID", 
      headerName: "Department", 
      flex: 1,
      valueFormatter: (params) => {
        const name = data.departments.filter(x => x.ID === params.value)[0].Name;
        return name
      }
    },
    { field: "Enrolled", headerName: "Capacity", flex: 1 },
  ]

  const handleSearchSubmit = (value) => {
    setRows(Search(value, allRows))
  }

  const handleEnroll = () => {
    enrollStudent({
      CourseID: selection[0],
      StudentID: user.ID,
      Exam1: 0,
      Exam2: 0,
      Final: 0
    })
  }

  return (
    <div>
      <Typography variant="h3" sx={{ mt: 3 }}>Course Search</Typography>
      <Divider sx={{ mb: 3 }}></Divider>
      <Toolbar
        readonly={true}
        onSearchSubmit={handleSearchSubmit}
      >
        <Button variant="contained" onClick={handleEnroll}>Enroll</Button>
      </Toolbar>
      <Box sx={{ height: 650, width: '100%' }}>
        <DataGrid
          pagination
          columns={columns}
          onSelectionModelChange={(newSelection) => {
            setSelection(newSelection);
          }}
          selectionModel={selection}
          rows={rows}
          pageSize={10}
          isRowSelectable={(params) => params.row.CurrentEnrollment < params.row.Capacity}
        />
      </Box>
    </div>
  )
}

export default CourseSearch;