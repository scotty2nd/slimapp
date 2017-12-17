var include = require("/Main");

this.BackgroundColor.value = include.modal.color;
this.Headline.value = include.modal.headline;
this.Title.value = include.modal.title;

function Ok() {
	include.modal.visibility.value = false; 	// Fehlermeldung ausblenden
	include.showOverlay.value = false; 			// Overlay ausblenden
}

module.exports = {
	Ok: Ok
};