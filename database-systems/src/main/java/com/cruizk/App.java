package com.cruizk;

import com.cruizk.api.StudentApi;

import spark.Spark;

public class App {
  public static void main(String[] args) {
    System.out.println("Hello World!");
    MySQLAccess mysql = null;
    StudentApi studentApi = null;
    Spark.port(8080);

    try {
      mysql = new MySQLAccess();
      studentApi = new StudentApi(mysql.Connection);
    } catch (Exception e) {
      System.out.println(e.toString());
    }
  }
}
