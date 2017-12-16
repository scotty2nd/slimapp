var include = require("/Main");

function GoBack() {
    router.goBack();
}

module.exports = {
	GoBack: GoBack,
	HidePopup: include.HidePopup
};