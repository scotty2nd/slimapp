var Observable = require("FuseJS/Observable");

var ShowOverlay = Observable(false);
var ShowLoadingIndicator = Observable(false);
var ShowErrorModal = Observable(false);
var ModalMessage = Observable("");

module.exports = {
    ShowOverlay: ShowOverlay,
    ShowLoadingIndicator: ShowLoadingIndicator,
    ShowErrorModal: ShowErrorModal,
    ModalMessage: ModalMessage
};