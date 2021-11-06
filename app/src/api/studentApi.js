import axios from './axios'

export function CreateStudent(student) {
  return axios.post('/students/', student);
}

export function UpdateStudent(id, student) {
  return axios.patch(`/students/${id}`, { ...student });
}

export function DeleteStudent(id) {
  return axios.delete(`/students/${id}`);
}

export function GetAllStudents() {
  return axios.get('/students/');
}