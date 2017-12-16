<?php
	require "../vendor/phpHtmlParser/vendor/autoload.php";

	use \Psr\Http\Message\ServerRequestInterface as Request;
	use \Psr\Http\Message\ResponseInterface as Response;
	use PHPHtmlParser\Dom;

	//$app = new \Slim\App;

	/* *
	 * URL: http://slimapp.dev/api/terms
	 * Parameters: none
	 * Authorization: none
	 * Method: GET
	 * */
	$app->get('/api/terms', function(Request $request, Response $response){
		// Get DB Object
       	$db = new db();

       	// Do DB Magic
       	$result = $db->getTermsText();
       	
       	$res = array();

	    //Loop DB Results
	    while($row = $result->fetch_assoc()){
	    	$res = $row;
	    }

   		$dom = new Dom;
   		$dom->load( $res['terms_text'] );

		$textWrapperInnerHtml = $dom->find( '.text-wrapper *' );
		$jsonArray = array();

		foreach ( $textWrapperInnerHtml as $tag ) {
				$tagname = $tag->getTag()->name();
				$tagInnerHtml = $tag->innerHtml();
				//$arrayinner = array();

				if( $tagname != "text" ){
					array_push(
						$jsonArray, array(
									  'tag' => $tagname, 
								 	  'text' => $tagInnerHtml
									)
					);
				}
		}

	    returnResponse(200, $response, $jsonArray);
	});

	/* *
	 * URL: http://slimapp.dev/api/terms
	 * Parameters: none
	 * Authorization: none
	 * Method: GET
	 * */
	$app->get('/api/policy', function(Request $request, Response $response){
		// Get DB Object
       	$db = new db();

       		// Do DB Magic
       	$result = $db->getPolicyText();
       	
       	$res = array();

	    //Loop DB Results
	    while($row = $result->fetch_assoc()){
	    	$res = $row;
	    }

   		$dom = new Dom;
   		$dom->load( $res['privacy_policy_text'] );

		$textWrapperInnerHtml = $dom->find( '.text-wrapper *' );
		$jsonArray = array();

		foreach ( $textWrapperInnerHtml as $tag ) {
				$tagname = $tag->getTag()->name();
				$tagInnerHtml = $tag->innerHtml();
				//$arrayinner = array();

				if( $tagname != "text" ){
					array_push(
						$jsonArray, array(
									  'tag' => $tagname, 
								 	  'text' => $tagInnerHtml
									)
					);
				}
		}
		
	    returnResponse(200, $response, $jsonArray);

	    //returnResponse(200, $response, $res);
	});

?>
