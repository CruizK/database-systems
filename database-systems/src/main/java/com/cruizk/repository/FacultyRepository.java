package com.cruizk.repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import com.cruizk.models.Faculty;

public class FacultyRepository {
  
  private Connection _connection;
  private PreparedStatement _getAll;
  private PreparedStatement _updateById;
  private PreparedStatement _deleteById;
  private PreparedStatement _create;

  public FacultyRepository(Connection connection) throws Exception {
    _connection = connection;

    try {
      _create = _connection.prepareStatement("INSERT INTO faculty (fid, fname, deptid) VALUES (?, ?, ?);");
      _deleteById = _connection.prepareStatement("DELETE FROM faculty WHERE fid = ?;");
      _updateById = _connection.prepareStatement("UPDATE faculty SET fname = ?, deptid = ? WHERE fid = ?;");
      _getAll = _connection.prepareStatement("SELECT * FROM faculty;");
    } catch(Exception e) {
      throw e;
    }
  }

  public void Create(Faculty faculty) throws Exception {
    _create.setInt(1, faculty.ID);
    _create.setString(2, faculty.Name);
    _create.setInt(3, faculty.DeptID);
    _create.executeUpdate();
  }

  public void DeleteById(int id) throws Exception {
    _deleteById.setInt(1, id);
    _deleteById.executeUpdate();
  }

  public List<Faculty> GetAll() throws Exception {
    ResultSet rSet = _getAll.executeQuery();
    List<Faculty> faculty = new ArrayList<Faculty>();
    while(rSet.next()) {
      faculty.add(new Faculty(rSet));
    }
    return faculty;
  }

  public void UpdateById(int id, Faculty faculty) throws Exception {
    //UPDATE faculty SET fname = ?, deptid = ? WHERE fid = ?;
    _updateById.setString(1, faculty.Name);
    _updateById.setInt(2, faculty.DeptID);
    _updateById.setInt(3, id);
    _updateById.executeUpdate();
  }
}
