package program.models;

import java.sql.ResultSet;

public class Course {
  public String ID;
  public String Name;
  public String MeetsAt;
  public String Room;
  public int FID;
  public int Capacity;

  public Course(ResultSet rSet) {
    
  }
}
