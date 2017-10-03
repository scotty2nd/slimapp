var Observable = require("FuseJS/Observable");

var ShowOverlay = Observable(false);
var ShowLoadingIndicator = Observable(false);
var ShowModal = Observable(false);
var ModalMessage = Observable("");

module.exports = {
    ShowOverlay: ShowOverlay,
    ShowLoadingIndicator: ShowLoadingIndicator,
    ShowModal: ShowModal,
    ModalMessage: ModalMessage
};