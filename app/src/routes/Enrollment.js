import { Box, Container, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { CreateEnrolled, DeleteEnrolled, GetAllEnrolled, UpdateEnrolled } from "../api/enrolledApi";
import { GetAllCourse } from "../api/courseApi";
import { GetAllStudents } from "../api/studentApi";
import CreateModal from "../components/CreateModal";
import Toolbar from '../components/Toolbar';
import EnrollmentForm from "../components/EnrollmentForm";
import Search from "../utils/searchFunc";

function Enrollment() {

  const [rows, setRows] = useState([]);
  const [allRows, setAllRows] = useState([]);
  const [enrolled, setEnrolled] = useState([]);
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [selectedEnrolled, setSelectedEnrolled] = useState(null);
  const [selection, setSelection] = useState([]);

  const columns = [
    { field: "CourseName", headerName: "Course", minWidth: 50},
    { field: "StudentName", headerName: "Student", flex: 1},
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
        resetRows(res.data, deps.data, deps2.data);
      } catch(e) {
        console.error(e);
      }  
    }

    work();
  }, [])

  useEffect(() => {
    setRows(allRows);
  }, [allRows])

  const resetRows = (enrolled, courses, students) => {
    setAllRows(enrolled.map(x => 
      (
        {
          id: `${x.CourseID}-${x.StudentID}`, 
          StudentName: students.filter(y => y.ID === x.StudentID)[0].Name,
          CourseName:  courses.filter(y => y.ID === x.CourseID)[0].Name,
          ...x 
      })));
  }

  const onSearchSubmit = (value) => {
    setRows(Search(value, allRows, ['StudentName', 'CourseName']))
  }

  const handleSubmit = async (enrolled, isUpdate) => {
    if(isUpdate) {
      await UpdateEnrolled(enrolled.StudentID, enrolled.CourseID, enrolled);
    }
    else {
      await CreateEnrolled(enrolled);
    }

    const res = await GetAllEnrolled()
    resetRows(res.data, courses, students);
    setEnrolled(res.data);
    setOpen(false);
  }

  const handleDelete = async () => {
    const courseID = selection[0].split('-')[0];
    const studentID = selection[0].split('-')[1];
    await DeleteEnrolled(courseID, studentID);
    const res = await GetAllEnrolled()
    setSelection([]);
    resetRows(res.data, courses, students);
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