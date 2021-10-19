import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;

public class MySQLAccess {
  private Connection connect = null;
  private Statement statement = null;
  private PreparedStatement preparedStatement = null;
  private ResultSet resultSet = null;

  public void ConnectDatabase() throws Exception {
    try {
      Class.forName("com.mysql.cj.jdbc.Driver");
      connect = DriverManager.getConnection("jdbc:mysql://localhost/university", "root", "password");
      statement = connect.createStatement();
      resultSet = statement.executeQuery("select * from university.students");
    } catch (Exception e) {
      throw e;
    }
  }
}
