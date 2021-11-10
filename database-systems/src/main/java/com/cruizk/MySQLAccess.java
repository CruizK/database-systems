package com.cruizk;

import java.io.File;
import java.io.FileNotFoundException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.util.Scanner;


public class MySQLAccess {

  public Connection Connection = null;
  private Statement _statement = null;

  public MySQLAccess() throws Exception {
    try {
      Class.forName("com.mysql.cj.jdbc.Driver");
      Connection = DriverManager.getConnection("jdbc:mysql://localhost/university", "root", "password");
      _statement = Connection.createStatement();
      RunSQLFile("tables.sql");
      //RunSQLFile("data.sql");
    } catch (Exception e) {
      System.out.println("Could not create database connection");
      e.printStackTrace();
      throw e;
    }
  }

  private void RunSQLFile(String filepath) throws Exception {
    try {
      File myObj = new File(filepath);
      Scanner myReader = new Scanner(myObj);
      String data = "";
      while (myReader.hasNextLine()) {
        data += myReader.nextLine();
      }
      myReader.close();

      String[] statements = data.split(";");
      for (String sql : statements) {
        _statement.executeUpdate(sql);
      }
    } catch (FileNotFoundException e) {
      System.out.println("An error occurred.");
      e.printStackTrace();
    }
  }
}
