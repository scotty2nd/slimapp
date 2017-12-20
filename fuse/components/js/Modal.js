var include = require("/Main");

function OkClicked() {
	include.modal.visibility.value = false; 	// Fehlermeldung ausblenden
	include.showOverlay.value = false; 			// Overlay ausblenden
}

module.exports = {
	OkClicked: OkClicked
};