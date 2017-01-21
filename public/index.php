<?php
	use \Psr\Http\Message\ServerRequestInterface as Request;
	use \Psr\Http\Message\ResponseInterface as Response;

	require '../vendor/autoload.php';
	require '../src/config/db.php';

	$app = new \Slim\App;

	$app->get('/hello/{name}', function (Request $request, Response $response) {
	    $name = $request->getAttribute('name');
	    $response->getBody()->write("Hello, $name");

	    return $response;
	});

	//Customer Routes
	require '../src/routes/customers.php';

	function returnResponse($status_code, $response, $res)
	{
		return $response->withStatus($status_code)
			->withHeader('Content-Type', 'application/json')
			->write(json_encode($res));
	}

	function verifyRequiredParams($required_params, $request, $response)
	{
	    $error = false;
	    $error_fields = "";
	    
	    //checks _POST  [IS PSR-7 compliant] //Laut Stackoverflow auch für get
	    $request_params = $request->getParsedBody(); 

	    foreach ($required_params as $param) {
	        if (!isset($request_params[$param]) || strlen(trim($request_params[$param])) <= 0) {
	            $error = true;
	            $error_fields .= $param . ', ';
	        }
	    }

	    /*$allGetVars = $request->getQueryParams();

		foreach($allGetVars as $key => $param){
		   //GET parameters list
		}*/

	    if ($error) {
	        $res = array();
	        $res["error"] = true;
	        $res["message"] = 'Required field(s) ' . substr($error_fields, 0, -2) . ' is missing or empty';

	        returnResponse(400, $response, $res);
	    }else{
	    	return true;
	    }
	}

	$app->run();
?>