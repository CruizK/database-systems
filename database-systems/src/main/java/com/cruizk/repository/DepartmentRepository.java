package com.cruizk.repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import com.cruizk.models.Department;

public class DepartmentRepository {
  
  private Connection _connection;
  private PreparedStatement _getAll;
  private PreparedStatement _updateById;
  private PreparedStatement _deleteById;
  private PreparedStatement _create;

  public DepartmentRepository(Connection connection) throws Exception {
    _connection = connection;

    try {
      _create = _connection.prepareStatement("INSERT INTO department (did, dname) VALUES (?, ?);");
      _deleteById = _connection.prepareStatement("DELETE FROM department WHERE did = ?;");
      _updateById = _connection.prepareStatement("UPDATE department SET dname = ? WHERE did = ?;");
      _getAll = _connection.prepareStatement("SELECT * FROM department;");
    } catch(Exception e) {
      throw e;
    }
  }

  public void Create(Department department) throws Exception {
    _create.setInt(1, department.ID);
    _create.setString(2, department.Name);
    _create.executeUpdate();
  }

  public void DeleteById(int id) throws Exception {
    _deleteById.setInt(1, id);
    _deleteById.executeUpdate();
  }

  public List<Department> GetAll() throws Exception {
    ResultSet rSet = _getAll.executeQuery();
    List<Department> departments = new ArrayList<Department>();
    while(rSet.next()) {
      departments.add(new Department(rSet));
    }
    return departments;
  }

  public void UpdateById(int id, Department department) throws Exception {
    //UPDATE department SET dname = ? WHERE did = ?;
    _updateById.setString(1, department.Name);
    _updateById.setInt(2, department.ID);
    _updateById.executeUpdate();
  }
}
