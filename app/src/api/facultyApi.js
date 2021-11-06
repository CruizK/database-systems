import axios from './axios'

export function CreateFaculty(faculty) {
  return axios.post('/faculty/', faculty);
}

export function UpdateFaculty(id, faculty) {
  return axios.patch(`/faculty/${id}`, { ...faculty });
}

export function DeleteFaculty(id) {
  return axios.delete(`/faculty/${id}`);
}

export function GetAllFaculty() {
  return axios.get('/faculty/');
}