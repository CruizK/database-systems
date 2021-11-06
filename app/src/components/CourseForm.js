import { MenuItem, TextField } from "@mui/material";
import { useState } from "react";
import CreateForm from "./CreateForm";


function CourseForm({ onSubmit, handleCancel, courses, faculty, selected }) {

  const isUpdate = selected ? true : false;
  const [idError, setIdError] = useState(false);
  const [id, setId] = useState(isUpdate ? selected.ID : '');
  const [name, setName] = useState(isUpdate ? selected.Name : '');
  const [meetsAt, setMeetsAt] = useState(isUpdate ? selected.MeetsAt : '');
  const [room, setRoom] = useState(isUpdate ? selected.Room : '');
  const [capacity, setCapacity] = useState(isUpdate ? selected.Capacity : '');
  const [facultyId, setFacultyId] = useState(isUpdate ? selected.FacultyID : '');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isUpdate && courses.map(x => x.ID).indexOf(id) != -1) {
      setIdError(true);
      return;
    }

    onSubmit({
      ID: id,
      Name: name,
      MeetsAt: meetsAt,
      Room: room,
      FacultyID: facultyId,
      Capacity: capacity
    }, isUpdate);
  }

  return (
    <CreateForm onSubmit={handleSubmit} onCancel={handleCancel}>
      <TextField disabled={isUpdate} error={idError} helperText={idError ? "ID Already Exists" : ""} sx={{ m: 2 }} required label="ID" value={id} onChange={e => setId(e.target.value)} />
      <TextField sx={{ m: 2 }} required label="Name" value={name} onChange={e => setName(e.target.value)} />
      <TextField sx={{ m: 2 }} required label="Meets At" value={meetsAt} onChange={e => setMeetsAt(e.target.value)} />
      <TextField sx={{ m: 2 }} required label="Room" value={room} onChange={e => setRoom(e.target.value)} />
      <TextField type="number" inputProps={{ min: "1" }} sx={{ m: 2 }} required label="Capacity" value={capacity} onChange={e => setCapacity(e.target.value)} />
      <TextField select sx={{ m: 2, minWidth: 213 }} required label="Faculty" value={facultyId} onChange={e => setFacultyId(e.target.value)}>
        {faculty.map(x => <MenuItem key={x.ID} value={x.ID}>{x.Name}</MenuItem>)}
      </TextField>
    </CreateForm>
  )
}

export default CourseForm;