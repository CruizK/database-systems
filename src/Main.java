public class Main {

  public static void main(String[] args) {
    System.out.println("Hello World, Java app"); 

    try {
      MySQLAccess mysql = new MySQLAccess();
      mysql.ConnectDatabase();
    } catch (Exception e) {
      System.out.println(e.toString());
    }
  }
}
