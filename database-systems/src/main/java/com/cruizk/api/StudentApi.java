package com.cruizk.api;

import java.sql.Connection;
import java.util.List;

import com.cruizk.dto.UpdateDto;
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
      Spark.get("/", (req, res) -> {
        return GetAll();
      }, _gson::toJson);
      Spark.get("/:sid", (req, res) -> {
        int sid = Integer.parseInt(req.params(":sid"));
        return GetById(sid);
      }, _gson::toJson);
      Spark.delete("/:sid", (req, res) -> {
        int sid = Integer.parseInt(req.params(":sid"));
        return DeleteById(sid);
      }, _gson::toJson);
      Spark.patch("/:sid", (req, res) -> {
        int sid = Integer.parseInt(req.params(":sid"));
        UpdateDto dto = _gson.fromJson(req.body(), UpdateDto.class);
        return UpdateById(sid, dto);
      }, _gson::toJson);
    });
  }

  private List<Student> GetAll() {
    try {
      return _studentRepo.GetAll();
    } catch (Exception e) {
      return null;
    }
  }

  private Student GetById(int sid) {
    try {
      return _studentRepo.GetById(sid);
    } catch (Exception e) {
      return null;
    }
  }

  private String DeleteById(int sid) {
    try {
      _studentRepo.DeleteById(sid);
      return "Deleted";
    } catch (Exception e) {
      return null;
    }
  }

  private String UpdateById(int sid, UpdateDto dto) {
    try {
      _studentRepo.UpdateById(sid, dto.Column, dto.Value);
      return "Updated";
    } catch (Exception e) {
      return null;
    }
  }
}
