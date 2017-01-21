<?php
    class db{
        //Constants to connect with the database
        private $dbhost = 'localhost';
        private $dbuser = 'root';
        private $dbpassword = 'root';
        private $dbname = 'slimapp';
        //Variable to store database link
        private $connection;

        function __construct()
        {
            //This method will connect to the database
            $this->connection = new mysqli($this->dbhost, $this->dbuser, $this->dbpassword, $this->dbname);

            //Checking if any error occured while connecting
            if (mysqli_connect_errno()) {
                echo "Failed to connect to MySQL: " . mysqli_connect_error();
            }

            //finally returning the connection link 
            return $this->connection;
        }

        //Method to fetch all students from database
        public function getAllCustomers(){
            $stmt = $this->connection->prepare("SELECT * FROM customers");
            $stmt->execute();
            $customers = $stmt->get_result();
            $stmt->close();
            return $customers;
        }
    }
?>