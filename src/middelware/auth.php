<?php
    //Checking the api key is missing, valid or not
	$authenticateCustomer = function ($request, $response, $next) {
	    $headers = apache_request_headers();
	    $res = array();

	    if (isset($headers['Authorization'])) {
    		// Get DB Object
       		$db = new db();
	        $api_key = $headers['Authorization'];

	        if (!$db->isValidCustomer($api_key)) {
	            $res["error"] = true;
	            $res["message"] = "Access Denied. Invalid Api key";
	            
	            returnResponse(401, $response, $res);
	        }else{
	        	$response = $next($request, $response);
	        }
	    } else {
	        $res["error"] = true;
	        $res["message"] = "Api key is misssing";
	        
	        returnResponse(400, $response, $res);
	    }

		return $response;
	};
?>