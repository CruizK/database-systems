package com.cruizk.api;

import java.sql.Connection;
import java.util.List;

import com.cruizk.models.Enrolled;
import com.cruizk.repository.EnrolledRepository;
import com.google.gson.Gson;

import spark.Spark;

public class EnrolledApi {
  
  private EnrolledRepository _enrolledRepo = null;
  private Gson _gson = null;

  public EnrolledApi(Connection connection) throws Exception {
    _enrolledRepo = new EnrolledRepository(connection);
    _gson = new Gson();

    Spark.path("/enrolled", () -> {
      Spark.before("/*", (req, res) -> res.type("application/json"));
      Spark.post("/", (req, res) -> {
        Enrolled dto = _gson.fromJson(req.body(), Enrolled.class);
        return Create(dto);
      }, _gson::toJson);
      Spark.get("/", (req, res) -> {
        return GetAll();
      }, _gson::toJson);
      Spark.get("/:cid", (req, res) -> {
        int cid = Integer.parseInt(req.params(":cid"));
        return GetCourseEnrollment(cid);
      });
      Spark.delete("/:sid/:cid", (req, res) -> {
        int sid = Integer.parseInt(req.params(":sid"));
        String cid = req.params(":cid");
        return DeleteById(sid, cid);
      }, _gson::toJson);
      Spark.patch("/:sid/:cid", (req, res) -> {
        int sid = Integer.parseInt(req.params(":sid"));
        String cid = req.params(":cid");
        Enrolled dto = _gson.fromJson(req.body(), Enrolled.class);
        return UpdateById(sid, cid, dto);
      }, _gson::toJson);
    });
  }

  private List<Enrolled> GetCourseEnrollment(int cid) {
    try {
      return _enrolledRepo.GetCourseEnrollment(cid);
    } catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  private List<Enrolled> GetAll() {
    try {
      return _enrolledRepo.GetAll();
    } catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  private String Create(Enrolled dto) {
    try {
      _enrolledRepo.Create(dto);
      return "Created";
    } catch(Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  private String DeleteById(int sid, String cid) {
    try {
      _enrolledRepo.DeleteById(sid, cid);
      return "Deleted";
    } catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  private String UpdateById(int sid, String cid, Enrolled dto) {
    try {
      _enrolledRepo.UpdateById(sid, cid, dto);
      return "Updated";
    } catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }
}
