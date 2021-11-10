import { Box, Container, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { GetAllDepartment } from '../api/departmentApi';
import { CreateFaculty, DeleteFaculty, GetAllFaculty, UpdateFaculty } from "../api/facultyApi";
import CreateModal from "../components/CreateModal";
import FacultyForm from "../components/FacultyForm";
import Toolbar from '../components/Toolbar';
import Search from "../utils/searchFunc";

function Staff() {

  const [rows, setRows] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [selection, setSelection] = useState([]);

  const columns = [
    { field: "ID", headerName: "ID", minWidth: 50 },
    { field: "Name", headerName: "Name", flex: 1 },
    {
      field: "DeptID",
      headerName: "Department",
      flex: 1,
      valueFormatter: (params) => {
        const name = departments.filter(x => x.ID === params.value)[0].Name;
        return name
      }
    },
  ]

  useEffect(() => {
    async function work() {
      try {
        const res = await GetAllFaculty()
        const deps = await GetAllDepartment();
        setFaculty(res.data);
        setDepartments(deps.data);
        setRows(res.data.map(x => ({ id: x.ID, ...x })));
      } catch (e) {
        console.error(e);
      }
    }

    work();
  }, [])

  const onSearchSubmit = (value) => {
    setRows(Search(value, faculty.map(x => ({ id: x.ID, ...x }))))
  }

  const handleSubmit = async (staff, isUpdate) => {
    if (isUpdate) {
      await UpdateFaculty(staff.ID, staff);
    }
    else {
      await CreateFaculty(staff);
    }

    const res = await GetAllFaculty()
    setRows(res.data.map(x => ({ id: x.ID, ...x })));
    setFaculty(res.data);
    setOpen(false);
  }

  const handleDelete = async () => {
    await DeleteFaculty(selection[0]);
    const res = await GetAllFaculty()
    setSelection([]);
    setRows(res.data.map(x => ({ id: x.ID, ...x })));
    setFaculty(res.data);
  }

  const handleCreateClicked = () => {
    setSelectedFaculty(null);
    setOpen(true);
  }

  const handleUpdateClick = () => {
    const selectedId = selection[0];
    const selected = faculty.filter(x => x.ID === selectedId)[0];

    setSelectedFaculty(selected);
    setOpen(true);
  }

  return (
    <Container maxWidth="md" sx={{ mt: 3, ml: '250px' }}>
      <Typography variant="h2">Faculty</Typography>
      <CreateModal open={isOpen} onClose={() => setOpen(false)} handleCancel={() => setOpen(false)} title={selectedFaculty ? "Update Faculty" : "Create Faculty"}>
        <FacultyForm
          onSubmit={handleSubmit}
          handleCancel={() => setOpen(false)}
          faculty={faculty}
          departments={departments}
          selected={selectedFaculty}
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


export default Staff;