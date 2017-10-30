<?php
	use \Psr\Http\Message\ServerRequestInterface as Request;
	use \Psr\Http\Message\ResponseInterface as Response;

	$app = new \Slim\App;

	require '../src/middelware/auth.php';

	/* *
	 * URL: http://slimapp.dev/api/terms
	 * Parameters: none
	 * Authorization: Put API Key in Request Header TO DO
	 * Method: GET
	 * */
	$app->get('/api/terms', function(Request $request, Response $response){
		// Get DB Object
       	$db = new db();

       	// Do DB Magic
       	$result = $db->getTerms();
	    //$result = $db->getAllCustomers();

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

?>
