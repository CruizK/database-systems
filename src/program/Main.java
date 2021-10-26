package program;

import java.util.List;
import program.models.Student;
import static spark.Spark.*;

public class Main {

  public static void main(String[] args) {
    System.out.println("Hello World, Java app"); 

    try {
      MySQLAccess mysql = new MySQLAccess();
    } catch (Exception e) {
      System.out.println(e.toString());
    }

    port(8080);
  }
}
