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

	$app->run();
?>