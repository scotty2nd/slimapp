var include = require("/Main");

var firstname = include.observable(""),
	lastname = include.observable(""),
	email = include.observable(""),
	password = include.observable(""),
	repeatPassword = include.observable("");

/*Eventuell in Observable Datei auslagern*/
var allCredentialsEntered = include.observable(function() {
	var credentials = firstname.value != "" && lastname.value != "" && password.value != "" && repeatPassword.value != "";

	include.SetAndroidStatusbarColor(credentials, 1);

	return credentials;
});

// Passwort Feld überwachen und Passwort Komplexität zurückgeben
var passwordComplexity = include.observable(function() {
	var passwordComplexity = include.GetPasswordComplexity(password.value);

	return passwordComplexity;
});

// Repeat Passwort Feld überwachen und Passwort Komplexität zurückgeben
var repeatPasswordComplexity = include.observable(function() {
	var passwordComplexity = include.GetPasswordComplexity(repeatPassword.value);

	return passwordComplexity;
});

function OnPageActiv() {
	include.SetAndroidStatusbarColor(allCredentialsEntered);
}

function Register() {
	/*
		To Do:
		- Nutzungs- und Datenschutzschutz Popup bauen // Nutzungs und Datenschutzbedingugen von Server fetchen
		- Logo auf Login Seite ist aktuell zu hoch gerutscht
		- Popup Javascript in eigene Datei auslagern
		- Navbar Javascript in eigene Datei auslagern
		- Logo Untertitel einbauen (Mowi)
		- Go Back Tag einbauen um Javascript zu sparen siehe episode 3 
	*/
	include.showOverlay.value = true; 			// Overlay einblenden
	include.showLoadingIndicator.value = true; 	// Loading Symbol einblenden

	// Check ob alle Felder eingegeben sind
	if(firstname.value != "" && lastname.value != "" && email.value != "" && password.value != "" && repeatPassword.value != ""){
		// Prüfen ob Email-Adresse gültig ist
		if(include.emailRegex.test(email.value)){
			// Prüfen ob Passwort und Passwort wiederholen identisch sind
			if(password.value == repeatPassword.value){
				// Prüfen ob Passwort komplex genug ist
				if((passwordComplexity.value == 'mittel' && repeatPasswordComplexity.value == 'mittel') || (passwordComplexity.value == 'stark' && repeatPasswordComplexity.value == 'stark')){

					var requestObject = {
				    	first_name: firstname.value, 
				    	last_name: lastname.value, 
				    	password: password.value, 
				    	email: email.value
				    };

					fetch(include.apiUrl + 'customer/add', {
					  	method: 'POST',
					  	headers: { "Content-type": "application/json", "Accept": "application/json" },
					  	body: JSON.stringify(requestObject)
				  	})
				  	.then(result => result.json())
				  	.then(result => {
				  		if(result.error == false){
					    	// Kein Fehler Daten an den Server schicken
				    		include.showLoadingIndicator.value = false; 										// Loading Symbol ausblenden
				    		include.ShowModal(include.colors.success, '', 'Glückwunsch', result.message, true); 	// Erfolgsmeldung zeigen
							
				    		// Textfelder löschen
						    firstname.value = '';
						    lastname.value = '';
						    email.value = '';
						    password.value = '';
						    repeatPassword.value = '';
						}else if(result.error == true){
							// Server Antwort enthält einen Fehler
					    	include.showLoadingIndicator.value = false; 																// Loading Symbol ausblenden
					    	include.ShowModal(include.colors.error, 'Oops!', 'Es ist ein Fehler aufgetreten.', result.message, true); 	// Fehlermeldung zeigen
					    }
					}).catch(error => {
					    // Ein Fehler ist bei der Verarbeitung aufgetreten
					    include.showLoadingIndicator.value = false; 																							// Loading Symbol ausblenden
					    include.ShowModal(include.colors.error, 'Oops!', 'Es ist ein Fehler aufgetreten.', 'Ein unbekannter Fehler ist aufgetreten. \n' + error, true); 	// Fehlermeldung zeigen
					});
				}else{
					// Passwort nicht komplex genug
			    	include.showLoadingIndicator.value = false; 																									// Loading Symbol ausblenden
			    	include.ShowModal(include.colors.error, 'Oops!', 'Es ist ein Fehler aufgetreten.', 'Das eingegebenen Passwort ist nicht komplex genug.', true);	// Fehlermeldung zeigen
				}
			}else{
				// Passwort nicht identisch
				include.showLoadingIndicator.value = false; 																									// Loading Symbol ausblenden
				include.ShowModal(include.colors.error, 'Oops!', 'Es ist ein Fehler aufgetreten.', 'Die eingegebenen Passwörter stimmen nicht überein.', true); // Fehlermeldung zeigen
			}
		}else{
			// Email Adresse ist ungültig
			include.showLoadingIndicator.value = false; 																								// Loading Symbol ausblenden
			include.ShowModal(include.colors.error, 'Oops!', 'Es ist ein Fehler aufgetreten.', 'Die eingegebenen Email-Adresse ist ungültig.', true); 	// Fehlermeldung zeigen
		}
	}else{
		// Nicht alle Felder ausgefüllt
		include.showLoadingIndicator.value = false; 																					// Loading Symbol ausblenden
		include.ShowModal(include.colors.error, 'Oops!', 'Es ist ein Fehler aufgetreten.', 'Bitte füllen Sie alle Felder aus.', true); 	// Fehlermeldung zeigen
	}
}

function ShowTermsPopup() {
	/*Später vom Server fetchen*/
	var termsTextJson = [{"tag":"h2","text":"1 Datenschutzerkl\u00e4rung"},{"tag":"p","text":"Die Nutzung unserer Seite ist ohne eine Angabe von personenbezogenen Daten m\u00f6glich. F\u00fcr die Nutzung einzelner Services unserer Seite k\u00f6nnen sich hierf\u00fcr abweichende Regelungen ergeben, die in diesem Falle nachstehend gesondert erl\u00e4utert werden. Ihre personenbezogenen Daten (z.B. Name, Anschrift, E-Mail, Telefonnummer, u.\u00e4.) werden von uns nur gem\u00e4\u00df den Bestimmungen des deutschen Datenschutzrechts verarbeitet. Daten sind dann personenbezogen, wenn sie eindeutig einer bestimmten nat\u00fcrlichen Person zugeordnet werden k\u00f6nnen. Die rechtlichen Grundlagen des Datenschutzes finden Sie im Bundesdatenschutzgesetz (BDSG) und dem Telemediengesetz (TMG). Nachstehende Regelungen informieren Sie insoweit \u00fcber die Art, den Umfang und Zweck der Erhebung, die Nutzung und die Verarbeitung von personenbezogenen Daten durch den Anbieter"},{"tag":"p","text":"[Name und Anschrift des Betreibers]"},{"tag":"p","text":"[Telefonnummer des Betreibers]"},{"tag":"p","text":"[E-Mail des Betreibers]"},{"tag":"p","text":"Wir weisen darauf hin, dass die internetbasierte Daten\u00fcbertragung Sicherheitsl\u00fccken aufweist, ein l\u00fcckenloser Schutz vor Zugriffen durch Dritte somit unm\u00f6glich ist."},{"tag":"h4","text":"Cookies"},{"tag":"p","text":"Wir verwenden auf unserer Seite sog. Cookies zum Wiedererkennen mehrfacher Nutzung unseres Angebots, durch denselben Nutzer\/Internetanschlussinhaber. Cookies sind kleine Textdateien, die Ihr Internet-Browser auf Ihrem Rechner ablegt und speichert. Sie dienen dazu, unseren Internetauftritt und unsere Angebote zu optimieren. Es handelt sich dabei zumeist um sog. \"Session-Cookies\", die nach dem Ende Ihres Besuches wieder gel\u00f6scht werden."},{"tag":"p","text":"Teilweise geben diese Cookies jedoch Informationen ab, um Sie automatisch wieder zu erkennen. Diese Wiedererkennung erfolgt aufgrund der in den Cookies gespeicherten IP-Adresse. Die so erlangten Informationen dienen dazu, unsere Angebote zu optimieren und Ihnen einen leichteren Zugang auf unsere Seite zu erm\u00f6glichen."},{"tag":"p","text":"Sie k\u00f6nnen die Installation der Cookies durch eine entsprechende Einstellung Ihres Browsers verhindern; wir weisen Sie jedoch darauf hin, dass Sie in diesem Fall gegebenenfalls nicht s\u00e4mtliche Funktionen unserer Website vollumf\u00e4nglich nutzen k\u00f6nnen."},{"tag":"h4","text":"Serverdaten"},{"tag":"p","text":"Aus technischen Gr\u00fcnden werden u.a. folgende Daten, die Ihr Internet-Browser an uns bzw. an unseren Webspace-Provider \u00fcbermittelt, erfasst (sogenannte Serverlogfiles):"},{"tag":"p","text":" Diese anonymen Daten werden getrennt von Ihren eventuell angegebenen personenbezogenen Daten gespeichert und lassen so keine R\u00fcckschl\u00fcsse auf eine bestimmte Person zu. Sie werden zu statistischen Zwecken ausgewertet, um unseren Internetauftritt und unsere Angebote optimieren zu k\u00f6nnen. "},{"tag":"h4","text":"Registrierungsfunktion"},{"tag":"p","text":"Wir bieten Ihnen auf unserer Seite die M\u00f6glichkeit, sich dort zu registrieren. Die im Zuge dieser Registrierung eingegebenen Daten, die aus der Eingabemaske des Registrierungsformular ersichtlich sind "},{"tag":"p","text":"[BITTE ERG\u00c4NZEN: NAME, E-MAILADRESSE USW]"},{"tag":"p","text":"werden ausschlie\u00dflich f\u00fcr die Verwendung unseres Angebots erhoben und gespeichert. Mit Ihrer Registrierung auf unserer Seite werden wir zudem Ihre IP-Adresse und das Datum sowie die Uhrzeit Ihrer Registrierung speichern. Dies dient in dem Fall, dass ein Dritter Ihre Daten missbraucht und sich mit diesen Daten ohne Ihr Wissen auf unserer Seite registriert, als Absicherung unsererseits.&nbsp; Eine Weitergabe an Dritte erfolgt nicht. Ein Abgleich der so erhobenen Daten mit Daten, die m\u00f6glicherweise durch andere Komponenten unserer Seite erhoben werden, erfolgt ebenfalls nicht."},{"tag":"h4","text":"Newsletter"},{"tag":"p","text":"Wir bieten Ihnen auf unserer Seite die M\u00f6glichkeit, unseren Newsletter zu abonnieren. Mit diesem Newsletter informieren wir in regelm\u00e4\u00dfigen Abst\u00e4nden \u00fcber unsere Angebote. Um unseren Newsletter empfangen zu k\u00f6nnen, ben\u00f6tigen Sie eine g\u00fcltige E-Mailadresse. Die von Ihnen eingetragene E-Mail-Adresse werden wir dahingehend \u00fcberpr\u00fcfen, ob Sie tats\u00e4chlich der Inhaber der angegebenen E-Mail-Adresse sind bzw. deren Inhaber den Empfang des Newsletters autorisiert ist. Mit Ihrer Anmeldung zu unserem Newsletter werden wir Ihre IP-Adresse und das Datum sowie die Uhrzeit Ihrer Anmeldung speichern. Dies dient in dem Fall, dass ein Dritter Ihre E-Mail-Adresse missbraucht und ohne Ihr Wissen unseren Newsletter abonniert, als Absicherung unsererseits. Weitere Daten werden unsererseits nicht erhoben. Die so erhobenen Daten werden ausschlie\u00dflich f\u00fcr den Bezug unseres Newsletters verwendet. Eine Weitergabe an Dritte erfolgt nicht. Ein Abgleich der so erhobenen Daten mit Daten, die m\u00f6glicherweise durch andere Komponenten unserer Seite erhoben werden, erfolgt ebenfalls nicht. Das Abonnement dieses Newsletters k\u00f6nnen Sie jederzeit k\u00fcndigen. Einzelheiten hierzu k\u00f6nnen Sie der Best\u00e4tigungsmail sowie jedem einzelnen Newsletter entnehmen."},{"tag":"h4","text":"Kontaktm\u00f6glichkeit"},{"tag":"p","text":"Wir bieten Ihnen auf unserer Seite die M\u00f6glichkeit, mit uns per E-Mail und\/oder \u00fcber ein Kontaktformular in Verbindung zu treten. In diesem Fall werden die vom Nutzer gemachten Angaben zum Zwecke der Bearbeitung seiner Kontaktaufnahme gespeichert. Eine Weitergabe an Dritte erfolgt nicht. Ein Abgleich der so erhobenen Daten mit Daten, die m\u00f6glicherweise durch andere Komponenten unserer Seite erhoben werden, erfolgt ebenfalls nicht."},{"tag":"h4","text":"Einsatz von PayPal als Zahlungsart"},{"tag":"p","text":"Sollten Sie sich im Rahmen Ihres Bestellvorgangs f\u00fcr eine Bezahlung mit dem Online-Zahlungsdienstleister PayPal entscheiden, werden im Rahmen der so ausgel\u00f6sten Bestellung Ihre Kontaktdaten an PayPal \u00fcbermittelt. PayPal ist ein Angebot der PayPal (Europe) S.\u00e0.r.l. &amp; Cie. S.C.A., 22-24 Boulevard Royal, L-2449 Luxembourg. PayPal \u00fcbernimmt dabei die Funktion eines Online-Zahlungsdienstleisters sowie eines Treuh\u00e4nders und bietet K\u00e4uferschutzdienste an."},{"tag":"p","text":"Bei den an PayPal \u00fcbermittelten personenbezogenen Daten handelt es sich zumeist um Vorname, Nachname, Adresse, Telefonnummer, IP-Adresse, E-Mail-Adresse, oder andere Daten, die zur Bestellabwicklung erforderlich sind, als auch Daten, die im Zusammenhang mit der Bestellung stehen, wie Anzahl der Artikel, Artikelnummer, Rechnungsbetrag und Steuern in Prozent, Rechnungsinformationen, usw."},{"tag":"p","text":"Diese \u00dcbermittelung ist zur Abwicklung Ihrer Bestellung mit der von Ihnen ausgew\u00e4hlten Zahlungsart notwendig, insbesondere zur Best\u00e4tigung Ihrer Identit\u00e4t, zur Administration Ihrer Zahlung und der Kundenbeziehung."},{"tag":"p","text":"Bitte beachten Sie jedoch: Personenbezogenen Daten k\u00f6nnen seitens PayPal auch an Leistungserbringer, an Subunternehmer oder andere verbundene Unternehmen weitergegeben werden, soweit dies zur Erf\u00fcllung der vertraglichen Verpflichtungen aus Ihrer Bestellung erforderlich ist oder die personenbezogenen Daten im Auftrag verarbeitet werden sollen."},{"tag":"p","text":"Abh\u00e4ngig von der \u00fcber PayPal ausgew\u00e4hlten Zahlungsart, z.B. Rechnung oder Lastschrift, werden die an PayPal \u00fcbermittelten personenbezogenen Daten von PayPal an Wirtschaftsauskunfteien \u00fcbermittelt. Diese \u00dcbermittlung dient der Identit\u00e4ts- und Bonit\u00e4tspr\u00fcfung in Bezug auf die von Ihnen get\u00e4tigte Bestellung. Um welche Auskunfteien es sich hierbei handelt und welche Daten von PayPal allgemein erhoben, verarbeitet, gespeichert und weitergegeben werden, entnehmen Sie der Datenschutzerkl\u00e4rung von PayPal unter"},{"tag":"h3","text":"Auskunft\/Widerruf\/L\u00f6schung"},{"tag":"p","text":"Sie k\u00f6nnen sich aufgrund des Bundesdatenschutzgesetzes bei Fragen zur Erhebung, Verarbeitung oder Nutzung Ihrer personenbezogenen Daten und deren Berichtigung, Sperrung, L\u00f6schung oder einem Widerruf einer erteilten Einwilligung unentgeltlich an uns wenden. Wir weisen darauf hin, dass Ihnen ein Recht auf Berichtigung falscher Daten oder L\u00f6schung personenbezogener Daten zusteht, sollte diesem Anspruch keine gesetzliche Aufbewahrungspflicht entgegenstehen."}];
	include.popup.text.clear();
	include.popup.text.addAll(termsTextJson);
	include.ShowPopup("", "Nutzungsbestimmungen", "Close");		// Popup anzeigen
}

function ShowPrivacyPopup() {
	/*Später vom Server fetchen*/
	var privacyTextJson = [{"tag":"h2","text":"2 Datenschutzerkl\u00e4rung"},{"tag":"p","text":"Die Nutzung unserer Seite ist ohne eine Angabe von personenbezogenen Daten m\u00f6glich. F\u00fcr die Nutzung einzelner Services unserer Seite k\u00f6nnen sich hierf\u00fcr abweichende Regelungen ergeben, die in diesem Falle nachstehend gesondert erl\u00e4utert werden. Ihre personenbezogenen Daten (z.B. Name, Anschrift, E-Mail, Telefonnummer, u.\u00e4.) werden von uns nur gem\u00e4\u00df den Bestimmungen des deutschen Datenschutzrechts verarbeitet. Daten sind dann personenbezogen, wenn sie eindeutig einer bestimmten nat\u00fcrlichen Person zugeordnet werden k\u00f6nnen. Die rechtlichen Grundlagen des Datenschutzes finden Sie im Bundesdatenschutzgesetz (BDSG) und dem Telemediengesetz (TMG). Nachstehende Regelungen informieren Sie insoweit \u00fcber die Art, den Umfang und Zweck der Erhebung, die Nutzung und die Verarbeitung von personenbezogenen Daten durch den Anbieter"},{"tag":"p","text":"[Name und Anschrift des Betreibers]"},{"tag":"p","text":"[Telefonnummer des Betreibers]"},{"tag":"p","text":"[E-Mail des Betreibers]"},{"tag":"p","text":"Wir weisen darauf hin, dass die internetbasierte Daten\u00fcbertragung Sicherheitsl\u00fccken aufweist, ein l\u00fcckenloser Schutz vor Zugriffen durch Dritte somit unm\u00f6glich ist."},{"tag":"h4","text":"Cookies"},{"tag":"p","text":"Wir verwenden auf unserer Seite sog. Cookies zum Wiedererkennen mehrfacher Nutzung unseres Angebots, durch denselben Nutzer\/Internetanschlussinhaber. Cookies sind kleine Textdateien, die Ihr Internet-Browser auf Ihrem Rechner ablegt und speichert. Sie dienen dazu, unseren Internetauftritt und unsere Angebote zu optimieren. Es handelt sich dabei zumeist um sog. \"Session-Cookies\", die nach dem Ende Ihres Besuches wieder gel\u00f6scht werden."},{"tag":"p","text":"Teilweise geben diese Cookies jedoch Informationen ab, um Sie automatisch wieder zu erkennen. Diese Wiedererkennung erfolgt aufgrund der in den Cookies gespeicherten IP-Adresse. Die so erlangten Informationen dienen dazu, unsere Angebote zu optimieren und Ihnen einen leichteren Zugang auf unsere Seite zu erm\u00f6glichen."},{"tag":"p","text":"Sie k\u00f6nnen die Installation der Cookies durch eine entsprechende Einstellung Ihres Browsers verhindern; wir weisen Sie jedoch darauf hin, dass Sie in diesem Fall gegebenenfalls nicht s\u00e4mtliche Funktionen unserer Website vollumf\u00e4nglich nutzen k\u00f6nnen."},{"tag":"h4","text":"Serverdaten"},{"tag":"p","text":"Aus technischen Gr\u00fcnden werden u.a. folgende Daten, die Ihr Internet-Browser an uns bzw. an unseren Webspace-Provider \u00fcbermittelt, erfasst (sogenannte Serverlogfiles):"},{"tag":"p","text":" Diese anonymen Daten werden getrennt von Ihren eventuell angegebenen personenbezogenen Daten gespeichert und lassen so keine R\u00fcckschl\u00fcsse auf eine bestimmte Person zu. Sie werden zu statistischen Zwecken ausgewertet, um unseren Internetauftritt und unsere Angebote optimieren zu k\u00f6nnen. "},{"tag":"h4","text":"Registrierungsfunktion"},{"tag":"p","text":"Wir bieten Ihnen auf unserer Seite die M\u00f6glichkeit, sich dort zu registrieren. Die im Zuge dieser Registrierung eingegebenen Daten, die aus der Eingabemaske des Registrierungsformular ersichtlich sind "},{"tag":"p","text":"[BITTE ERG\u00c4NZEN: NAME, E-MAILADRESSE USW]"},{"tag":"p","text":"werden ausschlie\u00dflich f\u00fcr die Verwendung unseres Angebots erhoben und gespeichert. Mit Ihrer Registrierung auf unserer Seite werden wir zudem Ihre IP-Adresse und das Datum sowie die Uhrzeit Ihrer Registrierung speichern. Dies dient in dem Fall, dass ein Dritter Ihre Daten missbraucht und sich mit diesen Daten ohne Ihr Wissen auf unserer Seite registriert, als Absicherung unsererseits.&nbsp; Eine Weitergabe an Dritte erfolgt nicht. Ein Abgleich der so erhobenen Daten mit Daten, die m\u00f6glicherweise durch andere Komponenten unserer Seite erhoben werden, erfolgt ebenfalls nicht."},{"tag":"h4","text":"Newsletter"},{"tag":"p","text":"Wir bieten Ihnen auf unserer Seite die M\u00f6glichkeit, unseren Newsletter zu abonnieren. Mit diesem Newsletter informieren wir in regelm\u00e4\u00dfigen Abst\u00e4nden \u00fcber unsere Angebote. Um unseren Newsletter empfangen zu k\u00f6nnen, ben\u00f6tigen Sie eine g\u00fcltige E-Mailadresse. Die von Ihnen eingetragene E-Mail-Adresse werden wir dahingehend \u00fcberpr\u00fcfen, ob Sie tats\u00e4chlich der Inhaber der angegebenen E-Mail-Adresse sind bzw. deren Inhaber den Empfang des Newsletters autorisiert ist. Mit Ihrer Anmeldung zu unserem Newsletter werden wir Ihre IP-Adresse und das Datum sowie die Uhrzeit Ihrer Anmeldung speichern. Dies dient in dem Fall, dass ein Dritter Ihre E-Mail-Adresse missbraucht und ohne Ihr Wissen unseren Newsletter abonniert, als Absicherung unsererseits. Weitere Daten werden unsererseits nicht erhoben. Die so erhobenen Daten werden ausschlie\u00dflich f\u00fcr den Bezug unseres Newsletters verwendet. Eine Weitergabe an Dritte erfolgt nicht. Ein Abgleich der so erhobenen Daten mit Daten, die m\u00f6glicherweise durch andere Komponenten unserer Seite erhoben werden, erfolgt ebenfalls nicht. Das Abonnement dieses Newsletters k\u00f6nnen Sie jederzeit k\u00fcndigen. Einzelheiten hierzu k\u00f6nnen Sie der Best\u00e4tigungsmail sowie jedem einzelnen Newsletter entnehmen."},{"tag":"h4","text":"Kontaktm\u00f6glichkeit"},{"tag":"p","text":"Wir bieten Ihnen auf unserer Seite die M\u00f6glichkeit, mit uns per E-Mail und\/oder \u00fcber ein Kontaktformular in Verbindung zu treten. In diesem Fall werden die vom Nutzer gemachten Angaben zum Zwecke der Bearbeitung seiner Kontaktaufnahme gespeichert. Eine Weitergabe an Dritte erfolgt nicht. Ein Abgleich der so erhobenen Daten mit Daten, die m\u00f6glicherweise durch andere Komponenten unserer Seite erhoben werden, erfolgt ebenfalls nicht."},{"tag":"h4","text":"Einsatz von PayPal als Zahlungsart"},{"tag":"p","text":"Sollten Sie sich im Rahmen Ihres Bestellvorgangs f\u00fcr eine Bezahlung mit dem Online-Zahlungsdienstleister PayPal entscheiden, werden im Rahmen der so ausgel\u00f6sten Bestellung Ihre Kontaktdaten an PayPal \u00fcbermittelt. PayPal ist ein Angebot der PayPal (Europe) S.\u00e0.r.l. &amp; Cie. S.C.A., 22-24 Boulevard Royal, L-2449 Luxembourg. PayPal \u00fcbernimmt dabei die Funktion eines Online-Zahlungsdienstleisters sowie eines Treuh\u00e4nders und bietet K\u00e4uferschutzdienste an."},{"tag":"p","text":"Bei den an PayPal \u00fcbermittelten personenbezogenen Daten handelt es sich zumeist um Vorname, Nachname, Adresse, Telefonnummer, IP-Adresse, E-Mail-Adresse, oder andere Daten, die zur Bestellabwicklung erforderlich sind, als auch Daten, die im Zusammenhang mit der Bestellung stehen, wie Anzahl der Artikel, Artikelnummer, Rechnungsbetrag und Steuern in Prozent, Rechnungsinformationen, usw."},{"tag":"p","text":"Diese \u00dcbermittelung ist zur Abwicklung Ihrer Bestellung mit der von Ihnen ausgew\u00e4hlten Zahlungsart notwendig, insbesondere zur Best\u00e4tigung Ihrer Identit\u00e4t, zur Administration Ihrer Zahlung und der Kundenbeziehung."},{"tag":"p","text":"Bitte beachten Sie jedoch: Personenbezogenen Daten k\u00f6nnen seitens PayPal auch an Leistungserbringer, an Subunternehmer oder andere verbundene Unternehmen weitergegeben werden, soweit dies zur Erf\u00fcllung der vertraglichen Verpflichtungen aus Ihrer Bestellung erforderlich ist oder die personenbezogenen Daten im Auftrag verarbeitet werden sollen."},{"tag":"p","text":"Abh\u00e4ngig von der \u00fcber PayPal ausgew\u00e4hlten Zahlungsart, z.B. Rechnung oder Lastschrift, werden die an PayPal \u00fcbermittelten personenbezogenen Daten von PayPal an Wirtschaftsauskunfteien \u00fcbermittelt. Diese \u00dcbermittlung dient der Identit\u00e4ts- und Bonit\u00e4tspr\u00fcfung in Bezug auf die von Ihnen get\u00e4tigte Bestellung. Um welche Auskunfteien es sich hierbei handelt und welche Daten von PayPal allgemein erhoben, verarbeitet, gespeichert und weitergegeben werden, entnehmen Sie der Datenschutzerkl\u00e4rung von PayPal unter"},{"tag":"h3","text":"Auskunft\/Widerruf\/L\u00f6schung"},{"tag":"p","text":"Sie k\u00f6nnen sich aufgrund des Bundesdatenschutzgesetzes bei Fragen zur Erhebung, Verarbeitung oder Nutzung Ihrer personenbezogenen Daten und deren Berichtigung, Sperrung, L\u00f6schung oder einem Widerruf einer erteilten Einwilligung unentgeltlich an uns wenden. Wir weisen darauf hin, dass Ihnen ein Recht auf Berichtigung falscher Daten oder L\u00f6schung personenbezogener Daten zusteht, sollte diesem Anspruch keine gesetzliche Aufbewahrungspflicht entgegenstehen."}];
	include.popup.text.clear();
	include.popup.text.addAll(privacyTextJson);
	include.ShowPopup("", "Datenschutzbestimmungen", "Close");	// Popup anzeigen
}

module.exports = {
	firstname: firstname,
	lastname: lastname,
	email: email,
	password: password,
	repeatPassword: repeatPassword,

	showOverlay: include.showOverlay,
	showLoadingIndicator: include.showLoadingIndicator,
	modal: include.modal,
	popup: include.popup,

	allCredentialsEntered: allCredentialsEntered,
	passwordComplexity: passwordComplexity,
	repeatPasswordComplexity: repeatPasswordComplexity,
	
	OnPageActiv, OnPageActiv,
	Register: Register,
	ShowTermsPopup: ShowTermsPopup,
	ShowPrivacyPopup: ShowPrivacyPopup
};