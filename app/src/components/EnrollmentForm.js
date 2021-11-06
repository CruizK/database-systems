import { MenuItem, TextField } from "@mui/material";
import { useState } from "react";
import CreateForm from "./CreateForm";


function EnrollmentForm({ onSubmit, handleCancel, enrollment, courses, students, selected }) {

  const isUpdate = selected ? true : false;
  const [idError, setIdError] = useState(false);
  const [courseId, setCourseId] = useState(isUpdate ? selected.CourseID : '');
  const [studentId, setStudentId] = useState(isUpdate ? selected.StudentID : '');
  const [exam1, setExam1] = useState(isUpdate ? selected.Exam1 : 0);
  const [exam2, setExam2] = useState(isUpdate ? selected.Exam2 : 0);
  const [final, setFinal] = useState(isUpdate ? selected.Final : 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isUpdate && enrollment.filter(x => x.StudentID == studentId && x.CourseID == courseId).length != 0) {
      setIdError(true);
      return;
    }

    onSubmit({
      CourseID: courseId,
      StudentID: studentId,
      Exam1: exam1,
      Exam2: exam2,
      Final: final
    }, isUpdate);
  }

  return (
    <CreateForm onSubmit={handleSubmit} onCancel={handleCancel}>
      <TextField select disabled={isUpdate} sx={{ m: 2, minWidth: 213 }} error={idError} helperText={idError ? "ID Already Exists" : ""} required label="Course" value={courseId} onChange={e => setCourseId(e.target.value)}>
        {courses.map(x => <MenuItem key={x.ID} value={x.ID}>{x.Name}</MenuItem>)}
      </TextField>
      <TextField select disabled={isUpdate} sx={{ m: 2, minWidth: 213 }} error={idError} helperText={idError ? "ID Already Exists" : ""} required label="Student" value={studentId} onChange={e => setStudentId(e.target.value)}>
        {students.map(x => <MenuItem key={x.ID} value={x.ID}>{x.Name}</MenuItem>)}
      </TextField>
      <TextField type="number" inputProps={{ min: "0" }} sx={{ m: 2 }} label="Exam 1" value={exam1} onChange={e => setExam1(e.target.value)} />
      <TextField type="number" inputProps={{ min: "0" }} sx={{ m: 2 }} label="Exam 2" value={exam2} onChange={e => setExam2(e.target.value)} />
      <TextField type="number" inputProps={{ min: "0" }} sx={{ m: 2 }} label="Final" value={final} onChange={e => setFinal(e.target.value)} />
    </CreateForm>
  )
}

export default EnrollmentForm;