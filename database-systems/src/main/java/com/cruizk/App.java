package com.cruizk;

import com.cruizk.api.CourseApi;
import com.cruizk.api.DepartmentApi;
import com.cruizk.api.EnrolledApi;
import com.cruizk.api.FacultyApi;
import com.cruizk.api.StaffApi;
import com.cruizk.api.StudentApi;

import spark.Filter;
import spark.Spark;

public class App {
  public static void main(String[] args) {
    System.out.println("Hello World!");
    MySQLAccess mysql = null;
    StudentApi studentApi = null;
    StaffApi staffApi = null;
    FacultyApi facultyApi = null;
    DepartmentApi departmentApi = null;
    CourseApi courseApi = null;
    EnrolledApi enrolledApi = null;
    Spark.port(8080);

    Spark.options("/*", (request, response) -> {

      String accessControlRequestHeaders = request.headers("Access-Control-Request-Headers");
      if (accessControlRequestHeaders != null) {
        response.header("Access-Control-Allow-Headers", accessControlRequestHeaders);
      }

      String accessControlRequestMethod = request.headers("Access-Control-Request-Method");
      if (accessControlRequestMethod != null) {
        response.header("Access-Control-Allow-Methods", accessControlRequestMethod);
      }

      return "OK";
    });

    Spark.before((request, response) -> response.header("Access-Control-Allow-Origin", "*"));

    try {
      mysql = new MySQLAccess();
      studentApi = new StudentApi(mysql.Connection);
      staffApi = new StaffApi(mysql.Connection);
      facultyApi = new FacultyApi(mysql.Connection);
      departmentApi = new DepartmentApi(mysql.Connection);
      courseApi = new CourseApi(mysql.Connection);
      enrolledApi = new EnrolledApi(mysql.Connection);
    } catch (Exception e) {
      System.out.println(e.toString());
    }
  }
}
