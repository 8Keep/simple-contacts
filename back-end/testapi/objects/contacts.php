<?php
class Contact{

    // database connection and table name
    private $conn;
    #private $table_name = "contacts";
    private $table_name;

    // object properties
    public $id;
    public $name;

    // constructor with $db as database connection
    public function __construct($db, $table){
        $this->conn = $db;
        $this->table_name = $table;
    }

    // read contacts
    function read(){

        // select all query
        $query = "SELECT * FROM " . $this->table_name . " p";

        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // execute query
        $stmt->execute();

        return $stmt;
    }

  // create contact
  function create($keywords){

      // query to insert record
      $query = "INSERT INTO " . $this->table_name . " (name) VALUES (?)";

      // prepare query
      $stmt = $this->conn->prepare($query);

      /*// sanitize
      $this->name=htmlspecialchars(strip_tags($this->name));

      // bind values
      $stmt->bindParam(":name", $this->name);
      */

      // sanitize
      $keywords=htmlspecialchars(strip_tags($keywords));
      $keywords = "{$keywords}";

      // bind
      $stmt->bindParam(1, $keywords);

      // execute query
      if($stmt->execute()){
          return true;
      }

      return false;

  }

  // delete contact
  function delete($keywords){

      // delete query
      $query = "DELETE FROM " . $this->table_name . " WHERE name LIKE ?";

      // prepare query
      $stmt = $this->conn->prepare($query);

      /*// sanitize
      $this->name=htmlspecialchars(strip_tags($this->name));

      // bind id of record to delete
      $stmt->bindParam(1, $this->name);
      */

      // sanitize
      $keywords=htmlspecialchars(strip_tags($keywords));
      $keywords = "%{$keywords}%";

      // bind
      $stmt->bindParam(1, $keywords);

      // execute query
      if($stmt->execute()){
          return true;
      }

      return false;

  }

  // search products
  function search($keywords){

      // select all query
      $query = "SELECT * FROM " . $this->table_name . " WHERE name LIKE ?";

      // prepare query statement
      $stmt = $this->conn->prepare($query);

      // sanitize
      $keywords=htmlspecialchars(strip_tags($keywords));
      $keywords = "%{$keywords}%";

      // bind
      $stmt->bindParam(1, $keywords);
      #$stmt->bindParam(2, $keywords);
      #$stmt->bindParam(3, $keywords);

      // execute query
      $stmt->execute();

      return $stmt;
  }
}
