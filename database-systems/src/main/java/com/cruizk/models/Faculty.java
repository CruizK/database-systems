package com.cruizk.models;

import java.sql.ResultSet;

public class Faculty {
  public int ID;
  public String Name;
  public int DeptID;

  public Faculty(ResultSet rSet) throws Exception {
    ID = rSet.getInt("fid");
    Name = rSet.getString("fname");
    DeptID = rSet.getInt("deptid");
  }
}
