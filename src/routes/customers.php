<?php
	use \Psr\Http\Message\ServerRequestInterface as Request;
	use \Psr\Http\Message\ResponseInterface as Response;

	$app = new \Slim\App;

	/* *
	 * URL: http://slimapp.dev/api/customers
	 * Parameters: none
	 * Authorization: Put API Key in Request Header TO DO
	 * Method: GET
	 * */
	$app->get('/api/customers', function(Request $request, Response $response){
		// Get DB Object
       	$db = new db();

       	// Do DB Magic
	    $result = $db->getAllCustomers();

	    $res = array();
	    $res['error'] = false;
	    $res['customers'] = array();

	    //Loop DB Results
	    while($row = $result->fetch_assoc()){
	        $temp = array();
	        $temp['first_name'] = $row['first_name'];
	        $temp['last_name'] = $row['last_name'];
	        $temp['phone'] = $row['phone'];
	        $temp['email'] = $row['email'];
	        $temp['address'] = $row['address'];
	        $temp['city'] = $row['city'];
	        $temp['state'] = $row['state'];

	        array_push($res['customers'],$temp);
	    }

	    returnResponse(200, $response, $res);

		/*return $response->withStatus(200)
			->withHeader('Content-Type', 'application/json')
			->write(json_encode($res));*/
	});

	/* *
	 * URL: http://slimapp.dev/api/customers/<student_id>
	 * Parameters: none
	 * Authorization: Put API Key in Request Header TO DO
	 * Method: GET
	 * */
	$app->get('/api/customer/{id}', function(Request $request, Response $response){
	    $id = $request->getAttribute('id');

		// Get DB Object
       	$db = new db();

       	// Do DB Magic
	    $result = $db->getCustomer($id);

	   	$res = array();
	    $res['error'] = false;
	    $res['customer'] = array();

	    //Loop DB Results
	    while($row = $result->fetch_assoc()){
	        $temp = array();
	        $temp['first_name'] = $row['first_name'];
	        $temp['last_name'] = $row['last_name'];
	        $temp['phone'] = $row['phone'];
	        $temp['email'] = $row['email'];
	        $temp['address'] = $row['address'];
	        $temp['city'] = $row['city'];
	        $temp['state'] = $row['state'];

	        array_push($res['customer'],$temp);
	    }

	    returnResponse(200, $response, $res);

		/*return $response->withStatus(200)
			->withHeader('Content-Type', 'application/json')
			->write(json_encode($res));*/
	});

	// Add Customer
	$app->post('/api/customer/add', function(Request $request, Response $response){
	    $first_name = $request->getParam('first_name');
	    $last_name = $request->getParam('last_name');
	    $phone = $request->getParam('phone');
	    $email = $request->getParam('email');
	    $address = $request->getParam('address');
	    $city = $request->getParam('city');
	    $state = $request->getParam('state');

	    echo 'add';

        // Get DB Object
       $db = new db();

        // Connect
        $db = $db->connect();/* 

        //$result = $db->createStudent($name, $username, $password);

        //$password = md5($password);
        //$apikey = $this->generateApiKey();
        $stmt = $db->prepare("INSERT INTO customers(first_name, last_name, phone, email, address, city, state) values(?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("sssssss", $first_name, $last_name, $phone, $email, $address, $city, $state);
        $result = $stmt->execute();
        $stmt->close();
        if ($result) {
	        $response["error"] = false;
	        $response["message"] = "You are successfully registered";
            $app->status(201);
		    $app->contentType('application/json');
		    echo json_encode($response);
	        //echoResponse(201, $response);
	        echo "if";
	    } else {
	        $response["error"] = true;
	        $response["message"] = "Oops! An error occurred while registereing";
            $app->status(200);
		    $app->contentType('application/json');
		    echo json_encode($response);
		    echo "else";
	        //echoResponse(200, $response);
	    }*/
        /*if () {
            return 0;
        } else {
            return 1;
        }*/

	    /* Old PDO Stuff
	    $sql = "INSERT INTO customers (first_name,last_name,phone,email,address,city,state) VALUES
	    (:first_name,:last_name,:phone,:email,:address,:city,:state)";

	    try{
	        // Get DB Object
	        $db = new db();
	        // Connect
	        $db = $db->connect();

	        $stmt = $db->prepare($sql);

	        $stmt->bindParam(':first_name', $first_name);
	        $stmt->bindParam(':last_name',  $last_name);
	        $stmt->bindParam(':phone',      $phone);
	        $stmt->bindParam(':email',      $email);
	        $stmt->bindParam(':address',    $address);
	        $stmt->bindParam(':city',       $city);
	        $stmt->bindParam(':state',      $state);

	        $stmt->execute();

	        //$arr = array(
	        //	'notice' => array('text' => 'Customer Added')
    		//);

    		//return $response->withHeader('Content-Type', 'application/json')
    						//->write('{"notice": {"text": "Customer Added"}}');

	       	//return $response->withStatus(200)
	          //  ->withHeader('Content-Type', 'application/json')
	            //->write(json_encode($arr));

	        //echo '{"notice": {"text": "Customer Added"}';
			return $response->withStatus(201)
				->withHeader('Content-Type', 'application/json')
				->write('{"notice": {"text": "Customer Added"}}');

	    } catch(PDOException $e){
            //echo '{"error": {"text": '.$e->getMessage().'}';
			return $response->withHeader('Content-Type', 'application/json')
				->write('{"error": {"text": ' . $e->getMessage() . '}}');
	    }*/
	});

	// Update Customer
	$app->put('/api/customer/update/{id}', function(Request $request, Response $response){
	    $id = $request->getAttribute('id');
	    $first_name = $request->getParam('first_name');
	    $last_name = $request->getParam('last_name');
	    $phone = $request->getParam('phone');
	    $email = $request->getParam('email');
	    $address = $request->getParam('address');
	    $city = $request->getParam('city');
	    $state = $request->getParam('state');

	    $sql = "UPDATE customers SET
					first_name 	= :first_name,
					last_name 	= :last_name,
	                phone		= :phone,
	                email		= :email,
	                address 	= :address,
	                city 		= :city,
	                state		= :state
				WHERE id = $id";

	    try{
	        // Get DB Object
	        $db = new db();
	        // Connect
	        $db = $db->connect();

	        $stmt = $db->prepare($sql);

	        $stmt->bindParam(':first_name', $first_name);
	        $stmt->bindParam(':last_name',  $last_name);
	        $stmt->bindParam(':phone',      $phone);
	        $stmt->bindParam(':email',      $email);
	        $stmt->bindParam(':address',    $address);
	        $stmt->bindParam(':city',       $city);
	        $stmt->bindParam(':state',      $state);

	        $stmt->execute();

	        echo '{"notice": {"text": "Customer Updated"}';

	    } catch(PDOException $e){
	        echo '{"error": {"text": '.$e->getMessage().'}';
	    }
	});

	// Delete Customer
	$app->delete('/api/customer/delete/{id}', function(Request $request, Response $response){
	    $id = $request->getAttribute('id');

	    $sql = "DELETE FROM customers WHERE id = $id";

	    try{
	        // Get DB Object
	        $db = new db();
	        // Connect
	        $db = $db->connect();

	        $stmt = $db->prepare($sql);
	        $stmt->execute();
	        $db = null;
	        echo '{"notice": {"text": "Customer Deleted"}';
	    } catch(PDOException $e){
	        echo '{"error": {"text": '.$e->getMessage().'}';
	    }
	});
?>
