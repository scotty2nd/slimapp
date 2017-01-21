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

        //Method to fetch all customer from database
        public function getAllCustomers(){
            $stmt = $this->connection->prepare("SELECT * FROM customers");
            $stmt->execute();
            $customers = $stmt->get_result();
            $stmt->close();

            return $customers;
        }

       //Method to get all the infos of a particular customer
        public function getCustomer($id){
            $stmt = $this->connection->prepare("SELECT * FROM customers WHERE id=?");
            $stmt->bind_param("i",$id);
            $stmt->execute();
            $customer = $stmt->get_result();
            $stmt->close();

            return $customer;
        }

        //Method to register a new customer
        public function createCustomer($first_name, $last_name, $phone, $email, $address, $city, $state){
            if (!$this->customerExists($email)){
                //$password = md5($pass);
                $apikey = $this->generateApiKey();
                $stmt = $this->connection->prepare("INSERT INTO customers(first_name, last_name, phone, email, address, city, state, api_key) values(?, ?, ?, ?, ?, ?, ?, ?)");
                $stmt->bind_param("ssssssss", $first_name, $last_name, $phone, $email, $address, $city, $state, $apikey);
                $result = $stmt->execute();
                $stmt->close();
                if ($result) {
                    return 0;
                }else {
                    return 1;
                }
            }else {
                return 2;
            }
        }

        //Method to update customer
        public function updateCustomer($id, $first_name, $last_name, $phone, $email, $address, $city, $state){
            if (!$this->customerExists($email)) {
                $stmt = $this->connection->prepare("UPDATE customers SET first_name = ?, last_name = ?, phone = ?, email = ?, address = ?, city = ?, state = ? WHERE id = ?");
                $stmt->bind_param("sssssssi",$first_name, $last_name, $phone, $email, $address, $city, $state, $id);
                $result = $stmt->execute();
                $stmt->close();
                if($result){
                    return 0;
                }
                return 1;
            }else {
                return 2;
            }
        }

        //Method to delete customer
        public function deleteCustomer($id){
            $stmt = $this->connection->prepare("DELETE FROM customers WHERE id = ?");
            $stmt->bind_param("i",$id);
            $result = $stmt->execute();
            $stmt->close();
            if($result){
                return true;
            }
            return false;
        }

        //Method to check the customer email adress already exist or not
        private function customerExists($email) {
            $stmt = $this->connection->prepare("SELECT id from customers WHERE email = ?");
            $stmt->bind_param("s", $email);
            $stmt->execute();
            $stmt->store_result();
            $num_rows = $stmt->num_rows;
            $stmt->close();
            return $num_rows > 0;
        }

        //Method to generate a unique api key every time
        private function generateApiKey(){
            return md5(uniqid(rand(), true));
        }
    }
?>