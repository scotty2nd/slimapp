var include = require("/Main");

this.Background.value = include.modal.background;
this.Headline.value = include.modal.headline;
this.Title.value = include.modal.title;

function Ok() {
	include.modal.visibility.value = false; // Error Modal ausblenden
	include.showOverlay.value = false; // Overlay ausblenden
}

module.exports = {
	Ok: Ok
};