import { Box, Container, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { CreateStudent, DeleteStudent, GetAllStudents, UpdateStudent } from "../api/studentApi";
import CreateModal from "../components/CreateModal";
import StudentForm from "../components/StudentForm";
import Toolbar from '../components/Toolbar'

const columns = [
  { field: "ID", headerName: "ID", minWidth: 50 },
  { field: "Name", headerName: "Name", minWidth: 200 },
  { field: "Major", headerName: "Major", flex: 1 },
  { field: "Level", headerName: "Level", flex: 1 },
  { field: "Age", headerName: "Age", flex: 1, type:"number" },
]

function Students() {

  const [rows, setRows] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isOpen, setOpen] = useState(false);
  const [selection, setSelection] = useState([]);

  useEffect(() => {
    async function work() {
      try {
        const res = await GetAllStudents()
        setStudents(res.data);
        setRows(res.data.map(x => ({id: x.ID, ...x })));
      } catch(e) {
        console.error(e);
      }  
    }

    work();
  }, [])

  const onSearchSubmit = (searchValue) => {
    console.log("Search submitted: " + searchValue)
  }

  const handleSubmit = async (student, isUpdate) => {
    if(isUpdate) {
      await UpdateStudent(student.ID, student);
    }
    else {
      await CreateStudent(student);
    }

    const res = await GetAllStudents()
    setRows(res.data.map(x => ({id: x.ID, ...x })));
    setStudents(res.data);
    setOpen(false);
  }

  const handleDelete = async () => {
    await DeleteStudent(selection[0]);
    const res = await GetAllStudents()
    setSelection([]);
    setRows(res.data.map(x => ({id: x.ID, ...x })));
    setStudents(res.data);
  }


  const handleCreateClicked = () => {
    setSelectedStudent(null);
    setOpen(true);
  }

  const handleUpdateClick = () => {
    const selectedId = selection[0];
    const selected = students.filter(x => x.ID === selectedId)[0];

    setSelectedStudent(selected);
    setOpen(true);
  }

  return (
    <Container maxWidth="md" sx={{ mt: 3, ml: '250px' }}>
      <Typography variant="h2">Students</Typography>
      <CreateModal open={isOpen} onClose={() => setOpen(false)} handleCancel={() => setOpen(false)} title={selectedStudent ? "Update Student" : "Create Student"}>
        <StudentForm 
          onSubmit={handleSubmit} 
          handleCancel={() => setOpen(false)} 
          students={students}
          selected={selectedStudent}
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


export default Students;