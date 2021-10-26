package com.cruizk.models;

import java.sql.ResultSet;

public class Student {
  public int ID;
  public String Name;
  public String Major;
  public String Level;
  public int Age;

  public Student(ResultSet rSet) throws Exception {
    ID = rSet.getInt("sid");
    Name = rSet.getString("sname");
    Major = rSet.getString("major");
    Level = rSet.getString("s_level");
    Age = rSet.getInt("age");
  }
}
