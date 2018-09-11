<?php
class Database{

    // specify your own database credentials
    private $host = "cop4331.cm0oj9xyv2kx.us-east-2.rds.amazonaws.com";
    private $port = "3306"; 
    private $db_name = "cop4331";
    private $username = "spongebob7";
    private $password = "spongebob7";
    public $conn;

    // get the database connection
    public function getConnection(){

        $this->conn = null;

        try{
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            $this->conn->exec("set names utf8");
        }catch(PDOException $exception){
            echo "Connection error: " . $exception->getMessage();
        }

        return $this->conn;
    }
}
?>
