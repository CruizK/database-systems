package com.cruizk.repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import com.cruizk.models.Student;

public class StudentRepository {
  
  private Connection _connection;
  private PreparedStatement _getAll;
  private PreparedStatement _updateById;
  private PreparedStatement _deleteById;
  private PreparedStatement _getById;

  public StudentRepository(Connection connection) throws Exception {
    _connection = connection;

    try {
      _deleteById = _connection.prepareStatement("DELETE FROM student WHERE sid = ?;");
      _updateById = _connection.prepareStatement("UPDATE student SET ? = ? WHERE sid = ?;");
      _getAll = _connection.prepareStatement("SELECT * FROM student;");
      _getById = _connection.prepareStatement("SELECT * FROM student WHERE sid = ?;");
    } catch(Exception e) {
      throw e;
    }
  }

  public void DeleteById(int sid) throws Exception {
    try {
      _deleteById.setInt(1, sid);
      _deleteById.executeQuery();
    } catch(Exception e) {
      System.out.println("An error occurred.");
      e.printStackTrace();
    }
  }

  public List<Student> GetAll() throws Exception {
    try {
      ResultSet rSet = _getAll.executeQuery();
      List<Student> students = new ArrayList<Student>();
      while(rSet.next()) {
        students.add(new Student(rSet));
      }
      return students;
    } catch(Exception e) {
      System.out.println("An error occurred.");
      e.printStackTrace();
      return null;
    }
  }

  public void UpdateById(int sid, String column, String value) throws Exception {
    try {
      _updateById.setString(1, column);
      _updateById.setString(2, value);
      _updateById.setInt(3, sid);
      _updateById.executeUpdate();
    } catch(Exception e) {
      System.out.println("An error occurred.");
      e.printStackTrace();
    }
  }

  public Student GetById(int sid) throws Exception {
    try {
      _getById.setInt(1, sid);
      ResultSet rSet = _getById.executeQuery();
      return new Student(rSet);
    } catch(Exception e) {
      System.out.println("An error occurred.");
      e.printStackTrace();
      return null;
    }
  }
}
