package program;

import java.io.File;
import java.io.FileNotFoundException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Scanner;

public class MySQLAccess {
  private Connection connect = null;
  private Statement statement = null;

  public void ConnectDatabase() throws Exception {
    try {
      Class.forName("com.mysql.cj.jdbc.Driver");
      connect = DriverManager.getConnection("jdbc:mysql://localhost/university", "root", "password");
      String data = ReadSQLFile("tables.sql");
      String[] statements = data.split(";");
      statement = connect.createStatement();
      for (String sql : statements) {
        statement.executeUpdate(sql); 
      }
    } catch (Exception e) {
      throw e;
    }
  }

  public PreparedStatement GetStatement(String sql) throws Exception {
    try {
      return connect.prepareStatement(sql);
    } catch (SQLException e) {
      System.out.println("An error occurred.");
      e.printStackTrace();
      return null;
    }
  }

  private String ReadSQLFile(String filepath) throws Exception {
    try {
      File myObj = new File(filepath);
      Scanner myReader = new Scanner(myObj);
      String data = "";
      while (myReader.hasNextLine()) {
        data += myReader.nextLine();
      }
      myReader.close();

      return data;
    } catch (FileNotFoundException e) {
      System.out.println("An error occurred.");
      e.printStackTrace();
      return "";
    }
  }
}
