package program;

import java.io.File;
import java.io.FileNotFoundException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Scanner;

import program.repository.StudentRepository;

public class MySQLAccess {

  public StudentRepository StudentRepo = null;

  private Connection _connection = null;
  private Statement _statement = null;

  public MySQLAccess() throws Exception {
    try {
      Class.forName("com.mysql.cj.jdbc.Driver");
      _connection = DriverManager.getConnection("jdbc:mysql://localhost/university", "root", "password");
      String data = ReadSQLFile("tables.sql");
      String[] statements = data.split(";");
      _statement = _connection.createStatement();
      for (String sql : statements) {
        _statement.executeUpdate(sql); 
      }

      InitalizeRepos();
    } catch (Exception e) {
      System.out.println("Could not create database connection");
      e.printStackTrace();
      throw e;
    }
  }

  private void InitalizeRepos() throws Exception {
    try {
      StudentRepo = new StudentRepository(_connection);
    } catch (Exception e) {
      System.out.println("Could not initalize Repos");
      e.printStackTrace();
      throw e;
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
