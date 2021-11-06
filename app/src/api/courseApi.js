import axios from './axios'

export function CreateCourse(course) {
  return axios.post('/course/', course);
}

export function UpdateCourse(id, course) {
  return axios.patch(`/course/${id}`, { ...course });
}

export function DeleteCourse(id) {
  return axios.delete(`/course/${id}`);
}

export function GetAllCourse() {
  return axios.get('/course/');
}