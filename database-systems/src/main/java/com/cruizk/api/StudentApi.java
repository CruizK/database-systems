package com.cruizk.api;

import java.sql.Connection;
import java.util.List;

import com.cruizk.dto.CreateStudentDto;
import com.cruizk.models.Student;
import com.cruizk.repository.StudentRepository;
import com.google.gson.Gson;

import spark.Spark;

public class StudentApi {
  
  private StudentRepository _studentRepo = null;
  private Gson _gson = null;

  public StudentApi(Connection connection) throws Exception {
    _studentRepo = new StudentRepository(connection);
    _gson = new Gson();

    Spark.path("/students", () -> {
      Spark.before("/*", (req, res) -> res.type("application/json"));
      Spark.post("/", (req, res) -> {
        CreateStudentDto dto = _gson.fromJson(req.body(), CreateStudentDto.class);
        System.out.println(dto.ID);
        return Create(dto);
      }, _gson::toJson);
      Spark.get("/", (req, res) -> {
        return GetAll();
      }, _gson::toJson);
      Spark.delete("/:sid", (req, res) -> {
        int sid = Integer.parseInt(req.params(":sid"));
        return DeleteById(sid);
      }, _gson::toJson);
      Spark.patch("/:sid", (req, res) -> {
        int sid = Integer.parseInt(req.params(":sid"));
        Student dto = _gson.fromJson(req.body(), Student.class);
        return UpdateById(sid, dto);
      }, _gson::toJson);
    });
  }

  private List<Student> GetAll() {
    try {
      return _studentRepo.GetAll();
    } catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  private String Create(CreateStudentDto dto) {
    try {
      _studentRepo.Create(dto);
      return "Created";
    } catch(Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  private String DeleteById(int sid) {
    try {
      _studentRepo.DeleteById(sid);
      return "Deleted";
    } catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  private String UpdateById(int sid, Student student) {
    try {
      _studentRepo.UpdateById(sid, student);
      return "Updated";
    } catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }
}
