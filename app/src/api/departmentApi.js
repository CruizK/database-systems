import axios from './axios'

export function CreateDepartment(department) {
  return axios.post('/department/', department);
}

export function UpdateDepartment(id, department) {
  return axios.patch(`/department/${id}`, { ...department });
}

export function DeleteDepartment(id) {
  return axios.delete(`/department/${id}`);
}

export function GetAllDepartment() {
  return axios.get('/department/');
}