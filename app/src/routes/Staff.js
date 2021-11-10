import { Box, Container, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { CreateStaff, DeleteStaff, GetAllStaff, UpdateStaff } from "../api/staffApi";
import { GetAllDepartment } from '../api/departmentApi'
import StaffForm from "../components/StaffForm";
import CreateModal from "../components/CreateModal";
import Toolbar from '../components/Toolbar';
import Search from "../utils/searchFunc";

function Staff() {

  const [rows, setRows] = useState([]);
  const [staff, setStaff] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
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
        const res = await GetAllStaff()
        const deps = await GetAllDepartment();
        setStaff(res.data);
        setDepartments(deps.data);
        setRows(res.data.map(x => ({id: x.ID, ...x })));
      } catch(e) {
        console.error(e);
      }  
    }

    work();
  }, [])

  const onSearchSubmit = (value) => {
    setRows(Search(value, staff.map(x => ({ id: x.ID, ...x }))))
  }

  const handleSubmit = async (staff, isUpdate) => {
    if(isUpdate) {
      await UpdateStaff(staff.ID, staff);
    }
    else {
      await CreateStaff(staff);
    }

    const res = await GetAllStaff()
    setRows(res.data.map(x => ({id: x.ID, ...x })));
    setStaff(res.data);
    setOpen(false);
  }

  const handleDelete = async () => {
    await DeleteStaff(selection[0]);
    const res = await GetAllStaff()
    setSelection([]);
    setRows(res.data.map(x => ({id: x.ID, ...x })));
    setStaff(res.data);
  }

  const handleCreateClicked = () => {
    setSelectedStaff(null);
    setOpen(true);
  }

  const handleUpdateClick = () => {
    const selectedId = selection[0];
    const selected = staff.filter(x => x.ID === selectedId)[0];

    setSelectedStaff(selected);
    setOpen(true);
  }

  return (
    <Container maxWidth="md" sx={{ mt: 3, ml: '250px' }}>
      <Typography variant="h2">Staff</Typography>
      <CreateModal open={isOpen} onClose={() => setOpen(false)} handleCancel={() => setOpen(false)} title={selectedStaff ? "Update Staff" : "Create Staff"}>
        <StaffForm 
          onSubmit={handleSubmit} 
          handleCancel={() => setOpen(false)} 
          staff={staff} 
          departments={departments} 
          selected={selectedStaff}
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