package com.cruizk.models;

import java.sql.ResultSet;

public class Enrolled {
  public int StudentID;
  public String CourseID;
  public int Exam1;
  public int Exam2;
  public int Final;

  public Enrolled(ResultSet rSet) throws Exception {
    StudentID = rSet.getInt("sid");
    CourseID = rSet.getString("cid");
    Exam1 = rSet.getInt("exam1");
    Exam2 = rSet.getInt("exam2");
    Final = rSet.getInt("final");
  }
}
