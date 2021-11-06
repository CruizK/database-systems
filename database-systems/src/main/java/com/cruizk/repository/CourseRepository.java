package com.cruizk.repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import com.cruizk.models.Course;

public class CourseRepository {
  
  private Connection _connection;
  private PreparedStatement _getAll;
  private PreparedStatement _updateById;
  private PreparedStatement _deleteById;
  private PreparedStatement _create;

  public CourseRepository(Connection connection) throws Exception {
    _connection = connection;

    try {
      _create = _connection.prepareStatement("INSERT INTO course (cid, cname, meets_at, room, fid, capacity) VALUES (?, ?, ?, ?, ?, ?);");
      _deleteById = _connection.prepareStatement("DELETE FROM course WHERE cid = ?;");
      _updateById = _connection.prepareStatement("UPDATE course SET cname = ?, meets_at = ?, room = ?, fid = ?, capacity = ? WHERE did = ?;");
      _getAll = _connection.prepareStatement("SELECT * FROM course;");
    } catch(Exception e) {
      throw e;
    }
  }

  public void Create(Course course) throws Exception {
    _create.setString(1, course.ID);
    _create.setString(2, course.Name);
    _create.setString(3, course.MeetsAt);
    _create.setString(4, course.Room);
    _create.setInt(5, course.FacultyID);
    _create.setInt(6, course.Capacity);
    _create.executeUpdate();
  }

  public void DeleteById(String id) throws Exception {
    _deleteById.setString(1, id);
    _deleteById.executeUpdate();
  }

  public List<Course> GetAll() throws Exception {
    ResultSet rSet = _getAll.executeQuery();
    List<Course> courses = new ArrayList<Course>();
    while(rSet.next()) {
      courses.add(new Course(rSet));
    }
    return courses;
  }

  public void UpdateById(String id, Course course) throws Exception {
    //UPDATE course SET cname = ?, meets_at = ?, room = ?, fid = ?, capacity = ? WHERE did = ?;
    _updateById.setString(1, course.Name);
    _updateById.setString(2, course.MeetsAt);
    _updateById.setString(3, course.Room);
    _updateById.setInt(4, course.FacultyID);
    _updateById.setInt(5, course.Capacity);
    _updateById.setString(6, course.ID);
    _updateById.executeUpdate();
  }
}
