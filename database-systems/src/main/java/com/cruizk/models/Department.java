package com.cruizk.models;

import java.sql.ResultSet;

public class Department {
  public int ID;
  public String Name;

  public Department(ResultSet rSet) throws Exception {
    ID = rSet.getInt("did");
    Name = rSet.getString("dname");
  }
}