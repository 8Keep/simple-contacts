<?php
class User{

    // database connection and table name
    private $conn;
    private $table_name = "users";

    // object properties
    public $id;
    public $username;
    public $password;

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    function create($name, $password){

        // query to insert record
        $query = "INSERT INTO " . $this->table_name . " (username, password) VALUES (?, ?)";

        // prepare query
        $stmt = $this->conn->prepare($query);

        // sanitize
        $name=htmlspecialchars(strip_tags($name));
        $name = "{$name}";

        $password=htmlspecialchars(strip_tags($password));
        $password = "{$password}";

        // bind
        $stmt->bindParam(1, $name);
        $stmt->bindParam(2, $password);

        // execute query
        if($stmt->execute()){
            return true;
        }

        return false;

    }

    function authenticate($name, $password){

      // select all query
      $query = "SELECT * FROM " . $this->table_name . " WHERE username LIKE ? AND password LIKE ?";

      // prepare query statement
      $stmt = $this->conn->prepare($query);

      // sanitize
      $name=htmlspecialchars(strip_tags($name));
      $name = "{$name}";

      $password=htmlspecialchars(strip_tags($password));
      $password = "{$password}";

      // bind
      $stmt->bindParam(1, $name);
      $stmt->bindParam(2, $password);

      // execute query
      $stmt->execute();

      return $stmt;

    }
}
?>
