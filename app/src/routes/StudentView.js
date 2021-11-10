import { Container, Divider, Grid, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { GetAllCourse } from "../api/courseApi";
import { GetAllDepartment } from "../api/departmentApi";
import { CreateEnrolled, DeleteEnrolled, GetAllEnrolled } from "../api/enrolledApi";
import { GetAllFaculty } from "../api/facultyApi";
import CourseSearch from "../components/CourseSearch";
import EnrolledCourses from "../components/EnrolledCourses";
import UserContext from "../userContext";

function StudentView() {
  const { user } = useContext(UserContext);


  const [data, setData] = useState(null);

  useEffect(() => {
    async function work() {
      try {
        const res = await GetAllCourse()
        const deps = await GetAllFaculty();
        const deps2 = await GetAllDepartment();
        const deps3 = await GetAllEnrolled();
        const courses = res.data;
        const faculty = deps.data;
        const departments = deps2.data;
        const enrolled = deps3.data;

        setData({ courses, faculty, departments, enrolled });
      } catch(e) {
        console.error(e);
      }  
    }

    work();
  }, [])

  const enrollStudent = async (enroll) => {
    await CreateEnrolled(enroll);
    const res = await GetAllEnrolled();

    setData({
      ...data,
      enrolled: res.data
    })
  }

  const unenrollStudent = async (courseID) => {
    await DeleteEnrolled(user.ID, courseID);
    const res = await GetAllEnrolled();

    setData({
      ...data,
      enrolled: res.data
    })
  }

  return (
    <Container maxWidth="md" sx={{ mt: 3, ml: '250px' }}>
      <Typography variant="h3">{user.Name}</Typography>
      <Divider sx={{ mb: 3 }}></Divider>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography sx={{ fontWeight: 600 }}>Name</Typography>
          {user.Name}
        </Grid>
        <Grid item xs={6}>
          <Typography sx={{ fontWeight: 600 }}>Major</Typography>
          {user.Major}
        </Grid>
        <Grid item xs={6}>
          <Typography sx={{ fontWeight: 600 }}>Level</Typography>
          {user.Level}
        </Grid>
        <Grid item xs={6}>
          <Typography sx={{ fontWeight: 600 }}>Age</Typography>
          {user.Age}
        </Grid>
      </Grid>
      <EnrolledCourses data={data} unenrollStudent={unenrollStudent}/>
      <CourseSearch data={data} enrollStudent={enrollStudent}/>

    </Container>
  )
}

export default StudentView