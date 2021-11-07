import { Box, Container, Divider, Typography, Grid, Item } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useContext, useState, useEffect } from "react";
import { GetAllCourse } from "../api/courseApi";
import { GetAllDepartment } from "../api/departmentApi";
import { GetAllEnrolled } from "../api/enrolledApi";
import { GetAllFaculty } from "../api/facultyApi";
import Toolbar from '../components/Toolbar';
import UserContext from "../userContext";

function StudentView() {

  const { user } = useContext(UserContext);

  const [rows, setRows] = useState([]);
  const [courseRows, setCourseRows] = useState([]);
  const [course, setCourse] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [enrollment, setEnrollment] = useState([]);
  const [selection, setSelection] = useState([]);

  useEffect(() => {
    async function work() {
      try {
        const res = await GetAllCourse()
        const deps = await GetAllFaculty();
        const deps2 = await GetAllDepartment();
        const deps3 = await GetAllEnrolled();
        const courses = res.data;
        const faculty = deps.data;
        const departments = deps2.data;
        const enrolled = deps3.data;
        setCourse(courses);
        setDepartments(departments);
        setFaculty(faculty);
        setEnrollment(enrolled);
        setRows(courses.map(x => (
          {
            id: x.ID,
            DeptID: faculty.filter(y => x.FacultyID == y.ID)[0].DeptID,
            Enrolled: enrolled.filter(y => y.CourseID == x.ID).length,
            ...x 
          }
          )));
          console.log(enrolled.filter(x => x.StudentID == user.ID))
        setCourseRows(enrolled.filter(x => x.StudentID == user.ID).map(x => (
          {
            id: x.CourseID,
            ID: x.CourseID,
            Name: courses.filter(y => y.ID == x.CourseID)[0].ID,
            Exam1: x.Exam1,
            Exam2: x.Exam2,
            Final: x.Final
          }
        )))
      } catch(e) {
        console.error(e);
      }  
    }

    work();
  }, [])

  const handleSearchSubmit = () => {

  }

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
        const name = faculty.filter(x => x.ID === params.value)[0].Name;
        return name
      }
    },
    { 
      field: "DeptID", 
      headerName: "Department", 
      flex: 1,
      valueFormatter: (params) => {
        const name = departments.filter(x => x.ID === params.value)[0].Name;
        return name
      }
    },
    { field: "Enrolled", headerName: "Enrolled", flex: 1 },
    { field: "Capacity", headerName: "Capacity", flex: 1 },
  ]

  const currentCourseColumns = [
    { field: "ID", headerName: "ID", minWidth: 50 },
    { 
      field: "Name", 
      headerName: "Course", 
      flex: 1,
      valueFormatter: (params) => {
        const name = course.filter(x => x.ID === params.value)[0].Name;
        return name
      }
    },
    { field: "Exam1", headerName: "Exam1", flex: 1 },
    { field: "Exam2", headerName: "Exam2", flex: 1 },
    { field: "Final", headerName: "Final", flex: 1 },
  ]

  return (
    <Container maxWidth="md" sx={{ mt: 3, ml: '250px' }}>
      <Typography variant="h3">{user.Name}</Typography>
      <Divider sx={{ mb: 3 }}></Divider>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography sx={{ fontWeight: 600 }}>Name</Typography>
          {user.Name}
        </Grid>
        <Grid item xs={6}>
          <Typography sx={{ fontWeight: 600 }}>Major</Typography>
          {user.Major}
        </Grid>
        <Grid item xs={6}>
          <Typography sx={{ fontWeight: 600 }}>Level</Typography>
          {user.Level}
        </Grid>
        <Grid item xs={6}>
          <Typography sx={{ fontWeight: 600 }}>Age</Typography>
          {user.Age}
        </Grid>
      </Grid>
      <Typography variant="h3" sx={{ mt: 3 }}>Current Courses</Typography>
      <Divider sx={{ mb: 3 }}></Divider>
      <Box sx={{ height: 650, width: '100%' }}>
        <DataGrid
          pagination
          columns={currentCourseColumns}
          onSelectionModelChange={(newSelection) => {
            setSelection(newSelection);
          }}
          selectionModel={selection}
          rows={courseRows}
          pageSize={10}
        />
      </Box>
      <Typography variant="h3" sx={{ mt: 3 }}>Course Search</Typography>
      <Divider sx={{ mb: 3 }}></Divider>
      <Toolbar 
        readonly={true}
        onSearchSubmit={handleSearchSubmit} 
      />
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
          isRowSelectable={(params) => params.row.Enrolled < params.row.Capacity}
        />
      </Box>
    </Container>
  )
}

export default StudentView