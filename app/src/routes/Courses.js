import { Box, Container, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { CreateCourse, DeleteCourse, GetAllCourse, UpdateCourse } from "../api/courseApi";
import { GetAllFaculty } from "../api/facultyApi";
import CourseForm from "../components/CourseForm";
import CreateModal from "../components/CreateModal";
import Toolbar from '../components/Toolbar';
import Search from "../utils/searchFunc";

function Courses() {

  const [rows, setRows] = useState([]);
  const [course, setCourse] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selection, setSelection] = useState([]);

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
    { field: "Capacity", headerName: "Capacity", flex: 1 },
  ]

  useEffect(() => {
    async function work() {
      try {
        const res = await GetAllCourse()
        const deps = await GetAllFaculty();
        setCourse(res.data);
        setFaculty(deps.data);
        setRows(res.data.map(x => ({id: x.ID, ...x })));
      } catch(e) {
        console.error(e);
      }  
    }

    work();
  }, [])

  const onSearchSubmit = (value) => {
    setRows(Search(value, course.map(x => ({ id: x.ID, ...x }))))
  }

  const handleSubmit = async (course, isUpdate) => {
    if(isUpdate) {
      await UpdateCourse(course.ID, course);
    }
    else {
      await CreateCourse(course);
    }

    const res = await GetAllCourse()
    setRows(res.data.map(x => ({id: x.ID, ...x })));
    setCourse(res.data);
    setOpen(false);
  }

  const handleDelete = async () => {
    await DeleteCourse(selection[0]);
    const res = await GetAllFaculty()
    setSelection([]);
    setRows(res.data.map(x => ({id: x.ID, ...x })));
    setCourse(res.data);
  }

  const handleCreateClicked = () => {
    setSelectedCourse(null);
    setOpen(true);
  }

  const handleUpdateClick = () => {
    const selectedId = selection[0];
    const selected = course.filter(x => x.ID === selectedId)[0];

    setSelectedCourse(selected);
    setOpen(true);
  }

  return (
    <Container maxWidth="md" sx={{ mt: 3, ml: '250px' }}>
      <Typography variant="h2">Courses</Typography>
      <CreateModal open={isOpen} size="sm" onClose={() => setOpen(false)} handleCancel={() => setOpen(false)} title={selectedCourse ? "Update Course" : "Create Course"}>
        <CourseForm 
          onSubmit={handleSubmit} 
          handleCancel={() => setOpen(false)} 
          courses={course} 
          faculty={faculty} 
          selected={selectedCourse}
        />
      </CreateModal>
      <Toolbar 
        onSearchSubmit={onSearchSubmit} 
        onCreateClick={handleCreateClicked} 
        onDeleteClick={handleDelete} 
        onUpdateClick={handleUpdateClick}
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
        />
      </Box>
    </Container>
  )
}


export default Courses;