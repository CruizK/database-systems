import { Box, Container, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { CreateDepartment, DeleteDepartment, GetAllDepartment, UpdateDepartment } from "../api/departmentApi";
import DepartmentForm from "../components/DepartmentForm";
import CreateModal from "../components/CreateModal";
import Toolbar from '../components/Toolbar';
import Search from "../utils/searchFunc";

const columns = [
  { field: "ID", headerName: "ID", minWidth: 50 },
  { field: "Name", headerName: "Name", flex: 1 },

]

function Department() {

  const [rows, setRows] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [isOpen, setOpen] = useState(false);
  const [selection, setSelection] = useState([]);

  useEffect(() => {
    async function work() {
      try {
        const res = await GetAllDepartment()
        setDepartments(res.data);
        setRows(res.data.map(x => ({id: x.ID, ...x })));
      } catch(e) {
        console.error(e);
      }  
    }

    work();
  }, [])

  const onSearchSubmit = (value) => {
    setRows(Search(value, departments.map(x => ({id: x.ID, ...x}))))
  }

  const handleSubmit = async (department, isUpdate) => {
    if(isUpdate) {
      await UpdateDepartment(department.ID, department);
    }
    else {
      await CreateDepartment(department);
    }

    const res = await GetAllDepartment()
    setRows(res.data.map(x => ({id: x.ID, ...x })));
    setDepartments(res.data);
    setOpen(false);
  }


  const handleDelete = async () => {
    await DeleteDepartment(selection[0]);
    const res = await GetAllDepartment()
    setSelection([]);
    setRows(res.data.map(x => ({id: x.ID, ...x })));
    setDepartments(res.data);
  }

  const handleCreateClicked = () => {
    setSelectedDepartment(null);
    setOpen(true);
  }

  const handleUpdateClick = () => {
    const selectedId = selection[0];
    const selected = departments.filter(x => x.ID === selectedId)[0];

    setSelectedDepartment(selected);
    setOpen(true);
  }


  return (
    <Container maxWidth="md" sx={{ mt: 3, ml: '250px' }}>
      <Typography variant="h2">Departments</Typography>
      <CreateModal open={isOpen} onClose={() => setOpen(false)} handleCancel={() => setOpen(false)} title={selectedDepartment ? "Update Department" : "Create Department"}>
        <DepartmentForm 
          onSubmit={handleSubmit} 
          handleCancel={() => setOpen(false)} 
          departments={departments}
          selected={selectedDepartment}
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


export default Department;