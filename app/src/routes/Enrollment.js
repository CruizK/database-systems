import { Box, Container, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { CreateEnrolled, DeleteEnrolled, GetAllEnrolled, UpdateEnrolled } from "../api/enrolledApi";
import { GetAllCourse } from "../api/courseApi";
import { GetAllStudents } from "../api/studentApi";
import CreateModal from "../components/CreateModal";
import Toolbar from '../components/Toolbar';
import EnrollmentForm from "../components/EnrollmentForm";

function Enrollment() {

  const [rows, setRows] = useState([]);
  const [enrolled, setEnrolled] = useState([]);
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [selectedEnrolled, setSelectedEnrolled] = useState(null);
  const [selection, setSelection] = useState([]);

  const columns = [
    { 
      field: "CourseID", 
      headerName: "Course", 
      minWidth: 50,
      valueFormatter: (params) => {
        const name = courses.filter(x => x.ID === params.value)[0].Name;
        return name
      } 
    },
    {
      field: "StudentID",
      headerName: "Student",
      flex: 1,
      valueFormatter: (params) => {
        const name = students.filter(x => x.ID === params.value)[0].Name;
        return name
      } 
    },
    { field: "Exam1", headerName: "Exam1", flex: 1 },
    { field: "Exam2", headerName: "Exam2", flex: 1 },
    { field: "Final", headerName: "Final", flex: 1 },
  ]

  useEffect(() => {
    async function work() {
      try {
        const res = await GetAllEnrolled()
        const deps = await GetAllCourse();
        const deps2 = await GetAllStudents();
        setEnrolled(res.data);
        setCourses(deps.data);
        setStudents(deps2.data);
        setRows(res.data.map(x => ({id: `${x.CourseID}-${x.StudentID}`, ...x })));
      } catch(e) {
        console.error(e);
      }  
    }

    work();
  }, [])

  const onSearchSubmit = (searchValue) => {
    console.log("Search submitted: " + searchValue)
  }

  const handleSubmit = async (enrolled, isUpdate) => {
    if(isUpdate) {
      await UpdateEnrolled(enrolled.ID, enrolled);
    }
    else {
      await CreateEnrolled(enrolled);
    }

    const res = await GetAllEnrolled()
    setRows(res.data.map(x => ({id: `${x.CourseID}-${x.StudentID}`, ...x })));
    setEnrolled(res.data);
    setOpen(false);
  }

  const handleDelete = async () => {
    await DeleteEnrolled(selection[0]);
    const res = await GetAllEnrolled()
    setSelection([]);
    setRows(res.data.map(x => ({id: `${x.CourseID}-${x.StudentID}`, ...x })));
    setEnrolled(res.data);
  }

  const handleCreateClicked = () => {
    setSelectedEnrolled(null);
    setOpen(true);
  }

  const handleUpdateClick = () => {
    const selectedId = selection[0];
    const selected = enrolled.filter(x => `${x.CourseID}-${x.StudentID}` === selectedId)[0];

    setSelectedEnrolled(selected);
    setOpen(true);
  }

  return (
    <Container maxWidth="md" sx={{ mt: 3, ml: '250px' }}>
      <Typography variant="h2">Enrollment</Typography>
      <CreateModal open={isOpen} size="sm" onClose={() => setOpen(false)} handleCancel={() => setOpen(false)} title={selectedEnrolled ? "Update Enrollment" : "Create Enrollment"}>
        <EnrollmentForm 
          onSubmit={handleSubmit} 
          handleCancel={() => setOpen(false)} 
          enrollment={enrolled} 
          courses={courses} 
          students={students}
          selected={selectedEnrolled}
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


export default Enrollment;