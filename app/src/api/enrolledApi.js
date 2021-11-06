import axios from './axios'

export function CreateEnrolled(enrolled) {
  return axios.post('/enrolled/', enrolled);
}

export function UpdateEnrolled(sid, cid, enrolled) {
  return axios.patch(`/enrolled/${sid}/${cid}`, { ...enrolled });
}

export function GetCourseEnrollment(cid) {
  return axios.get(`/enrolled/${cid}`);
}

export function DeleteEnrolled(sid, cid) {
  return axios.delete(`/enrolled/${sid}/${cid}`);
}

export function GetAllEnrolled() {
  return axios.get('/enrolled/');
}