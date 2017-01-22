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
	        //Passwort und API Key mit Absicht weggelassen

	        array_push($res['customers'],$temp);
	    }

	    returnResponse(200, $response, $res);
	});

	/* *
	 * URL: http://slimapp.dev/api/customers/<customer_id>
	 * Parameters: id
	 * Authorization: Put API Key in Request Header TO DO
	 * Method: GET
	 * */
	/*$app->get('/api/customer/{id}', function(Request $request, Response $response){
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
	});*/

	/* *
	 * URL: http://slimapp.dev/api/customer/add
	 * Parameters: first_name, last_name, phone, email, city, state
	 * Method: POST
	 * */
	$app->post('/api/customer/add', function(Request $request, Response $response){
		
		$requiredParams = array(
							'first_name', 
							'last_name', 
							'password', 
							'phone', 
							'email', 
							'address', 
							'city', 
							'state'
						  );

		// Checks required Parameter exists and not empty
		if(verifyRequiredParams($requiredParams, $request, $response)){

			//Get Post Parameter from Request
		    $first_name = $request->getParam('first_name');
		    $last_name = $request->getParam('last_name');
		    $password = $request->getParam('password');
		    $phone = $request->getParam('phone');
		    $email = $request->getParam('email');
		    $address = $request->getParam('address');
		    $city = $request->getParam('city');
		    $state = $request->getParam('state');

			// Get DB Object
	       	$db = new db();

	       	// Do DB Magic
		    $result = $db->createCustomer($first_name, $last_name, $password, $phone, $email, $address, $city, $state);

		   	$res = array();

	   	    if ($result == 0) {
		        $res["error"] = false;
		        $res["message"] = "You are successfully registered";

		        returnResponse(201, $response, $res);
		    } else if ($result == 1) {
		        $res["error"] = true;
		        $res["message"] = "Oops! An error occurred while registereing";

		        returnResponse(500, $response, $res);
		    } else if ($result == 2) {
		        $res["error"] = true;
		        $res["message"] = "Sorry, this customer already existed";

		        returnResponse(200, $response, $res);
		    }
		}
	});

	/* *
	 * URL: http://slimapp.dev/api/login
	 * Parameters: email, password
	 * Method: POST
	 * */
	$app->post('/api/login', function(Request $request, Response $response){
		
		$requiredParams = array(
							'password', 
							'email'
						  );

		// Checks required Parameter exists and not empty
		if(verifyRequiredParams($requiredParams, $request, $response)){

			//Get Post Parameter from Request
		    $email = $request->getParam('email');
		    $password = $request->getParam('password');

			// Get DB Object
	       	$db = new db();

	       	$res = array();

       	    if ($db->customerLogin($email, $password)) {
		        $customer = $db->getCustomer($email);
		        $res['error'] = false;
		        $res['id'] = $customer['id'];
		        $res['first_name'] = $customer['first_name'];
		        $res['last_name'] = $customer['last_name'];
		        $res['phone'] = $customer['phone'];
		        $res['email'] = $customer['email'];
		        $res['address'] = $customer['address'];
		        $res['city'] = $customer['city'];
		        $res['state'] = $customer['state'];
		        $res['apikey'] = $customer['api_key'];

    		    returnResponse(200, $response, $res);
		    } else {
		        $res['error'] = true;
		        $res['message'] = "Invalid username or password";

    		    returnResponse(400, $response, $res);
		    }
		}
	});

	/* *
	 * URL: http://slimapp.dev/api/customer/update/<customer_id>
	 * Parameters: first_name, last_name, phone, email, city, state
	 * Authorization: Put API Key in Request Header TO DO
	 * Method: PUT
	 * */
	$app->put('/api/customer/update/{id}', function(Request $request, Response $response){
		$requiredParams = array(
					'first_name', 
					'last_name', 
					'password', 
					'phone', 
					'email', 
					'address', 
					'city', 
					'state'
				  );

		// Checks required Parameter exists and not empty
		if(verifyRequiredParams($requiredParams, $request, $response)){
			$id = $request->getAttribute('id');
		    $first_name = $request->getParam('first_name');
		    $last_name = $request->getParam('last_name');
		    $password = $request->getParam('password');
		    $phone = $request->getParam('phone');
		    $email = $request->getParam('email');
		    $address = $request->getParam('address');
		    $city = $request->getParam('city');
		    $state = $request->getParam('state');

			// Get DB Object
	       	$db = new db();

	       	// Do DB Magic
	       	$result = $db->updateCustomer($id, $first_name, $last_name, $password, $phone, $email, $address, $city, $state);

		   	$res = array();

	   	    if($result){
		        $res['error'] = false;
		        $res['message'] = "Customer update successfully";

		        returnResponse(200,$response, $res);
		    }else{
		        $res['error'] = true;
		        $res['message'] = "Customer update failed";

		        returnResponse(400,$response, $res);
		    }
		}
	});

	/* *
	 * URL: http://slimapp.dev/api/customer/delete/<customer_id>
	 * Parameters: id
	 * Authorization: Put API Key in Request Header TO DO
	 * Method: DELETE
	 * */
	$app->delete('/api/customer/delete/{id}', function(Request $request, Response $response){
	    $id = $request->getAttribute('id');

		// Get DB Object
       	$db = new db();

       	// Do DB Magic
       	$result = $db->deleteCustomer($id);

	   	$res = array();

   	    if($result){
		    $res['error'] = false;
		    $res['message'] = "Customer successfully deleted";
    		returnResponse(200, $response, $res);
		}else{
		    $res['error'] = true;
		    $res['message'] = "Delete customer failed";
    		returnResponse(400, $response, $res);
		}
	});
?>
