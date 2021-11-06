package com.cruizk.repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import com.cruizk.models.Staff;

public class StaffRepository {
  
  private Connection _connection;
  private PreparedStatement _getAll;
  private PreparedStatement _updateById;
  private PreparedStatement _deleteById;
  private PreparedStatement _create;

  public StaffRepository(Connection connection) throws Exception {
    _connection = connection;

    try {
      _create = _connection.prepareStatement("INSERT INTO staff (sid, sname, deptid) VALUES (?, ?, ?);");
      _deleteById = _connection.prepareStatement("DELETE FROM staff WHERE sid = ?;");
      _updateById = _connection.prepareStatement("UPDATE staff SET sname = ?, deptid = ? WHERE sid = ?;");
      _getAll = _connection.prepareStatement("SELECT * FROM staff;");
    } catch(Exception e) {
      throw e;
    }
  }

  public void Create(Staff staff) throws Exception {
    _create.setInt(1, staff.ID);
    _create.setString(2, staff.Name);
    _create.setInt(3, staff.DeptID);
    _create.executeUpdate();
  }

  public void DeleteById(int id) throws Exception {
    _deleteById.setInt(1, id);
    _deleteById.executeUpdate();
  }

  public List<Staff> GetAll() throws Exception {
    ResultSet rSet = _getAll.executeQuery();
    List<Staff> staff = new ArrayList<Staff>();
    while(rSet.next()) {
      staff.add(new Staff(rSet));
    }
    return staff;
  }

  public void UpdateById(int id, Staff staff) throws Exception {
    //UPDATE staff SET sname = ?, deptid = ? WHERE sid = ?;
    _updateById.setString(1, staff.Name);
    _updateById.setInt(2, staff.DeptID);
    _updateById.setInt(3, id);
    _updateById.executeUpdate();
  }
}
