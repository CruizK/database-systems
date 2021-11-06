package com.cruizk.api;

import java.sql.Connection;
import java.util.List;

import com.cruizk.models.Course;
import com.cruizk.repository.CourseRepository;
import com.google.gson.Gson;

import spark.Spark;

public class CourseApi {
  
  private CourseRepository _courseRepo = null;
  private Gson _gson = null;

  public CourseApi(Connection connection) throws Exception {
    _courseRepo = new CourseRepository(connection);
    _gson = new Gson();

    Spark.path("/course", () -> {
      Spark.before("/*", (req, res) -> res.type("application/json"));
      Spark.post("/", (req, res) -> {
        Course dto = _gson.fromJson(req.body(), Course.class);
        System.out.println(dto.ID);
        return Create(dto);
      }, _gson::toJson);
      Spark.get("/", (req, res) -> {
        return GetAll();
      }, _gson::toJson);
      Spark.delete("/:id", (req, res) -> {
        String id = req.params(":id");
        return DeleteById(id);
      }, _gson::toJson);
      Spark.patch("/:id", (req, res) -> {
        String id = req.params(":id");
        Course dto = _gson.fromJson(req.body(), Course.class);
        return UpdateById(id, dto);
      }, _gson::toJson);
    });
  }

  private List<Course> GetAll() {
    try {
      return _courseRepo.GetAll();
    } catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  private String Create(Course dto) {
    try {
      _courseRepo.Create(dto);
      return "Created";
    } catch(Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  private String DeleteById(String id) {
    try {
      _courseRepo.DeleteById(id);
      return "Deleted";
    } catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  private String UpdateById(String id, Course dto) {
    try {
      _courseRepo.UpdateById(id, dto);
      return "Updated";
    } catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }
}
