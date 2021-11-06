import { MenuItem, TextField } from "@mui/material";
import { useState } from "react";
import CreateForm from "./CreateForm";


function FacultyForm({ onSubmit, handleCancel, faculty, departments, selected }) {

  const isUpdate = selected ? true : false;
  const [idError, setIdError] = useState(false);
  const [id, setId] = useState(isUpdate ? selected.ID : '');
  const [name, setName] = useState(isUpdate ? selected.Name : '');
  const [deptId, setDeptId] = useState(isUpdate ? selected.DeptID : departments[0].ID);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isUpdate && faculty.map(x => x.ID).indexOf(Number(id)) != -1) {
      setIdError(true);
      return;
    }

    onSubmit({
      ID: id,
      Name: name,
      DeptID: deptId
    }, isUpdate);
  }

  return (
    <CreateForm onSubmit={handleSubmit} onCancel={handleCancel}>
      <TextField type="number" disabled={isUpdate} error={idError} helperText={idError ? "ID Already Exists" : ""} inputProps={{ min: "1" }} sx={{ m: 2 }} required label="ID" value={id} onChange={e => setId(e.target.value)} />
      <TextField sx={{ m: 2 }} required label="Name" value={name} onChange={e => setName(e.target.value)} />
      <TextField select sx={{ m: 2, minWidth: 213 }} required label="Department" value={deptId} onChange={e => setDeptId(e.target.value)}>
        {departments.map(x => <MenuItem key={x.ID} value={x.ID}>{x.Name}</MenuItem>)}
      </TextField>
    </CreateForm>
  )
}

export default FacultyForm;