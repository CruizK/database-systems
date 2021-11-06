package com.cruizk.api;

import java.sql.Connection;
import java.util.List;

import com.cruizk.models.Staff;
import com.cruizk.repository.StaffRepository;
import com.google.gson.Gson;

import spark.Spark;

public class StaffApi {
  
  private StaffRepository _staffRepo = null;
  private Gson _gson = null;

  public StaffApi(Connection connection) throws Exception {
    _staffRepo = new StaffRepository(connection);
    _gson = new Gson();

    Spark.path("/staff", () -> {
      Spark.before("/*", (req, res) -> res.type("application/json"));
      Spark.post("/", (req, res) -> {
        Staff dto = _gson.fromJson(req.body(), Staff.class);
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
        Staff dto = _gson.fromJson(req.body(), Staff.class);
        return UpdateById(id, dto);
      }, _gson::toJson);
    });
  }

  private List<Staff> GetAll() {
    try {
      return _staffRepo.GetAll();
    } catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  private String Create(Staff dto) {
    try {
      _staffRepo.Create(dto);
      return "Created";
    } catch(Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  private String DeleteById(int id) {
    try {
      _staffRepo.DeleteById(id);
      return "Deleted";
    } catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  private String UpdateById(int id, Staff dto) {
    try {
      _staffRepo.UpdateById(id, dto);
      return "Updated";
    } catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }
}
