package com.cruizk.models;

import java.sql.ResultSet;

public class Course {
  public String ID;
  public String Name;
  public String MeetsAt;
  public String Room;
  public int FacultyID;
  public int Capacity;

  public Course(ResultSet rSet) throws Exception {
    ID = rSet.getString("cid");
    Name = rSet.getString("cname");
    MeetsAt = rSet.getString("meets_at");
    Room = rSet.getString("room");
    FacultyID = rSet.getInt("fid");
    Capacity = rSet.getInt("capacity");
  }
}
