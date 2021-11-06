import { TextField } from "@mui/material";
import { useState } from "react";
import CreateForm from "./CreateForm";


function StudentForm({ onSubmit, handleCancel, students, selected }) {

  const isUpdate = selected ? true : false;

  const [idError, setIdError] = useState(false);
  const [id, setId] = useState(isUpdate ? selected.ID : '');
  const [name, setName] = useState(isUpdate ? selected.Name : '');
  const [major, setMajor] = useState(isUpdate ? selected.Major : '');
  const [level, setLevel] = useState(isUpdate ? selected.Level : '');
  const [age, setAge] = useState(isUpdate ? selected.Age : '');
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!isUpdate && students.map(x => x.ID).indexOf(Number(id)) != -1) {
      setIdError(true);
      return;
    }

    onSubmit({
      ID: id,
      Name: name,
      Major: major,
      Level: level,
      Age: age
    }, isUpdate);
  }

  return (
    <CreateForm onSubmit={handleSubmit} onCancel={handleCancel}>
      <TextField type="number" disabled={isUpdate} error={idError} helperText={idError ? "ID Already Exists" : ""} inputProps={{ min: "1" }} sx={{ m: 2 }} required label="ID" value={id} onChange={e => setId(e.target.value)} />
      <TextField sx={{ m: 2 }} required label="Name" value={name} onChange={e => setName(e.target.value)} />
      <TextField sx={{ m: 2 }} required label="Major" value={major} onChange={e => setMajor(e.target.value)} />
      <TextField sx={{ m: 2 }} required label="Level" value={level} onChange={e => setLevel(e.target.value)} />
      <TextField type="number" inputProps={{ min: "1" }} sx={{ m: 2 }} required label="Age" value={age} onChange={e => setAge(e.target.value)} />
    </CreateForm>
  )
}

export default StudentForm;