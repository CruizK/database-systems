import { TextField } from "@mui/material";
import { useState } from "react";
import CreateForm from "./CreateForm";


function DepartmentForm({ onSubmit, handleCancel, departments, selected }) {

  const isUpdate = selected ? true : false;
  const [idError, setIdError] = useState(false);
  const [id, setId] = useState(isUpdate ? selected.ID : '');
  const [name, setName] = useState(isUpdate ? selected.Name : '');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isUpdate && departments.map(x => x.ID).indexOf(Number(id)) != -1) {
      setIdError(true);
      return;
    }

    onSubmit({
      ID: id,
      Name: name
    }, isUpdate);
  }

  return (
    <CreateForm onSubmit={handleSubmit} onCancel={handleCancel}>
      <TextField type="number" disabled={isUpdate} error={idError} helperText={idError ? "ID Already Exists" : ""} inputProps={{ min: "1" }} sx={{ m: 2 }} required label="ID" value={id} onChange={e => setId(e.target.value)} />
      <TextField sx={{ m: 2 }} required label="Name" value={name} onChange={e => setName(e.target.value)} />
    </CreateForm>
  )
}

export default DepartmentForm;