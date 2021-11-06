package com.cruizk.models;

import java.sql.ResultSet;

public class Staff {
  public int ID;
  public String Name;
  public int DeptID;

  public Staff(ResultSet rSet) throws Exception {
    ID = rSet.getInt("sid");
    Name = rSet.getString("sname");
    DeptID = rSet.getInt("deptid");
  }
}
