package com.cruizk.api;

import java.sql.Connection;
import java.util.List;

import com.cruizk.models.Department;
import com.cruizk.repository.DepartmentRepository;
import com.google.gson.Gson;

import spark.Spark;

public class DepartmentApi {
  
  private DepartmentRepository _departmentRepo = null;
  private Gson _gson = null;

  public DepartmentApi(Connection connection) throws Exception {
    _departmentRepo = new DepartmentRepository(connection);
    _gson = new Gson();

    Spark.path("/department", () -> {
      Spark.before("/*", (req, res) -> res.type("application/json"));
      Spark.post("/", (req, res) -> {
        Department dto = _gson.fromJson(req.body(), Department.class);
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
        Department dto = _gson.fromJson(req.body(), Department.class);
        return UpdateById(id, dto);
      }, _gson::toJson);
    });
  }

  private List<Department> GetAll() {
    try {
      return _departmentRepo.GetAll();
    } catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  private String Create(Department dto) {
    try {
      _departmentRepo.Create(dto);
      return "Created";
    } catch(Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  private String DeleteById(int id) {
    try {
      _departmentRepo.DeleteById(id);
      return "Deleted";
    } catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  private String UpdateById(int id, Department dto) {
    try {
      _departmentRepo.UpdateById(id, dto);
      return "Updated";
    } catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }
}
