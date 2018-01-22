function copyToolbarReplacement() {
	if (document.getElementById("clipboard-button").disabled === false) {
		var shortcut = document.getElementById("shortcut-input").value;
		value = (SHORTCUTS[shortcut]) ? SHORTCUTS[shortcut] : SHORTCUTS[shortcut.toLowerCase()].toUpperCase();
		copyToClipboard(value);
		window.close();
	}
}

function copyEditReplacement(clipboardButton) {
	copyToClipboard(clipboardButton.parentNode.childNodes[3].value);
}

// Copies the shortcut replacement to the user's clipboard-button
// To do this, creates a temporary textarea and appends it to the popup, places the text in it,
// copies the text to the clipboard, and then deletes the textarea
function copyToClipboard(value) {
	var temp = document.createElement("textarea");

	temp.style.position = "absolute";
	temp.style.top = "0";
	temp.style.width = "0";
	temp.style.height = "0";

	document.body.appendChild(temp);
	temp.value = value;

	temp.focus();
	temp.select();

	document.execCommand("Copy");
	temp.remove();

}
