import axios from './axios'

export function CreateStaff(staff) {
  return axios.post('/staff/', staff);
}

export function UpdateStaff(id, staff) {
  return axios.patch(`/staff/${id}`, { ...staff });
}

export function DeleteStaff(id) {
  return axios.delete(`/staff/${id}`);
}

export function GetAllStaff() {
  return axios.get('/staff/');
}