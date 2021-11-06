package com.cruizk.repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import com.cruizk.models.Enrolled;
import com.cruizk.models.Student;

public class EnrolledRepository {
  
  private Connection _connection;
  private PreparedStatement _getAll;
  private PreparedStatement _updateById;
  private PreparedStatement _deleteById;
  private PreparedStatement _create;
  private PreparedStatement _getByCourseId;

  public EnrolledRepository(Connection connection) throws Exception {
    _connection = connection;

    try {
      _create = _connection.prepareStatement("INSERT INTO enrolled (sid, cid, exam1, exam2, final) VALUES (?, ?, ?, ?, ?);");
      _deleteById = _connection.prepareStatement("DELETE FROM enrolled WHERE sid = ? AND cid = ?;");
      _updateById = _connection.prepareStatement("UPDATE enrolled SET exam1 = ?, exam2 = ?, final = ? WHERE sid = ? AND cid = ?;");
      _getAll = _connection.prepareStatement("SELECT * FROM enrolled;");
      _getByCourseId = connection.prepareStatement("SELECT * FROM enrolled WHERE cid = ?");
    } catch(Exception e) {
      throw e;
    }
  }

  public void Create(Enrolled enrolled) throws Exception {
    _create.setInt(1, enrolled.StudentID);
    _create.setString(2, enrolled.CourseID);
    _create.setInt(3, enrolled.Exam1);
    _create.setInt(4, enrolled.Exam2);
    _create.setInt(5, enrolled.Final);
    _create.executeUpdate();
  }

  public void DeleteById(int sid, String cid) throws Exception {
    _deleteById.setInt(1, sid);
    _deleteById.setString(2, cid);
    _deleteById.executeUpdate();
  }

  public List<Enrolled> GetAll() throws Exception {
    ResultSet rSet = _getAll.executeQuery();
    List<Enrolled> enrolled = new ArrayList<Enrolled>();
    while(rSet.next()) {
      enrolled.add(new Enrolled(rSet));
    }
    return enrolled;
  }

  public void UpdateById(int sid, String cid, Enrolled enrolled) throws Exception {
    //UPDATE enrolled SET exam1 = ?, exam2 = ?, final = ? WHERE sid = ? AND cid = ?;
    _updateById.setInt(1, enrolled.Exam1);
    _updateById.setInt(2, enrolled.Exam2);
    _updateById.setInt(3, enrolled.Final);
    _updateById.setInt(4, sid);
    _updateById.setString(5, cid);
    _updateById.executeUpdate();
  }

  public List<Enrolled> GetCourseEnrollment(int cid) throws Exception {
    _getByCourseId.setInt(1, cid);
    ResultSet rSet = _getByCourseId.executeQuery();
    List<Enrolled> enrolled = new ArrayList<Enrolled>();
    while(rSet.next()) {
      enrolled.add(new Enrolled(rSet));
    }
    return enrolled;
  }
}
