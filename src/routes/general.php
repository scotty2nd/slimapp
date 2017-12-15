<?php
	require "../vendor/phpHtmlParser/vendor/autoload.php";

	use \Psr\Http\Message\ServerRequestInterface as Request;
	use \Psr\Http\Message\ResponseInterface as Response;
	use PHPHtmlParser\Dom;

	$app = new \Slim\App;

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
       	//$result = $db->getTerms();
	    //$result = $db->getAllCustomers();

   		$dom = new Dom;
	    $dom->load( '<div class="text-wrapper">
					<h2>3 Datenschutzerklärung</h2>
					<p>Die Nutzung unserer Seite ist ohne  eine Angabe von personenbezogenen Daten möglich. Für die Nutzung einzelner  Services unserer Seite können sich hierfür abweichende Regelungen ergeben, die in  diesem Falle nachstehend gesondert erläutert werden. Ihre personenbezogenen  Daten (z.B. Name, Anschrift, E-Mail, Telefonnummer, u.ä.) werden von uns nur  gemäß den Bestimmungen des deutschen Datenschutzrechts verarbeitet. Daten sind dann  personenbezogen, wenn sie eindeutig einer bestimmten natürlichen Person  zugeordnet werden können. Die rechtlichen Grundlagen des Datenschutzes finden  Sie im Bundesdatenschutzgesetz (BDSG) und dem Telemediengesetz (TMG). Nachstehende  Regelungen informieren Sie insoweit über die Art, den Umfang und Zweck der  Erhebung, die Nutzung und die Verarbeitung von personenbezogenen Daten durch  den Anbieter</p>
					<p>[Name und Anschrift des Betreibers]</p>
					<p>[Telefonnummer des Betreibers]</p>
					<p>[E-Mail des Betreibers]</p>
					<p>Wir weisen darauf hin, dass die  internetbasierte Datenübertragung Sicherheitslücken aufweist, ein lückenloser  Schutz vor Zugriffen durch Dritte somit unmöglich ist.</p>
					
					<h4>Cookies</h4>
					<p>Wir  verwenden auf unserer Seite sog. Cookies zum Wiedererkennen mehrfacher Nutzung unseres  Angebots, durch denselben Nutzer/Internetanschlussinhaber. Cookies sind kleine  Textdateien, die Ihr Internet-Browser auf Ihrem Rechner ablegt und speichert.  Sie dienen dazu, unseren Internetauftritt und unsere Angebote zu optimieren. Es  handelt sich dabei zumeist um sog. "Session-Cookies", die nach dem  Ende Ihres Besuches wieder gelöscht werden.</p>
					<p>Teilweise  geben diese Cookies jedoch Informationen ab, um Sie automatisch wieder zu  erkennen. Diese Wiedererkennung erfolgt aufgrund der in den Cookies  gespeicherten IP-Adresse. Die so erlangten Informationen dienen dazu, unsere  Angebote zu optimieren und Ihnen einen leichteren Zugang auf unsere Seite zu  ermöglichen.</p>
					<p>Sie können  die Installation der Cookies durch eine entsprechende Einstellung Ihres  Browsers verhindern; wir weisen Sie jedoch darauf hin, dass Sie in diesem Fall  gegebenenfalls nicht sämtliche Funktionen unserer Website vollumfänglich nutzen  können.</p>

					<h4>Serverdaten</h4>
					<p>Aus technischen Gründen werden u.a. folgende Daten, die Ihr Internet-Browser an  uns bzw. an unseren Webspace-Provider  übermittelt, erfasst (sogenannte Serverlogfiles):</p>

					<p>
						Diese anonymen Daten werden getrennt von Ihren eventuell angegebenen personenbezogenen  Daten gespeichert und lassen so keine Rückschlüsse auf eine bestimmte Person  zu. Sie werden zu statistischen Zwecken ausgewertet, um unseren  Internetauftritt und unsere Angebote optimieren zu können. 
					</p>

					<h4>Registrierungsfunktion</h4>
					<p>Wir bieten Ihnen auf unserer Seite die Möglichkeit, sich dort  zu registrieren. Die im Zuge dieser Registrierung eingegebenen Daten, die aus  der Eingabemaske des Registrierungsformular ersichtlich sind </p>
					<p>[BITTE ERGÄNZEN:  NAME, E-MAILADRESSE USW]</p>
					<p>werden ausschließlich für die Verwendung unseres  Angebots erhoben und gespeichert. Mit Ihrer Registrierung auf unserer Seite  werden wir zudem Ihre IP-Adresse und das Datum sowie die Uhrzeit Ihrer  Registrierung speichern. Dies dient in dem Fall, dass ein Dritter Ihre Daten  missbraucht und sich mit diesen Daten ohne Ihr Wissen auf unserer Seite  registriert, als Absicherung unsererseits.&nbsp;  Eine Weitergabe an Dritte erfolgt nicht. Ein Abgleich der so erhobenen  Daten mit Daten, die möglicherweise durch andere Komponenten unserer Seite  erhoben werden, erfolgt ebenfalls nicht.</p>

					<h4>Newsletter</h4>
					<p>Wir  bieten Ihnen auf unserer Seite die Möglichkeit, unseren Newsletter zu  abonnieren. Mit diesem Newsletter informieren wir in regelmäßigen Abständen  über unsere Angebote. Um unseren Newsletter empfangen zu können, benötigen Sie  eine gültige E-Mailadresse. Die von Ihnen eingetragene E-Mail-Adresse werden wir  dahingehend überprüfen, ob Sie tatsächlich der Inhaber der angegebenen  E-Mail-Adresse sind bzw. deren Inhaber den Empfang des Newsletters autorisiert  ist. Mit Ihrer Anmeldung zu unserem Newsletter werden wir Ihre IP-Adresse und  das Datum sowie die Uhrzeit Ihrer Anmeldung speichern. Dies dient in dem Fall,  dass ein Dritter Ihre E-Mail-Adresse missbraucht und ohne Ihr Wissen unseren  Newsletter abonniert, als Absicherung unsererseits. Weitere Daten werden  unsererseits nicht erhoben. Die so erhobenen Daten werden ausschließlich für  den Bezug unseres Newsletters verwendet. Eine Weitergabe an Dritte erfolgt  nicht. Ein Abgleich der so erhobenen Daten mit Daten, die möglicherweise durch  andere Komponenten unserer Seite erhoben werden, erfolgt ebenfalls nicht. Das  Abonnement dieses Newsletters können Sie jederzeit kündigen. Einzelheiten  hierzu können Sie der Bestätigungsmail sowie jedem einzelnen Newsletter  entnehmen.</p>
					
					<h4>Kontaktmöglichkeit</h4>
					<p>Wir  bieten Ihnen auf unserer Seite die Möglichkeit, mit uns per E-Mail und/oder  über ein Kontaktformular in Verbindung zu treten. In diesem Fall werden die vom  Nutzer gemachten Angaben zum Zwecke der Bearbeitung seiner Kontaktaufnahme  gespeichert. Eine Weitergabe an Dritte erfolgt nicht. Ein Abgleich der so  erhobenen Daten mit Daten, die möglicherweise durch andere Komponenten unserer  Seite erhoben werden, erfolgt ebenfalls nicht.</p>
					
					<h4>Einsatz von PayPal als Zahlungsart</h4>
					<p>Sollten Sie sich im Rahmen Ihres Bestellvorgangs für eine Bezahlung mit dem Online-Zahlungsdienstleister PayPal entscheiden, werden im Rahmen der so ausgelösten Bestellung Ihre Kontaktdaten an PayPal übermittelt. PayPal ist ein Angebot der PayPal (Europe) S.à.r.l. &amp; Cie. S.C.A., 22-24 Boulevard Royal, L-2449 Luxembourg. PayPal übernimmt dabei die Funktion eines Online-Zahlungsdienstleisters sowie eines Treuhänders und bietet Käuferschutzdienste an.</p>
					<p>Bei den an PayPal übermittelten personenbezogenen Daten handelt es sich zumeist um Vorname, Nachname, Adresse, Telefonnummer, IP-Adresse, E-Mail-Adresse, oder andere Daten, die zur Bestellabwicklung erforderlich sind, als auch Daten, die im Zusammenhang mit der Bestellung stehen, wie Anzahl der Artikel, Artikelnummer, Rechnungsbetrag und Steuern in Prozent, Rechnungsinformationen, usw.</p>
					<p>Diese Übermittelung ist zur Abwicklung Ihrer Bestellung mit der von Ihnen ausgewählten Zahlungsart notwendig, insbesondere zur Bestätigung Ihrer Identität, zur Administration Ihrer Zahlung und der Kundenbeziehung.</p>
					<p>Bitte beachten Sie jedoch: Personenbezogenen Daten können seitens PayPal auch an Leistungserbringer, an Subunternehmer oder andere verbundene Unternehmen weitergegeben werden, soweit dies zur Erfüllung der vertraglichen Verpflichtungen aus Ihrer Bestellung erforderlich ist oder die personenbezogenen Daten im Auftrag verarbeitet werden sollen.</p>
					<p>Abhängig von der über PayPal ausgewählten Zahlungsart, z.B. Rechnung oder Lastschrift, werden die an PayPal übermittelten personenbezogenen Daten von PayPal an Wirtschaftsauskunfteien übermittelt. Diese Übermittlung dient der Identitäts- und Bonitätsprüfung in Bezug auf die von Ihnen getätigte Bestellung. Um welche Auskunfteien es sich hierbei handelt und welche Daten von PayPal allgemein erhoben, verarbeitet, gespeichert und weitergegeben werden, entnehmen Sie der Datenschutzerklärung von PayPal unter</p>

					<h3>Auskunft/Widerruf/Löschung</h3>
					<p>Sie können  sich aufgrund des Bundesdatenschutzgesetzes bei Fragen zur Erhebung, Verarbeitung  oder Nutzung Ihrer personenbezogenen Daten und deren Berichtigung, Sperrung,  Löschung oder einem Widerruf einer erteilten Einwilligung unentgeltlich an uns  wenden. Wir weisen darauf hin, dass Ihnen ein Recht auf Berichtigung falscher  Daten oder Löschung personenbezogener Daten zusteht, sollte diesem Anspruch  keine gesetzliche Aufbewahrungspflicht entgegenstehen.</p>
				</div>');

		/*Hier jetzt PHP Scrapping einbauen*/

		$textWrapperInnerHtml = $dom->find( '.text-wrapper *' );
		$jsonArray = array();

		foreach ( $textWrapperInnerHtml as $tag ) {
				$tagname = $tag->getTag()->name();
				$tagInnerHtml = $tag->innerHtml();
				$arrayinner = array();

				if( $tagname != "text" ){
					array_push($jsonArray, array('tag' => $tagname, 
											 'text' => $tagInnerHtml
											));
				}
		}

		$jsonArray = json_encode($jsonArray);
		return $jsonArray;

	    //$response->getBody()->write($result);

	    //return $response;

	    

	    /*$res = array();
	    $res['error'] = false;
	    $res['customers'] = array();*/

	    //Loop DB Results
	    /*while($row = $result->fetch_assoc()){
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
	    }*/

	    //returnResponse(200, $response, $res);
	});

?>
