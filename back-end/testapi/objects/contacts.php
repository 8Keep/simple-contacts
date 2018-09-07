<?php
class Contact{

    // database connection and table name
    private $conn;
    private $table_name;

    // object properties
    public $id;
    public $name;
    public $phone;
    public $address;

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
  function create($name, $phone, $address){

      // query to insert record
      $query = "INSERT INTO " . $this->table_name . " (name, phonenumber, address) VALUES (?,?,?)";

      // prepare query
      $stmt = $this->conn->prepare($query);

      // sanitize
      $firstName=htmlspecialchars(strip_tags($firstName));
      $firstName = "{$name}";

      $email=htmlspecialchars(strip_tags($email));
      $email = "{$phone}";

      $address=htmlspecialchars(strip_tags($address));
      $address = "{$address}";

      // bind
      $stmt->bindParam(1, $name);
      $stmt->bindParam(2, $phone);
      $stmt->bindParam(3, $address);

      // execute query
      if($stmt->execute()){
          return true;
      }

      return false;

  }

  // delete contact
  function delete($keywords){

      // delete query
      $query = "DELETE FROM " . $this->table_name . " WHERE id LIKE ?";

      // prepare query
      $stmt = $this->conn->prepare($query);

      // sanitize
      $keywords=htmlspecialchars(strip_tags($keywords));
      $keywords = "{$keywords}";

      // bind
      $stmt->bindParam(1, $keywords);

      // execute query
      if($stmt->execute() && $stmt->rowCount() > 0){
          return true;
      }

      return false;

  }

  // search contacts
  function search($keywords){

      // select all query
      $query = "SELECT * FROM " . $this->table_name . " WHERE name LIKE ? OR phonenumber LIKE ? OR address LIKE ?";

      // prepare query statement
      $stmt = $this->conn->prepare($query);

      // sanitize
      $keywords=htmlspecialchars(strip_tags($keywords));
      $keywords = "%{$keywords}%";

      // bind
      $stmt->bindParam(1, $keywords);
      $stmt->bindParam(2, $keywords);
      $stmt->bindParam(3, $keywords);

      // execute query
      $stmt->execute();

      return $stmt;
  }
}

