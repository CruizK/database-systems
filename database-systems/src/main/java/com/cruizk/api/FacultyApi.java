package com.cruizk.api;

import java.sql.Connection;
import java.util.List;

import com.cruizk.models.Faculty;
import com.cruizk.repository.FacultyRepository;
import com.google.gson.Gson;

import spark.Spark;

public class FacultyApi {
  
  private FacultyRepository _facultyRepo = null;
  private Gson _gson = null;

  public FacultyApi(Connection connection) throws Exception {
    _facultyRepo = new FacultyRepository(connection);
    _gson = new Gson();

    Spark.path("/faculty", () -> {
      Spark.before("/*", (req, res) -> res.type("application/json"));
      Spark.post("/", (req, res) -> {
        Faculty dto = _gson.fromJson(req.body(), Faculty.class);
        System.out.println(dto.ID);
        return Create(dto);
      }, _gson::toJson);
      Spark.get("/", (req, res) -> {
        return GetAll();
      }, _gson::toJson);
      Spark.delete("/:id", (req, res) -> {
        int id = Integer.parseInt(req.params(":id"));
        return DeleteById(id);
      }, _gson::toJson);
      Spark.patch("/:id", (req, res) -> {
        int id = Integer.parseInt(req.params(":id"));
        Faculty dto = _gson.fromJson(req.body(), Faculty.class);
        return UpdateById(id, dto);
      }, _gson::toJson);
    });
  }

  private List<Faculty> GetAll() {
    try {
      return _facultyRepo.GetAll();
    } catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  private String Create(Faculty dto) {
    try {
      _facultyRepo.Create(dto);
      return "Created";
    } catch(Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  private String DeleteById(int id) {
    try {
      _facultyRepo.DeleteById(id);
      return "Deleted";
    } catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  private String UpdateById(int id, Faculty dto) {
    try {
      _facultyRepo.UpdateById(id, dto);
      return "Updated";
    } catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }
}
