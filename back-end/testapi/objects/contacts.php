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
    public $username;

    // constructor with $db as database connection
    public function __construct($db, $table){
        $this->conn = $db;
        $this->table_name = $table;
    }

    // read contacts
    function read($username){

        // select all query
        $query = "SELECT * FROM " . $this->table_name . " WHERE UserID = (SELECT UserID FROM login WHERE username = ?)";

        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // sanitize
        $username=htmlspecialchars(strip_tags($username));
        $username = "{$username}";

        // bind
        $stmt->bindParam(1, $username);

        // execute query
        $stmt->execute();

        return $stmt;
    }

  // create contact
  function create($name, $phone, $address, $username){

      // query to insert record
      $query = "INSERT INTO " . $this->table_name . " (name, phonenumber, address, UserID) VALUES (?,?,?,(SELECT UserID FROM login WHERE username = ?))";

      // prepare query
      $stmt = $this->conn->prepare($query);

      // sanitize
      $name=htmlspecialchars(strip_tags($name));
      $name = "{$name}";

      $phone=htmlspecialchars(strip_tags($phone));
      $phone = "{$phone}";

      $address=htmlspecialchars(strip_tags($address));
      $address = "{$address}";

      $username=htmlspecialchars(strip_tags($username));
      $username = "{$username}";

      // bind
      $stmt->bindParam(1, $name);
      $stmt->bindParam(2, $phone);
      $stmt->bindParam(3, $address);
      $stmt->bindParam(4, $username);


      // execute query
      if($stmt->execute()){
          return true;
      }

      return false;

  }

  // delete contact
  function delete($keywords, $username){

      // delete query
      $query = "DELETE FROM " . $this->table_name . " WHERE id LIKE ? AND UserID = (SELECT UserID FROM login WHERE username = ?)";
      // prepare query
      $stmt = $this->conn->prepare($query);

      // sanitize
      $keywords=htmlspecialchars(strip_tags($keywords));
      $keywords = "{$keywords}";

      $username=htmlspecialchars(strip_tags($username));
      $username = "{$username}";

      // bind
      $stmt->bindParam(1, $keywords);
      $stmt->bindParam(1, $username);

      // execute query
      if($stmt->execute() && $stmt->rowCount() > 0){
          return true;
      }

      return false;

  }

  // search contacts
  function search($keywords, $username){

    $regex = "/[\s]/";
    if (preg_match($regex, $keywords)) {
      read($username);
      return;
    }
      // select all query
      $query = "SELECT * FROM " . $this->table_name . " WHERE name LIKE ? OR phonenumber LIKE ? OR address LIKE ? AND UserID = (SELECT UserID FROM login WHERE username = ?)";

      // prepare query statement
      $stmt = $this->conn->prepare($query);

      // sanitize
      $keywords=htmlspecialchars(strip_tags($keywords));
      $keywords = "%{$keywords}%";

      $username=htmlspecialchars(strip_tags($username));
      $username = "{$username}";

      // bind
      $stmt->bindParam(1, $keywords);
      $stmt->bindParam(2, $keywords);
      $stmt->bindParam(3, $keywords);
      $stmt->bindParam(4, $username);


      // execute query
      $stmt->execute();

      return $stmt;
  }
}
