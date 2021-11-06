package com.cruizk.repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import com.cruizk.dto.CreateStudentDto;
import com.cruizk.models.Student;

public class StudentRepository {
  
  private Connection _connection;
  private PreparedStatement _getAll;
  private PreparedStatement _updateById;
  private PreparedStatement _deleteById;
  private PreparedStatement _create;

  public StudentRepository(Connection connection) throws Exception {
    _connection = connection;

    try {
      _create = _connection.prepareStatement("INSERT INTO student (sid, sname, major, s_level, age) VALUES (?, ?, ?, ?, ?);");
      _deleteById = _connection.prepareStatement("DELETE FROM student WHERE sid = ?;");
      _updateById = _connection.prepareStatement("UPDATE student SET sname = ?, major = ?, s_level = ?, age = ? WHERE sid = ?;");
      _getAll = _connection.prepareStatement("SELECT * FROM student;");
    } catch(Exception e) {
      throw e;
    }
  }

  public void Create(CreateStudentDto dto) throws Exception {
    _create.setInt(1, dto.ID);
    _create.setString(2, dto.Name);
    _create.setString(3, dto.Major);
    _create.setString(4, dto.Level);
    _create.setInt(5, dto.Age);
    _create.executeUpdate();
  }

  public void DeleteById(int sid) throws Exception {
    _deleteById.setInt(1, sid);
    _deleteById.executeUpdate();
  }

  public List<Student> GetAll() throws Exception {
    ResultSet rSet = _getAll.executeQuery();
    List<Student> students = new ArrayList<Student>();
    while(rSet.next()) {
      students.add(new Student(rSet));
    }
    return students;
  }

  public void UpdateById(int sid, Student student) throws Exception {
    //"UPDATE student SET sname = ?, major = ?, s_level = ?, age = ?, WHERE sid = ?;"
    _updateById.setString(1, student.Name);
    _updateById.setString(2, student.Major);
    _updateById.setString(3, student.Level);
    _updateById.setInt(4, student.Age);
    _updateById.setInt(5, sid);
    _updateById.executeUpdate();
  }
}
