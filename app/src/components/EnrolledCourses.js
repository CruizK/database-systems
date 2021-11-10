import { Box, Button, Divider, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState, useContext } from "react";
import UserContext from "../userContext";
import Toolbar from './Toolbar';
import Search from "../utils/searchFunc";

function EnrolledCourses({ data, unenrollStudent }) {

  const { user } = useContext(UserContext);
  const [allRows, setAllRows] = useState([]);
  const [rows, setRows] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selection, setSelection] = useState([]);

  useEffect(() => {
    async function work() {
      try {
        const filtered = data.enrolled.filter(x => x.StudentID == user.ID);
        setSelection([]);
        setAllRows(filtered.map(x => (
          {
            id: x.CourseID,
            ID: x.CourseID,
            Name: data.courses.filter(y => y.ID == x.CourseID)[0].Name,
            Exam1: x.Exam1,
            Exam2: x.Exam2,
            Final: x.Final
          }
        )))
      } catch (e) {
        console.error(e);
      }
    }
    if(data)
      work();
  }, [data]);

  useEffect(() => {
    setRows(allRows);
  }, [allRows])

  const columns = [
    { field: "ID", headerName: "ID", minWidth: 50 },
    { field: "Name", headerName: "Course", flex: 1 },
    { field: "Exam1", headerName: "Exam1", flex: 1 },
    { field: "Exam2", headerName: "Exam2", flex: 1 },
    { field: "Final", headerName: "Final", flex: 1 },
  ]

  const handleUnenroll = () => {
    unenrollStudent(selection[0]);
  }

  const handleSearchSubmit = (value) => {
    setRows(Search(value, allRows));
  }

  return (
    <div>
      <Typography variant="h3" sx={{ mt: 3 }}>Current Courses</Typography>
      <Divider sx={{ mb: 3 }}></Divider>
      <Toolbar
        readonly={true}
        onSearchSubmit={handleSearchSubmit}
      >
        <Button variant="contained" onClick={handleUnenroll}>Drop</Button>
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
        />
      </Box>
    </div>
  )
};

export default EnrolledCourses;